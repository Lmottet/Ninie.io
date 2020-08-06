import { cache } from "../utils/cache.ts";
export function createMessage(data) {
    const message = {
        ...data,
        channelID: data.channel_id,
        guildID: data.guild_id,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRTFDLE1BQU0sVUFBVSxhQUFhLENBQUMsSUFBMEI7SUFDdEQsTUFBTSxPQUFPLEdBQUc7UUFDZCxHQUFHLElBQUk7UUFDUCxTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVU7UUFDMUIsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRO1FBQ3RCLGdCQUFnQixFQUFFLElBQUksQ0FBQyxpQkFBaUI7UUFDeEMsWUFBWSxFQUFFLElBQUksQ0FBQyxhQUFhO1FBQ2hDLGVBQWUsRUFBRSxJQUFJLENBQUMsZ0JBQWdCO1FBQ3RDLFNBQVMsRUFBRSxJQUFJLENBQUMsVUFBVTtRQUMxQixnQkFBZ0IsRUFBRSxJQUFJLENBQUMsaUJBQWlCO1FBQ3hDLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDckMsZUFBZSxFQUFFLElBQUksQ0FBQyxnQkFBZ0I7WUFDcEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1lBQ25DLENBQUMsQ0FBQyxTQUFTO1FBQ2IsT0FBTyxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUU7UUFDN0MsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUztRQUN4RSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDMUQsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFFLENBQUM7S0FDNUUsQ0FBQztJQUdGLE9BQU8sT0FBTyxDQUFDLFVBQVUsQ0FBQztJQUMxQixPQUFPLE9BQU8sQ0FBQyxRQUFRLENBQUM7SUFDeEIsT0FBTyxPQUFPLENBQUMsaUJBQWlCLENBQUM7SUFDakMsT0FBTyxPQUFPLENBQUMsZ0JBQWdCLENBQUM7SUFDaEMsT0FBTyxPQUFPLENBQUMsYUFBYSxDQUFDO0lBQzdCLE9BQU8sT0FBTyxDQUFDLFVBQVUsQ0FBQztJQUMxQixPQUFPLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztJQUNqQyxPQUFPLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQztJQUVoQyxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDIn0=