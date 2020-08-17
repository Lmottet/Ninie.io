import { authorization, eventHandlers } from "./client.ts";
import { delay } from "https://deno.land/std@0.61.0/async/delay.ts";
import { Errors } from "../types/errors.ts";
import { HttpResponseCode } from "../types/discord.ts";
import { logRed } from "../utils/logger.ts";
const queue = [];
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
async function processQueue() {
    if (queue.length && !globallyRateLimited) {
        const request = queue.shift();
        if (!request)
            return;
        const rateLimitedURLResetIn = await checkRatelimits(request.url);
        if (request.bucketID) {
            const rateLimitResetIn = await checkRatelimits(request.bucketID);
            if (rateLimitResetIn) {
                queue.push(request);
            }
            else if (rateLimitedURLResetIn) {
                queue.push(request);
            }
            else {
                const result = await request.callback();
                if (result && result.rateLimited) {
                    queue.push({ ...request, bucketID: result.bucketID || request.bucketID });
                }
            }
        }
        else {
            if (rateLimitedURLResetIn) {
                queue.push(request);
            }
            else {
                const result = await request.callback();
                if (request && result && result.rateLimited) {
                    queue.push({ ...request, bucketID: result.bucketID || request.bucketID });
                }
            }
        }
    }
    if (queue.length) {
        await delay(1000);
        processQueue();
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
                    resolve();
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
        queue.push({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdE1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXF1ZXN0TWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMzRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDcEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUU1QyxNQUFNLEtBQUssR0FBb0IsRUFBRSxDQUFDO0FBQ2xDLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxHQUFHLEVBQTJCLENBQUM7QUFDNUQsSUFBSSxtQkFBbUIsR0FBRyxLQUFLLENBQUM7QUFDaEMsSUFBSSxjQUFjLEdBQUcsS0FBSyxDQUFDO0FBb0IzQixLQUFLLFVBQVUsdUJBQXVCO0lBQ3BDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUN2QixnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDdEMsSUFBSSxLQUFLLENBQUMsY0FBYyxHQUFHLEdBQUc7WUFBRSxPQUFPO1FBQ3ZDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM3QixJQUFJLEdBQUcsS0FBSyxRQUFRO1lBQUUsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO0lBQ3BELENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEIsdUJBQXVCLEVBQUUsQ0FBQztBQUM1QixDQUFDO0FBRUQsS0FBSyxVQUFVLFlBQVk7SUFDekIsSUFBSSxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsbUJBQW1CLEVB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