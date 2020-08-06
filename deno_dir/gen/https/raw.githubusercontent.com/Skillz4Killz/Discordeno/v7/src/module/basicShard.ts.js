import { GatewayOpcode, } from "../types/discord.ts";
import { eventHandlers, botGatewayData, } from "./client.ts";
import { delay } from "https://deno.land/std@0.61.0/async/delay.ts";
import { connectWebSocket, isWebSocketCloseEvent, } from "https://deno.land/std@0.61.0/ws/mod.ts";
import { logRed } from "../utils/logger.ts";
import { handleDiscordPayload } from "./shardingManager.ts";
const basicShards = new Map();
const RequestMembersQueue = [];
let processQueue = false;
export async function createBasicShard(data, identifyPayload, resuming = false, shardID = 0) {
    const oldShard = basicShards.get(shardID);
    const basicShard = {
        id: shardID,
        socket: await connectWebSocket(`${data.url}?v=6&encoding=json`),
        resumeInterval: 0,
        sessionID: oldShard?.sessionID || "",
        previousSequenceNumber: oldShard?.previousSequenceNumber || 0,
        needToResume: false,
    };
    basicShards.set(basicShard.id, basicShard);
    if (!resuming) {
        await identify(basicShard, identifyPayload);
    }
    else {
        await resume(basicShard, identifyPayload);
    }
    for await (const message of basicShard.socket) {
        if (typeof message === "string") {
            const data = JSON.parse(message);
            if (!data.t)
                eventHandlers.rawGateway?.(data);
            switch (data.op) {
                case GatewayOpcode.Hello:
                    if (!resuming) {
                        heartbeat(basicShard, data.d.heartbeat_interval);
                    }
                    break;
                case GatewayOpcode.Reconnect:
                    eventHandlers.debug?.({ type: "reconnect", data: { shardID: basicShard.id } });
                    basicShard.needToResume = true;
                    resumeConnection(botGatewayData, identifyPayload);
                    break;
                case GatewayOpcode.InvalidSession:
                    eventHandlers.debug?.({ type: "invalidSession", data: { shardID: basicShard.id, data } });
                    if (!data.d) {
                        createBasicShard(botGatewayData, identifyPayload, false, shardID);
                        break;
                    }
                    basicShard.needToResume = true;
                    resumeConnection(botGatewayData, identifyPayload);
                    break;
                default:
                    if (data.t === "RESUMED") {
                        eventHandlers.debug?.({ type: "resumed", data: { shardID: basicShard.id } });
                        basicShard.needToResume = false;
                        break;
                    }
                    if (data.t === "READY") {
                        basicShard.sessionID = data.d.session_id;
                    }
                    if (data.s)
                        basicShard.previousSequenceNumber = data.s;
                    handleDiscordPayload(data, basicShard.id);
                    break;
            }
        }
        else if (isWebSocketCloseEvent(message)) {
            eventHandlers.debug?.({ type: "websocketClose", data: { shardID: basicShard.id, message } });
            if ([4004, 4005, 4012, 4013, 4014].includes(message.code)) {
                logRed(`Close :( ${JSON.stringify(message)}`);
                eventHandlers.debug?.({
                    type: "websocketErrored",
                    data: { shardID: basicShard.id, message },
                });
                throw new Error("Shard.ts: Error occurred that is not resumeable or able to be reconnected.");
            }
            if ([4003, 4007, 4008, 4009].includes(message.code)) {
                eventHandlers.debug?.({
                    type: "websocketReconnecting",
                    data: { shardID: basicShard.id, message },
                });
                createBasicShard(botGatewayData, identifyPayload, false, shardID);
            }
            else {
                basicShard.needToResume = true;
                resumeConnection(botGatewayData, identifyPayload);
            }
        }
    }
}
function identify(shard, payload) {
    eventHandlers.debug?.({
        type: "identifying",
        data: {
            shardID: shard.id,
        },
    });
    return shard.socket.send(JSON.stringify({
        op: GatewayOpcode.Identify,
        d: { ...payload, shard: [shard.id, payload.shard[1]] },
    }));
}
function resume(shard, payload) {
    return shard.socket.send(JSON.stringify({
        op: GatewayOpcode.Resume,
        d: {
            token: payload.token,
            session_id: shard.sessionID,
            seq: shard.previousSequenceNumber,
        },
    }));
}
async function heartbeat(shard, interval) {
    if (shard.socket.isClosed)
        return;
    shard.socket.send(JSON.stringify({ op: GatewayOpcode.Heartbeat, d: shard.previousSequenceNumber }));
    eventHandlers.debug?.({
        type: "heartbeat",
        data: {
            interval,
            previousSequenceNumber: shard.previousSequenceNumber,
            shardID: shard.id,
        },
    });
    await delay(interval);
    heartbeat(shard, interval);
}
async function resumeConnection(botGatewayData, payload) {
    const shard = basicShards.get(payload.shard[0]);
    if (!shard) {
        eventHandlers.debug?.({ type: "missingShard", data: { shardID: payload.shard[0] } });
        return;
    }
    if (!shard.needToResume)
        return;
    eventHandlers.debug?.({ type: "resuming", data: { shardID: shard.id } });
    createBasicShard(botGatewayData, payload, true, shard.id);
    await delay(1000 * 15);
    if (shard.needToResume)
        resumeConnection(botGatewayData, payload);
}
export function requestGuildMembers(guildID, shardID, nonce, options, queuedRequest = false) {
    const shard = basicShards.get(shardID);
    if (!queuedRequest) {
        RequestMembersQueue.push({
            guildID,
            shardID,
            nonce,
            options,
        });
        if (!processQueue) {
            processQueue = true;
            processGatewayQueue();
        }
        return;
    }
    if (shard?.socket.isClosed) {
        requestGuildMembers(guildID, shardID, nonce, options);
        return;
    }
    shard?.socket.send(JSON.stringify({
        op: GatewayOpcode.RequestGuildMembers,
        d: {
            guild_id: guildID,
            query: options?.query || "",
            limit: options?.query || 0,
            presences: options?.presences || false,
            user_ids: options?.userIDs,
            nonce,
        },
    }));
}
async function processGatewayQueue() {
    if (!RequestMembersQueue.length) {
        processQueue = false;
        return;
    }
    basicShards.forEach((shard) => {
        const index = RequestMembersQueue.findIndex((q) => q.shardID === shard.id);
        const request = RequestMembersQueue[index];
        if (request) {
            requestGuildMembers(request.guildID, request.shardID, request.nonce, request.options, true);
            RequestMembersQueue.splice(index, 1);
            const secondIndex = RequestMembersQueue.findIndex((q) => q.shardID === shard.id);
            const secondRequest = RequestMembersQueue[secondIndex];
            if (secondRequest) {
                requestGuildMembers(request.guildID, request.shardID, secondRequest.nonce, secondRequest.options, true);
                RequestMembersQueue.splice(secondIndex, 1);
            }
        }
    });
    await delay(1500);
    eventHandlers.debug?.({
        type: "requestMembersProcessing",
        data: {
            remaining: RequestMembersQueue.length,
            first: RequestMembersQueue[0],
        },
    });
    processGatewayQueue();
}
export function botGatewayStatusRequest(payload) {
    basicShards.forEach((shard) => {
        shard.socket.send(JSON.stringify({
            op: GatewayOpcode.StatusUpdate,
            d: {
                since: null,
                game: payload.game.name
                    ? {
                        name: payload.game.name,
                        type: payload.game.type,
                    }
                    : null,
                status: payload.status,
                afk: false,
            },
        }));
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWNTaGFyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJhc2ljU2hhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLGFBQWEsR0FFZCxNQUFNLHFCQUFxQixDQUFDO0FBQzdCLE9BQU8sRUFDTCxhQUFhLEVBQ2IsY0FBYyxHQUVmLE1BQU0sYUFBYSxDQUFDO0FBQ3JCLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUNwRSxPQUFPLEVBQ0wsZ0JBQWdCLEVBQ2hCLHFCQUFxQixHQUV0QixNQUFNLHdDQUF3QyxDQUFDO0FBRWhELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUk1RCxNQUFNLFdBQVcsR0FBRyxJQUFJLEdBQUcsRUFBc0IsQ0FBQztBQVdsRCxNQUFNLG1CQUFtQixHQUFpQyxFQUFFLENBQUM7QUFDN0QsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDO0FBU3pCLE1BQU0sQ0FBQyxLQUFLLFVBQVUsZ0JBQWdCLENBQ3BDLElBQTJCLEVBQzNCLGVBQWdDLEVBQ2hDLFFBQVEsR0FBRyxLQUFLLEVBQ2hCLE9BQU8sR0FBRyxDQUFDO0lBRVgsTUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUUxQyxNQUFNLFVBQVUsR0FBZTtRQUM3QixFQUFFLEVBQUUsT0FBTztRQUNYLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsb0JBQW9CLENBQUM7UUFDL0QsY0FBYyxFQUFFLENBQUM7UUFDakIsU0FBUyxFQUFFLFFBQVEsRUFBRSxTQUFTLElBQUksRUFBRTtRQUNwQyxzQkFBc0IsRUFBRSxRQUFRLEVBQUUsc0JBQXNCLElBQUksQ0FBQztRQUM3RCxZQUFZLEVBQUUsS0FBSztLQUNwQixDQUFDO0lBRUYsV0FB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