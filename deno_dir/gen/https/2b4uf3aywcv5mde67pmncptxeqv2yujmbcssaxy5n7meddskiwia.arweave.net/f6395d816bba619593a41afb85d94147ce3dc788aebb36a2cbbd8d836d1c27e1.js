import { botID, eventHandlers } from "../module/client.ts";
import { structures } from "../structures/mod.ts";
import { cacheHandlers } from "./cache.ts";
export async function handleInternalMessageReactionAdd(data) {
    if (data.t !== "MESSAGE_REACTION_ADD")
        return;
    const payload = data.d;
    const message = await cacheHandlers.get("messages", payload.message_id);
    if (message) {
        const previousReactions = message.reactions;
        const reactionExisted = previousReactions?.find((reaction) => reaction.emoji.id === payload.emoji.id &&
            reaction.emoji.name === payload.emoji.name);
        if (reactionExisted)
            reactionExisted.count++;
        else {
            const newReaction = {
                count: 1,
                me: payload.user_id === botID,
                emoji: { ...payload.emoji, id: payload.emoji.id || undefined },
            };
            message.reactions = message.reactions
                ? [...message.reactions, newReaction]
                : [newReaction];
        }
        cacheHandlers.set("messages", payload.message_id, message);
    }
    if (payload.member && payload.guild_id) {
        const guild = await cacheHandlers.get("guilds", payload.guild_id);
        guild?.members.set(payload.member.user.id, await structures.createMember(payload.member, guild.id));
    }
    const uncachedOptions = {
        ...payload,
        id: payload.message_id,
        channelID: payload.channel_id,
        guildID: payload.guild_id,
    };
    eventHandlers.reactionAdd?.(message || uncachedOptions, payload.emoji, payload.user_id);
}
export async function handleInternalMessageReactionRemove(data) {
    if (data.t !== "MESSAGE_REACTION_REMOVE")
        return;
    const payload = data.d;
    const message = await cacheHandlers.get("messages", payload.message_id);
    if (message) {
        const previousReactions = message.reactions;
        const reactionExisted = previousReactions?.find((reaction) => reaction.emoji.id === payload.emoji.id &&
            reaction.emoji.name === payload.emoji.name);
        if (reactionExisted)
            reactionExisted.count--;
        else {
            const newReaction = {
                count: 1,
                me: payload.user_id === botID,
                emoji: { ...payload.emoji, id: payload.emoji.id || undefined },
            };
            message.reactions = message.reactions
                ? [...message.reactions, newReaction]
                : [newReaction];
        }
        cacheHandlers.set("messages", payload.message_id, message);
    }
    if (payload.member && payload.guild_id) {
        const guild = await cacheHandlers.get("guilds", payload.guild_id);
        guild?.members.set(payload.member.user.id, await structures.createMember(payload.member, guild.id));
    }
    const uncachedOptions = {
        ...payload,
        id: payload.message_id,
        channelID: payload.channel_id,
        guildID: payload.guild_id,
    };
    eventHandlers.reactionRemove?.(message || uncachedOptions, payload.emoji, payload.user_id);
}
export function handleInternalMessageReactionRemoveAll(data) {
    if (data.t !== "MESSAGE_REACTION_REMOVE_ALL")
        return;
    eventHandlers.reactionRemoveAll?.(data.d);
}
export function handleInternalMessageReactionRemoveEmoji(data) {
    if (data.t !== "MESSAGE_REACTION_REMOVE_EMOJI")
        return;
    eventHandlers.reactionRemoveEmoji?.(data.d);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhY3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVhY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFM0MsTUFBTSxDQUFDLEtBQUssVUFBVSxnQ0FBZ0MsQ0FBQyxJQUFvQjtJQUN6RSxJQUFJLElBQUksQ0FBQyxDQUFDLEtBQUssc0JBQXNCO1FBQUUsT0FBTztJQUU5QyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBMkIsQ0FBQztJQUNqRCxNQUFNLE9BQU8sR0FBRyxNQUFNLGFBQWEsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUV4RSxJQUFJLE9BQU8sRUFBRTtRQUNYLE1BQU0saUJBQWlCLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQztRQUM1QyxNQUFNLGVBQWUsR0FBRyxpQkFBaUIsRUFBRSxJQUFJLENBQzdDLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FDWCxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdEMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQzdDLENBQUM7UUFFRixJQUFJLGVBQWU7WUFBRSxlQUFlLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDeEM7WUFDSCxNQUFNLFdBQVcsR0FBRztnQkFDbEIsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsRUFBRSxFQUFFLE9BQU8sQ0FBQyxPQUFPLEtBQUssS0FBSztnQkFDN0IsS0FBSyxFQUFFLEVBQUUsR0FBRyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFB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