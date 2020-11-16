import { delay } from "../../deps.ts";
import { controllers } from "../controllers/mod.ts";
import { GatewayOpcode, } from "../types/discord.ts";
import { cache } from "../utils/cache.ts";
import { botGatewayStatusRequest, createBasicShard, requestGuildMembers, } from "./basicShard.ts";
import { botGatewayData, eventHandlers, identifyPayload, } from "./client.ts";
let shardCounter = 0;
let basicSharding = false;
const shards = [];
let createNextShard = true;
export function allowNextShard(enabled = true) {
    createNextShard = enabled;
}
export function createShardWorker(shardID) {
    const path = new URL("./shard.ts", import.meta.url).toString();
    const shard = new Worker(path, { type: "module", deno: true });
    shard.onmessage = (message) => {
        if (message.data.type === "REQUEST_CLIENT_OPTIONS") {
            identifyPayload.shard = [
                shardID || shardCounter,
                botGatewayData.shards,
            ];
            shard.postMessage({
                type: "CREATE_SHARD",
                botGatewayData,
                identifyPayload,
                shardID: shardCounter,
            });
            shardCounter++;
        }
        else if (message.data.type === "HANDLE_DISCORD_PAYLOAD") {
            handleDiscordPayload(JSON.parse(message.data.payload), message.data.shardID);
        }
        else if (message.data.type === "DEBUG_LOG") {
            eventHandlers.debug?.(message.data.details);
        }
    };
    shards.push(shard);
}
export const spawnShards = async (data, payload, id = 1) => {
    if ((data.shards === 1 && id === 1) || id <= data.shards) {
        if (createNextShard) {
            createNextShard = false;
            if (data.shards >= 25)
                createShardWorker();
            else {
                basicSharding = true;
                createBasicShard(data, payload, false, id - 1);
            }
            spawnShards(data, payload, id + 1);
        }
        else {
            await delay(1000);
            spawnShards(data, payload, id);
        }
    }
};
export async function handleDiscordPayload(data, shardID) {
    eventHandlers.raw?.(data);
    switch (data.op) {
        case GatewayOpcode.HeartbeatACK:
            return eventHandlers.heartbeat?.();
        case GatewayOpcode.Dispatch:
            if (!data.t)
                return;
            return controllers[data.t]?.(data, shardID);
        default:
            return;
    }
}
export async function requestAllMembers(guild, resolve, options) {
    const nonce = `${guild.id}-${Math.random().toString()}`;
    cache.fetchAllMembersProcessingRequests.set(nonce, resolve);
    if (basicSharding) {
        return requestGuildMembers(guild.id, guild.shardID, nonce, options);
    }
    shards[guild.shardID].postMessage({
        type: "FETCH_MEMBERS",
        guildID: guild.id,
        nonce,
        options,
    });
}
export function sendGatewayCommand(type, payload) {
    if (basicSharding) {
        if (type === "EDIT_BOTS_STATUS") {
            botGatewayStatusRequest(payload);
        }
        return;
    }
    shards.forEach((shard) => {
        shard.postMessage({
            type,
            ...payload,
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmRpbmdNYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2hhcmRpbmdNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRXBELE9BQU8sRUFHTCxhQUFhLEdBQ2QsTUFBTSxxQkFBcUIsQ0FBQztBQUU3QixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFMUMsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixnQkFBZ0IsRUFDaEIsbUJBQW1CLEdBQ3BCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUNMLGNBQWMsRUFDZCxhQUFhLEVBRWIsZUFBZSxHQUNoQixNQUFNLGFBQWEsQ0FBQztBQUVyQixJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7QUFDckIsSUFBSSxhQUFhLEdBQUcsS0FBSyxDQUFDO0FBRTFCLE1BQU0sTUFBTSxHQUFhLEVBQUUsQ0FBQztBQUM1QixJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUM7QUFHM0IsTUFBTSxVQUFVLGNBQWMsQ0FBQyxPQUFPLEdBQUcsSUFBSTtJQUMzQyxlQUFlLEdBQUcsT0FBTyxDQUFDO0FBQzVCLENBQUM7QUFFRCxNQUFNLFVBQVUsaUJBQWlCLENBQUMsT0FBZ0I7SUFDaEQsTUFBTSxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDL0QsTUFBTSxLQUFLLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUMvRCxLQUFLLENBQUMsU0FBUyxHQUFHLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDNUIs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