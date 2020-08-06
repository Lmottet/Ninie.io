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
    const basicShard = {
        id: shardID,
        socket: await connectWebSocket(data.url),
        resumeInterval: 0,
        sessionID: "",
        previousSequenceNumber: 0,
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
            switch (data.op) {
                case GatewayOpcode.Hello:
                    heartbeat(basicShard, identifyPayload, data.d.heartbeat_interval);
                    break;
                case GatewayOpcode.Reconnect:
                case GatewayOpcode.InvalidSession:
                    if (!data.d) {
                        eventHandlers.debug?.({ type: "invalidSession", data: { shardID: basicShard.id } });
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
async function identify(shard, payload) {
    await shard.socket.send(JSON.stringify({
        op: GatewayOpcode.Identify,
        d: { ...payload, shard: [shard.id, payload.shard[1]] },
    }));
}
async function resume(shard, payload) {
    await shard.socket.send(JSON.stringify({
        op: GatewayOpcode.Resume,
        d: {
            ...payload,
            session_id: shard.sessionID,
            seq: shard.previousSequenceNumber,
        },
    }));
}
async function heartbeat(shard, payload, interval) {
    await delay(interval);
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
    heartbeat(shard, payload, interval);
}
async function resumeConnection(botGatewayData, payload) {
    const shard = basicShards.get(payload.shard[0]);
    if (!shard) {
        eventHandlers.debug?.({ type: "missingShard", data: { shardID: payload.shard[0] } });
        return;
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWNTaGFyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJhc2ljU2hhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLGFBQWEsR0FFZCxNQUFNLHFCQUFxQixDQUFDO0FBQzdCLE9BQU8sRUFDTCxhQUFhLEVBQ2IsY0FBYyxHQUVmLE1BQU0sYUFBYSxDQUFDO0FBQ3JCLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUNwRSxPQUFPLEVBQ0wsZ0JBQWdCLEVBQ2hCLHFCQUFxQixHQUV0QixNQUFNLHdDQUF3QyxDQUFDO0FBRWhELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUk1RCxNQUFNLFdBQVcsR0FBRyxJQUFJLEdBQUcsRUFBc0IsQ0FBQztBQVdsRCxNQUFNLG1CQUFtQixHQUFpQyxFQUFFLENBQUM7QUFDN0QsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDO0FBU3pCLE1BQU0sQ0FBQyxLQUFLLFVBQVUsZ0JBQWdCLENBQ3BDLElBQTJCLEVBQzNCLGVBQWdDLEVBQ2hDLFFBQVEsR0FBRyxLQUFLLEVBQ2hCLE9BQU8sR0FBRyxDQUFDO0lBRVgsTUFBTSxVQUFVLEdBQWU7UUFDN0IsRUFBRSxFQUFFLE9BQU87UUFDWCxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ3hDLGNBQWMsRUFBRSxDQUFDO1FBQ2pCLFNBQVMsRUFBRSxFQUFFO1FBQ2Isc0JBQXNCLEVBQUUsQ0FBQztRQUN6QixZQUFZLEVBQUUsS0FBSztLQUNwQixDQUFDO0lBRUYsV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBRTNDLElBQUksQ0FBQyxRQUFRLEVBQUU7UUFFYixNQUFNLFFBQVEsQ0FBQyxVQUFVLEVBQUUsZUFB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