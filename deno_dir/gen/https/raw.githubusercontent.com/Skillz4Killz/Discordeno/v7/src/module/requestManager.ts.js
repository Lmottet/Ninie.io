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
        if (value.resetTimestamp < now)
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
        if (request?.bucketID) {
            const rateLimitResetIn = checkRatelimits(request.bucketID);
            const rateLimitedURLResetIn = checkRatelimits(request.url);
            if (rateLimitResetIn) {
                queue.push(request);
            }
            else if (rateLimitedURLResetIn) {
                queue.push(request);
            }
            else {
                await request.callback();
            }
        }
        else {
            await request?.callback();
        }
    }
    if (queue.length)
        processQueue();
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
function checkRatelimits(url) {
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
                const rateLimitResetIn = checkRatelimits(url);
                if (rateLimitResetIn) {
                    return setTimeout(() => runMethod(method, url, body, retryCount++, bucketID), rateLimitResetIn);
                }
                const query = method === "get" && body
                    ? Object.entries(body).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
                        .join("&")
                    : "";
                const urlToUse = method === "get" && query ? `${url}?${query}` : url;
                const response = await fetch(urlToUse, createRequestBody(body, method));
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
                    return setTimeout(() => runMethod(method, url, body, retryCount++, bucketIDFromHeaders), json.retry_after);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdE1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXF1ZXN0TWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMzRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDcEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUU1QyxNQUFNLEtBQUssR0FBb0IsRUFBRSxDQUFDO0FBQ2xDLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxHQUFHLEVBQTJCLENBQUM7QUFDNUQsSUFBSSxtQkFBbUIsR0FBRyxLQUFLLENBQUM7QUFDaEMsSUFBSSxjQUFjLEdBQUcsS0FBSyxDQUFDO0FBYzNCLEtBQUssVUFBVSx1QkFBdUI7SUFDcEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUN0QyxJQUFJLEtBQUssQ0FBQyxjQUFjLEdBQUcsR0FBRztZQUFFLE9BQU87UUFDdkMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzdCLElBQUksR0FBRyxLQUFLLFFBQVE7WUFBRSxtQkFBbUIsR0FBRyxLQUFLLENBQUM7SUFDcEQsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQix1QkFBdUIsRUFBRSxDQUFDO0FBQzVCLENBQUM7QUFFRCxLQUFLLFVBQVUsWUFBWTtJQUN6QixJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxtQkFBbUIsRUFB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