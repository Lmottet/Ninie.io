export async function createMessage(data) {
    const { guild_id: guildID, channel_id: channelID, mentions_everyone: mentionsEveryone, mention_channels: mentionChannels, mention_roles: mentionRoles, webhook_id: webhookID, message_reference: messageReference, edited_timestamp: editedTimestamp, ...rest } = data;
    const message = {
        ...rest,
        channelID,
        guildID: guildID || "",
        mentions: data.mentions.map((m) => m.id),
        mentionsEveryone,
        mentionRoles,
        mentionChannels: mentionChannels || [],
        webhookID,
        messageReference,
        timestamp: Date.parse(data.timestamp),
        editedTimestamp: editedTimestamp ? Date.parse(editedTimestamp) : undefined,
    };
    return message;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsTUFBTSxDQUFDLEtBQUssVUFBVSxhQUFhLENBQUMsSUFBMEI7SUFDNUQsTUFBTSxFQUNKLFFBQVEsRUFBRSxPQUFPLEVBQ2pCLFVBQVUsRUFBRSxTQUFTLEVBQ3JCLGlCQUFpQixFQUFFLGdCQUFnQixFQUNuQyxnQkFBZ0IsRUFBRSxlQUFlLEVBQ2pDLGFBQWEsRUFBRSxZQUFZLEVBQzNCLFVBQVUsRUFBRSxTQUFTLEVBQ3JCLGlCQUFpQixFQUFFLGdCQUFnQixFQUNuQyxnQkFBZ0IsRUFBRSxlQUFlLEVBQ2pDLEdBQUcsSUFBSSxFQUNSLEdBQUcsSUFBSSxDQUFDO0lBRVQsTUFBTSxPQUFPLEdBQUc7UUFDZCxHQUFHLElBQUk7UUFDUCxTQUFTO1FBQ1QsT0FBTyxFQUFFLE9BQU8sSUFBSSxFQUFFO1FBQ3RCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUN4QyxnQkFBZ0I7UUFDaEIsWUFBWTtRQUNaLGVBQWUsRUFBRSxlQUFlLElBQUksRUFBRTtRQUN0QyxTQUFTO1FBQ1QsZ0JBQWdCO1FBQ2hCLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDckMsZUFBZSxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUztLQUMzRSxDQUFDO0lBRUYsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQyJ9