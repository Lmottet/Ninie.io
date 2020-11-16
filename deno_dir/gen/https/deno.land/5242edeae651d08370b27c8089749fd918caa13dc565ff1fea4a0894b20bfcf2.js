import { delay } from "../../deps.ts";
import { eventHandlers, setBotID } from "../module/client.ts";
import { allowNextShard } from "../module/shardingManager.ts";
import { structures } from "../structures/mod.ts";
import { cache } from "../utils/cache.ts";
import { cacheHandlers } from "./cache.ts";
export async function handleInternalReady(data, shardID) {
    if (data.t !== "READY")
        return;
    const payload = data.d;
    setBotID(payload.user.id);
    eventHandlers.shardReady?.(shardID);
    if (payload.shard && shardID === payload.shard[1] - 1) {
        await delay(5000);
        cache.isReady = true;
        eventHandlers.ready?.();
    }
    await delay(5000);
    allowNextShard();
}
export async function handleInternalPresenceUpdate(data) {
    if (data.t !== "PRESENCE_UPDATE")
        return;
    const payload = data.d;
    const oldPresence = await cacheHandlers.get("presences", payload.user.id);
    cacheHandlers.set("presences", payload.user.id, payload);
    return eventHandlers.presenceUpdate?.(payload, oldPresence);
}
export function handleInternalTypingStart(data) {
    if (data.t !== "TYPING_START")
        return;
    eventHandlers.typingStart?.(data.d);
}
export function handleInternalUserUpdate(data) {
    if (data.t !== "USER_UPDATE")
        return;
    const userData = data.d;
    cacheHandlers.forEach("guilds", (guild) => {
        const member = guild.members.get(userData.id);
        if (!member)
            return;
        Object.entries(userData).forEach(([key, value]) => {
            if (member[key] === value)
                return;
            member[key] = value;
        });
    });
    return eventHandlers.botUpdate?.(userData);
}
export async function handleInternalVoiceStateUpdate(data) {
    if (data.t !== "VOICE_STATE_UPDATE")
        return;
    const payload = data.d;
    if (!payload.guild_id)
        return;
    const guild = await cacheHandlers.get("guilds", payload.guild_id);
    if (!guild)
        return;
    const member = guild.members.get(payload.user_id) ||
        (payload.member
            ? await structures.createMember(payload.member, guild.id)
            : undefined);
    if (!member)
        return;
    const cachedState = guild.voiceStates.get(payload.user_id);
    guild.voiceStates.set(payload.user_id, {
        ...payload,
        guildID: payload.guild_id,
        channelID: payload.channel_id,
        userID: payload.user_id,
        sessionID: payload.session_id,
        selfDeaf: payload.self_deaf,
        selfMute: payload.self_mute,
        selfStream: payload.self_stream,
    });
    if (cachedState?.channelID !== payload.channel_id) {
        if (payload.channel_id) {
            cachedState?.channelID
                ?
                    eventHandlers.voiceChannelSwitch?.(member, payload.channel_id, cachedState.channelID)
                :
                    eventHandlers.voiceChannelJoin?.(member, payload.channel_id);
        }
        else if (cachedState?.channelID) {
            guild.voiceStates.delete(payload.user_id);
            eventHandlers.voiceChannelLeave?.(member, cachedState.channelID);
        }
    }
    eventHandlers.voiceStateUpdate?.(member, payload);
}
export function handleInternalWebhooksUpdate(data) {
    if (data.t !== "WEBHOOKS_UPDATE")
        return;
    const options = data.d;
    return eventHandlers.webhooksUpdate?.(options.channel_id, options.guild_id);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlzYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1pc2MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0QyxPQUFPLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzlELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFVbEQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFM0MsTUFBTSxDQUFDLEtBQUssVUFBVSxtQkFBbUIsQ0FDdkMsSUFBb0IsRUFDcEIsT0FBZTtJQUVmLElBQUksSUFBSSxDQUFDLENBQUMsS0FBSyxPQUFPO1FBQUUsT0FBTztJQUUvQixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBaUIsQ0FBQztJQUN2QyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUcxQixhQUFhLENBQUMsVUFBVSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDcEMsSUFBSSxPQUFPLENBQUMsS0FBSyxJQUFJLE9BQU8sS0FBSyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUVyRCxNQUFNLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQixLQUFLLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNyQixhQUFhLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQztLQUN6QjtJQUdELE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xCLGNBQWMsRUFBRSxDQUFDO0FBQ25CLENBQUM7QUFFRCxNQUFNLENBQUMsS0FBSyxVQUFVLDRCQUE0QixDQUFDLElBQW9CO0lBQ3JFLElBQUksSUFBSSxDQUFDLENBQUMsS0FBSyxpQkFBaUI7UUFBRSxPQUFPO0lBRXpDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxDQUEwQixDQUFDO0lBQ2hELE1BQU0sV0FBVyxHQUFHLE1BQU0sYUFBYSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMxRSxhQUFhLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUV6RCxPQUFPLGFBQWEsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFDOUQsQ0FBQztBQUVELE1BQU0sVUFBVSx5QkFBeUIsQ0FBQyxJQUFvQjtJQUM1RCxJQUFJLElBQUksQ0FBQyxDQUFDLEtBQUssY0FBYztRQUFFLE9BQU87SUFDdEMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUF1QixDQUFDLENBQUM7QUFDNUQsQ0FBQztBQUVELE1BQU0sVUFBVSx3QkFBd0IsQ0FBQyxJQUFvQjtJQUMzRCxJQUFJLElBQUksQ0FBQyxDQUFDLEtBQUssYUFBYTtRQUFFLE9BQU87SUFFckMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQWdCLENBQUM7SUFFdkMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUN4QyxNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLE1BQU07WUFBRSxPQUFPO1FBRXBCLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRTtZQUVoRCxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxLQUFLO2dCQUFFLE9BQU87WUFFbEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDN0MsQ0FBQztBQUVELE1BQU0sQ0FBQyxLQUFLLFVBQVUsOEJBQThCLENBQUMsSUFBb0I7SUFDdkUsSUFBSSxJQUFJLENBQUMsQ0FBQyxLQUFLLG9CQUFvQjtRQUFFLE9BQU87SUFFNUMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQTRCLENBQUM7SUFDbEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRO1FBQUUsT0FBTztJQUU5QixNQUFNLEtBQUssR0FBRyxNQUFNLGFBQWEsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNsRSxJQUFJLENBQUMsS0FBSztRQUFFLE9BQU87SUFFbkIsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUMvQyxDQUFDLE9BQU8sQ0FBQyxNQUFNO1lBQ2IsQ0FBQyxDQUFDLE1BQU0sVUFBVSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDekQsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2pCLElBQUksQ0FBQyxNQUFNO1FBQUUsT0FBTztJQUdwQixNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFM0QsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtRQUNyQyxHQUFHLE9BQU87UUFDVixPQUFPLEVBQUUsT0FBTyxDQUFDLFFBQVE7UUFDekIsU0FBUyxFQUFFLE9BQU8sQ0FBQyxVQUFVO1FBQzdCLE1BQU0sRUFBRSxPQUFPLENBQUMsT0FBTztRQUN2QixTQUFTLEVBQUUsT0FBTyxDQUFDLFVBQVU7UUFDN0IsUUFBUSxFQUFFLE9BQU8sQ0FBQyxTQUFTO1FBQzNCLFFBQVEsRUFBRSxPQUFPLENBQUMsU0FBUztRQUMzQixVQUFVLEVBQUUsT0FBTyxDQUFDLFdBQVc7S0FDaEMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxXQUFXLEVBQUUsU0FBUyxLQUFLLE9BQU8sQ0FBQyxVQUFVLEVBQUU7UUFFakQsSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFFO1lBQ3RCLFdBQVcsRUFBRSxTQUFTO2dCQUNwQixDQUFDO29CQUNDLGFBQWEsQ0FBQyxrQkFBa0IsRUFBRSxDQUNoQyxNQUFNLEVBQ04sT0FBTyxDQUFDLFVBQVUsRUFDbEIsV0FBVyxDQUFDLFNBQVMsQ0FDdEI7Z0JBQ0gsQ0FBQztvQkFDQyxhQUFhLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ2xFO2FBQ0ksSUFBSSxXQUFXLEVBQUUsU0FBUyxFQUFFO1lBQy9CLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMxQyxhQUFhLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ2xFO0tBQ0Y7SUFFRCxhQUFhLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDcEQsQ0FBQztBQUVELE1BQU0sVUFBVSw0QkFBNEIsQ0FBQyxJQUFvQjtJQUMvRCxJQUFJLElBQUksQ0FBQyxDQUFDLEtBQUssaUJBQWlCO1FBQUUsT0FBTztJQUV6QyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBeUIsQ0FBQztJQUMvQyxPQUFPLGFBQWEsQ0FBQyxjQUFjLEVBQUUsQ0FDbkMsT0FBTyxDQUFDLFVBQVUsRUFDbEIsT0FBTyxDQUFDLFFBQVEsQ0FDakIsQ0FBQztBQUNKLENBQUMifQ==