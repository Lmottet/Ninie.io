import { connectWebSocket, isWebSocketCloseEvent, isWebSocketPingEvent, isWebSocketPongEvent, } from "../../deps.ts";
import { handleDiscordPayload } from "./shardingManager.ts";
import { GatewayOpcode } from "../types/discord.ts";
import { eventHandlers, botGatewayData, } from "./client.ts";
import { delay } from "../../deps.ts";
import { inflate } from "../../deps.ts";
const basicShards = new Map();
const heartbeating = new Set();
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
    for await (let message of basicShard.socket) {
        if (isWebSocketCloseEvent(message)) {
            eventHandlers.debug?.({ type: "websocketClose", data: { shardID: basicShard.id, message } });
            if ([4004, 4005, 4012, 4013, 4014].includes(message.code)) {
                console.error(`Close :( ${JSON.stringify(message)}`);
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
                resumeConnection(botGatewayData, identifyPayload, basicShard.id);
            }
            continue;
        }
        else if (isWebSocketPingEvent(message) || isWebSocketPongEvent(message)) {
            continue;
        }
        if (message instanceof Uint8Array) {
            message = new TextDecoder().decode(inflate(message));
        }
        if (typeof message === "string") {
            const data = JSON.parse(message);
            if (!data.t)
                eventHandlers.rawGateway?.(data);
            switch (data.op) {
                case GatewayOpcode.Hello:
                    if (!heartbeating.has(basicShard.id)) {
                        heartbeat(basicShard, data.d.heartbeat_interval);
                    }
                    break;
                case GatewayOpcode.Reconnect:
                    eventHandlers.debug?.({ type: "reconnect", data: { shardID: basicShard.id } });
                    basicShard.needToResume = true;
                    resumeConnection(botGatewayData, identifyPayload, basicShard.id);
                    break;
                case GatewayOpcode.InvalidSession:
                    eventHandlers.debug?.({ type: "invalidSession", data: { shardID: basicShard.id, data } });
                    if (!data.d) {
                        createBasicShard(botGatewayData, identifyPayload, false, shardID);
                        break;
                    }
                    basicShard.needToResume = true;
                    resumeConnection(botGatewayData, identifyPayload, basicShard.id);
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
    if (shard.socket.isClosed) {
        heartbeating.delete(shard.id);
        return;
    }
    if (!heartbeating.has(shard.id))
        heartbeating.add(shard.id);
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
async function resumeConnection(botGatewayData, payload, shardID) {
    const shard = basicShards.get(shardID);
    if (!shard) {
        eventHandlers.debug?.({ type: "missingShard", data: { shardID: shardID } });
        return;
    }
    if (!shard.needToResume)
        return;
    eventHandlers.debug?.({ type: "resuming", data: { shardID: shard.id } });
    createBasicShard(botGatewayData, payload, true, shard.id);
    await delay(1000 * 15);
    if (shard.needToResume)
        resumeConnection(botGatewayData, payload, shardID);
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
            limit: options?.limit || 0,
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
            eventHandlers.debug?.({
                type: "requestMembersProcessing",
                data: {
                    remaining: RequestMembersQueue.length,
                    request,
                },
            });
            requestGuildMembers(request.guildID, request.shardID, request.nonce, request.options, true);
            RequestMembersQueue.splice(index, 1);
            const secondIndex = RequestMembersQueue.findIndex((q) => q.shardID === shard.id);
            const secondRequest = RequestMembersQueue[secondIndex];
            if (secondRequest) {
                eventHandlers.debug?.({
                    type: "requestMembersProcessing",
                    data: {
                        remaining: RequestMembersQueue.length,
                        request,
                    },
                });
                requestGuildMembers(secondRequest.guildID, secondRequest.shardID, secondRequest.nonce, secondRequest.options, true);
                RequestMembersQueue.splice(secondIndex, 1);
            }
        }
    });
    await delay(1500);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWNTaGFyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJhc2ljU2hhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUNMLGdCQUFnQixFQUNoQixxQkFBcUIsRUFDckIsb0JBQW9CLEVBQ3BCLG9CQUFvQixHQUVyQixNQUFNLGVBQWUsQ0FBQztBQUt2QixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDcEQsT0FBTyxFQUNMLGFBQWEsRUFDYixjQUFjLEdBQ2YsTUFBTSxhQUFhLENBQUM7QUFDckIsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0QyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXhDLE1BQU0sV0FBVyxHQUFHLElBQUksR0FBRyxFQUFzQixDQUFDO0FBQ2xELE1BQU0sWUFBWSxHQUFHLElBQUksR0FBRyxFQUFVLENBQUM7QUFXdkMsTUFBTSxtQkFBbUIsR0FBaUMsRUFBRSxDQUFDO0FBQzdELElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQztBQVN6QixNQUFNLENBQUMsS0FBSyxVQUFVLGdCQUFnQixDQUNwQyxJQUEyQixFQUMzQixlQUFnQyxFQUNoQyxRQUFRLEdBQUcsS0FBSyxFQUNoQixPQUFPLEdBQUcsQ0FBQztJQUVYLE1BQU0sUUFBUSxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFMUMsTUFBTSxVQUFVLEdBQWU7UUFDN0IsRUFBRSxFQUFFLE9BQU87UUFDWCxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLG9CQUFvQixDQUFDO1FBQy9ELGNBQWMsRUFBRSxDQUFDO1FBQ2pCLFNBQVMsRUFBRSxRQUFRLEVBQUUsU0FBUyxJQUFJLEVBQUU7UUFDcEMsc0JBQXNCLEVBQUUsUUFBUSxF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