import { cache } from "../utils/cache.ts";
export function createMessage(data) {
    const message = {
        ...data,
        channelID: data.channel_id,
        guildID: data.guild_id || "",
        mentionsEveryone: data.mentions_everyone,
        mentionRoles: data.mention_roles,
        mentionChannels: data.mention_channels,
        webhookID: data.webhook_id,
        messageReference: data.message_reference,
        timestamp: Date.parse(data.timestamp),
        editedTimestamp: data.edited_timestamp
            ? Date.parse(data.edited_timestamp)
            : undefined,
        channel: cache.channels.get(data.channel_id),
        guild: () => data.guild_id ? cache.guilds.get(data.guild_id) : undefined,
        member: () => message.guild()?.members.get(data.author.id),
        mentions: () => data.mentions.map((mention) => message.guild()?.members.get(mention.id)),
    };
    delete message.channel_id;
    delete message.guild_id;
    delete message.mentions_everyone;
    delete message.mention_channels;
    delete message.mention_roles;
    delete message.webhook_id;
    delete message.message_reference;
    delete message.edited_timestamp;
    return message;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRTFDLE1BQU0sVUFBVSxhQUFhLENBQUMsSUFBMEI7SUFDdEQsTUFBTSxPQUFPLEdBQUc7UUFDZCxHQUFHLElBQUk7UUFDUCxTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVU7UUFDMUIsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLElBQUksRUFBRTtRQUM1QixnQkFBZ0IsRUFBRSxJQUFJLENBQUMsaUJBQWlCO1FBQ3hDLFlBQVksRUFBRSxJQUFJLENBQUMsYUFBYTtRQUNoQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGdCQUFnQjtRQUN0QyxTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVU7UUFDMUIsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQjtRQUN4QyxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3JDLGVBQWUsRUFBRSxJQUFJLENBQUMsZ0JBQWdCO1lBQ3BDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztZQUNuQyxDQUFDLENBQUMsU0FBUztRQUNiLE9BQU8sRUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFFO1FBQzdDLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7UUFDeEUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQzFELFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FDYixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBRSxDQUFDO0tBQzVFLENBQUM7SUFHRixPQUFPLE9BQU8sQ0FBQyxVQUFVLENBQUM7SUFDMUIsT0FBTyxPQUFPLENBQUMsUUFBUSxDQUFDO0lBQ3hCLE9BQU8sT0FBTyxDQUFDLGlCQUFpQixDQUFDO0lBQ2pDLE9BQU8sT0FBTyxDQUFDLGdCQUFnQixDQUFDO0lBQ2hDLE9BQU8sT0FBTyxDQUFDLGFBQWEsQ0FBQztJQUM3QixPQUFPLE9BQU8sQ0FBQyxVQUFVLENBQUM7SUFDMUIsT0FBTyxPQUFPLENBQUMsaUJBQWlCLENBQUM7SUFDakMsT0FBTyxPQUFPLENBQUMsZ0JBQWdCLENBQUM7SUFFaEMsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQyJ9