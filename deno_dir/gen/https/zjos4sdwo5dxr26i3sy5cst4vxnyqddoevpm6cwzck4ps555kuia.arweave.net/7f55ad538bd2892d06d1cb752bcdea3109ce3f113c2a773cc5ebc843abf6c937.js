import { authorization, eventHandlers } from "./client.ts";
import { delay } from "https://deno.land/std@0.61.0/async/delay.ts";
import { Errors } from "../types/errors.ts";
import { HttpResponseCode } from "../types/discord.ts";
import { logRed } from "../utils/logger.ts";
import { baseEndpoints } from "../constants/discord.ts";
const pathQueues = {};
const ratelimitedPaths = new Map();
let globallyRateLimited = false;
let queueInProcess = false;
async function processRateLimitedPaths() {
    const now = Date.now();
    ratelimitedPaths.forEach((value, key) => {
        if (value.resetTimestamp > now)
            return;
        ratelimitedPaths.delete(key);
        if (key === "global")
            globallyRateLimited = false;
    });
    await delay(1000);
    processRateLimitedPaths();
}
function addToQueue(request) {
    const route = request.url.substring(baseEndpoints.BASE_URL.length + 1);
    const parts = route.split("/");
    parts.shift();
    const [id] = parts;
    if (pathQueues[id]) {
        pathQueues[id].push(request);
    }
    else {
        pathQueues[id] = [request];
    }
}
async function cleanupQueues() {
    Object.entries(pathQueues).map(([key, value]) => {
        if (!value.length) {
            delete pathQueues[key];
        }
    });
}
async function processQueue() {
    if ((Object.keys(pathQueues).length) && !globallyRateLimited) {
        await Promise.allSettled(Object.values(pathQueues).map(async (pathQueue) => {
            const request = pathQueue.shift();
            if (!request)
                return;
            const rateLimitedURLResetIn = await checkRatelimits(request.url);
            if (request.bucketID) {
                const rateLimitResetIn = await checkRatelimits(request.bucketID);
                if (rateLimitResetIn) {
                    addToQueue(request);
                }
                else if (rateLimitedURLResetIn) {
                    addToQueue(request);
                }
                else {
                    const result = await request.callback();
                    if (result && result.rateLimited) {
                        addToQueue({ ...request, bucketID: result.bucketID || request.bucketID });
                    }
                }
            }
            else {
                if (rateLimitedURLResetIn) {
                    addToQueue(request);
                }
                else {
                    const result = await request.callback();
                    if (request && result && result.rateLimited) {
                        addToQueue({ ...request, bucketID: result.bucketID || request.bucketID });
                    }
                }
            }
        }));
    }
    if (Object.keys(pathQueues).length) {
        await delay(1000);
        processQueue();
        cleanupQueues();
    }
    else
        queueInProcess = false;
}
processRateLimitedPaths();
export const RequestManager = {
    get: async (url, body) => {
        return runMethod("get", url, body);
    },
    post: (url, body) => {
        return runMethod("post", url, body);
    },
    delete: (url, body) => {
        return runMethod("delete", url, body);
    },
    patch: (url, body) => {
        return runMethod("patch", url, body);
    },
    put: (url, body) => {
        return runMethod("put", url, body);
    },
};
function createRequestBody(body, method) {
    const headers = {
        Authorization: authorization,
        "User-Agent": `DiscordBot (https://github.com/skillz4killz/discordeno, 6.0.0)`,
        "Content-Type": "application/json",
        "X-Audit-Log-Reason": body ? encodeURIComponent(body.reason) : "",
    };
    if (method === "get")
        body = undefined;
    if (body?.file) {
        const form = new FormData();
        form.append("file", body.file.blob, body.file.name);
        form.append("payload_json", JSON.stringify({ ...body, file: undefined }));
        body.file = form;
        delete headers["Content-Type"];
    }
    return {
        headers,
        body: body?.file || JSON.stringify(body),
        method: method.toUpperCase(),
    };
}
async function checkRatelimits(url) {
    const ratelimited = ratelimitedPaths.get(url);
    const global = ratelimitedPaths.get("global");
    const now = Date.now();
    if (ratelimited && now < ratelimited.resetTimestamp) {
        return ratelimited.resetTimestamp - now;
    }
    if (global && now < global.resetTimestamp) {
        return global.resetTimestamp - now;
    }
    return false;
}
async function runMethod(method, url, body, retryCount = 0, bucketID) {
    eventHandlers.debug?.({
        type: "requestManager",
        data: { method, url, body, retryCount, bucketID },
    });
    return new Promise((resolve, reject) => {
        const callback = async () => {
            try {
                const rateLimitResetIn = await checkRatelimits(url);
                if (rateLimitResetIn) {
                    return { rateLimited: rateLimitResetIn, beforeFetch: true, bucketID };
                }
                const query = method === "get" && body
                    ? Object.entries(body).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
                        .join("&")
                    : "";
                const urlToUse = method === "get" && query ? `${url}?${query}` : url;
                eventHandlers.debug?.({
                    type: "requestManagerFetching",
                    data: { method, url, body, retryCount, bucketID },
                });
                const response = await fetch(urlToUse, createRequestBody(body, method));
                eventHandlers.debug?.({
                    type: "requestManagerFetched",
                    data: { method, url, body, retryCount, bucketID, response },
                });
                const bucketIDFromHeaders = processHeaders(url, response.headers);
                handleStatusCode(response);
                if (response.status === 204)
                    return resolve();
                const json = await response.json();
                if (json.retry_after ||
                    json.message === "You are being rate limited.") {
                    if (retryCount > 10) {
                        throw new Error(Errors.RATE_LIMIT_RETRY_MAXED);
                    }
                    return {
                        rateLimited: json.retry_after,
                        beforeFetch: false,
                        bucketID: bucketIDFromHeaders,
                    };
                }
                eventHandlers.debug?.({
                    type: "requestManagerSuccess",
                    data: { method, url, body, retryCount, bucketID },
                });
                return resolve(json);
            }
            catch (error) {
                eventHandlers.debug?.({
                    type: "requestManagerFailed",
                    data: { method, url, body, retryCount, bucketID },
                });
                return reject(error);
            }
        };
        addToQueue({
            callback,
            bucketID,
            url,
        });
        if (!queueInProcess) {
            queueInProcess = true;
            processQueue();
        }
    });
}
function handleStatusCode(response) {
    const status = response.status;
    if ((status >= 200 && status < 400) ||
        status === HttpResponseCode.TooManyRequests) {
        return true;
    }
    logRed(response);
    switch (status) {
        case HttpResponseCode.BadRequest:
        case HttpResponseCode.Unauthorized:
        case HttpResponseCode.Forbidden:
        case HttpResponseCode.NotFound:
        case HttpResponseCode.MethodNotAllowed:
            throw new Error(Errors.REQUEST_CLIENT_ERROR);
        case HttpResponseCode.GatewayUnavailable:
            throw new Error(Errors.REQUEST_SERVER_ERROR);
    }
    throw new Error(Errors.REQUEST_UNKNOWN_ERROR);
}
function processHeaders(url, headers) {
    let ratelimited = false;
    const remaining = headers.get("x-ratelimit-remaining");
    const resetTimestamp = headers.get("x-ratelimit-reset");
    const retryAfter = headers.get("retry-after");
    const global = headers.get("x-ratelimit-global");
    const bucketID = headers.get("x-ratelimit-bucket");
    if (remaining && remaining === "0") {
        ratelimited = true;
        ratelimitedPaths.set(url, {
            url,
            resetTimestamp: Number(resetTimestamp) * 1000,
            bucketID,
        });
        if (bucketID) {
            ratelimitedPaths.set(bucketID, {
                url,
                resetTimestamp: Number(resetTimestamp) * 1000,
                bucketID,
            });
        }
    }
    if (global) {
        const reset = Date.now() + Number(retryAfter);
        eventHandlers.debug?.({ type: "globallyRateLimited", data: { url, reset } });
        globallyRateLimited = true;
        ratelimited = true;
        ratelimitedPaths.set("global", {
            url: "global",
            resetTimestamp: reset,
            bucketID,
        });
        if (bucketID) {
            ratelimitedPaths.set(bucketID, {
                url: "global",
                resetTimestamp: reset,
                bucketID,
            });
        }
    }
    return ratelimited ? bucketID : undefined;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdE1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXF1ZXN0TWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMzRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDcEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFeEQsTUFBTSxVQUFVLEdBQXVDLEVBQUUsQ0FBQztBQUMxRCxNQUFNLGdCQUFnQixHQUFHLElBQUksR0FBRyxFQUEyQixDQUFDO0FBQzVELElBQUksbUJBQW1CLEdBQUcsS0FBSyxDQUFDO0FBQ2hDLElBQUksY0FBYyxHQUFHLEtBQUssQ0FBQztBQW9CM0IsS0FBSyxVQUFVLHVCQUF1QjtJQUNwQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDdkIsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQ3RDLElBQUksS0FBSyxDQUFDLGNBQWMsR0FBRyxHQUFHO1lBQUUsT0FBTztRQUN2QyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0IsSUFBSSxHQUFHLEtBQUssUUFBUTtZQUFFLG1CQUFtQixHQUFHLEtBQUssQ0FBQztJQUNwRCxDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xCLHVCQUF1QixFQUFFLENBQUM7QUFDNUIsQ0FBQztBQUVELFNBQVMsVUFBVSxDQUFDLE9B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