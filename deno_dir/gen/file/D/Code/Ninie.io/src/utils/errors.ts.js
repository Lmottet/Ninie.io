import { Errors, sendMessage } from "../../deps.ts";
function missingPermResponse(permission) {
    const perm = permission.split("_").slice(1).join(" ");
    return `The bot does not have the necessary permission to ${perm.toLowerCase()}. Grant the **${perm.toUpperCase()}** permission to the bot and try again.`;
}
export function handleError(message, type) {
    switch (type) {
        case Errors.MISSING_SEND_MESSAGES:
            return sendMessage(message.channelID, missingPermResponse(type)).catch(() => undefined);
        case Errors.MISSING_MANAGE_ROLES:
        case Errors.MISSING_KICK_MEMBERS:
        case Errors.MISSING_VIEW_CHANNEL:
        case Errors.MISSING_READ_MESSAGE_HISTORY:
        case Errors.MISSING_MANAGE_NICKNAMES:
        case Errors.MISSING_MUTE_MEMBERS:
        case Errors.MISSING_DEAFEN_MEMBERS:
        case Errors.MISSING_SEND_TTS_MESSAGE:
        case Errors.MISSING_MANAGE_MESSAGES:
        case Errors.MISSING_MANAGE_CHANNELS:
        case Errors.MISSING_CREATE_INSTANT_INVITE:
        case Errors.MISSING_MANAGE_WEBHOOKS:
        case Errors.MISSING_MANAGE_EMOJIS:
        case Errors.MISSING_BAN_MEMBERS:
        case Errors.MISSING_MANAGE_GUILD:
        case Errors.MISSING_VIEW_AUDIT_LOG:
            return sendMessage(message.channelID, missingPermResponse(type));
        case Errors.DELETE_MESSAGES_MIN:
            return sendMessage(message.channelID, "You need to provide atleast 2 messages to delete multiple messages at once.");
        case Errors.MESSAGE_MAX_LENGTH:
            return sendMessage(message.channelID, "The amount of characters in this message was too large for me to send. Please contact my developers to have this fixed.");
        case Errors.NICKNAMES_MAX_LENGTH:
            return sendMessage(message.channelID, "A nickname can not be longer than 32 characters.");
        case Errors.PRUNE_MIN_DAYS:
            return sendMessage(message.channelID, "You can not prune members from the server with less than 1 days activity requirement.");
        case Errors.RATE_LIMIT_RETRY_MAXED:
            return sendMessage(message.channelID, "Errored more than the maximum amount of retries. Please contact my developers to have this fixed.");
        case Errors.MISSING_INTENT_GUILD_MEMBERS:
            return sendMessage(message.channelID, "Unable to fetch members if the bot does not have the GUILD MEMBERS intent.");
        case Errors.BOTS_HIGHEST_ROLE_TOO_LOW:
            return sendMessage(message.channelID, "The bot's highest role is too low to complete this action.");
        case Errors.CHANNEL_NOT_IN_GUILD:
            return sendMessage(message.channelID, "This function is only able to be done inside a server. This channel was not found in any server.");
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZXJyb3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQVcsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTdELFNBQVMsbUJBQW1CLENBQUMsVUFBa0I7SUFDN0MsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RELE9BQU8scURBQXFELElBQUksQ0FBQyxXQUFXLEVBQUUsaUJBQWlCLElBQUksQ0FBQyxXQUFXLEVBQUUseUNBQXlDLENBQUM7QUFDN0osQ0FBQztBQUVELE1BQU0sVUFBVSxXQUFXLENBQUMsT0FBZ0IsRUFBRSxJQUFZO0lBQ3hELFFBQVEsSUFBSSxFQUFFO1FBQ1osS0FBSyxNQUFNLENBQUMscUJBQXFCO1lBQy9CLE9BQU8sV0FBVyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQ3BFLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FDaEIsQ0FBQztRQUNKLEtBQUssTUFBTSxDQUFDLG9CQUFvQixDQUFDO1FBQ2pDLEtBQUssTUFBTSxDQUFDLG9CQUFvQixDQUFDO1FBQ2pDLEtBQUssTUFBTSxDQUFDLG9CQUFvQixDQUFDO1FBQ2pDLEtBQUssTUFBTSxDQUFDLDRCQUE0QixDQUFDO1FBQ3pDLEtBQUssTUFBTSxDQUFDLHdCQUF3QixDQUFDO1FBQ3JDLEtBQUssTUFBTSxDQUFDLG9CQUFvQixDQUFDO1FBQ2pDLEtBQUssTUFBTSxDQUFDLHNCQUFzQixDQUFDO1FBQ25DLEtBQUssTUFBTSxDQUFDLHdCQUF3QixDQUFDO1FBQ3JDLEtBQUssTUFBTSxDQUFDLHVCQUF1QixDQUFDO1FBQ3BDLEtBQUssTUFBTSxDQUFDLHVCQUF1QixDQUFDO1FBQ3BDLEtBQUssTUFBTSxDQUFDLDZCQUE2QixDQUFDO1FBQzFDLEtBQUssTUFBTSxDQUFDLHVCQUF1QixDQUFDO1FBQ3BDLEtBQUssTUFBTSxDQUFDLHFCQUFxQixDQUFDO1FBQ2xDLEtBQUssTUFBTSxDQUFDLG1CQUFtQixDQUFDO1FBQ2hDLEtBQUssTUFBTSxDQUFDLG9CQUFvQixDQUFDO1FBQ2pDLEtBQUssTUFBTSxDQUFDLHNCQUFzQjtZQUNoQyxPQUFPLFdBQVcsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbkUsS0FBSyxNQUFNLENBQUMsbUJBQW1CO1lBQzdCLE9BQU8sV0FBVyxDQUNoQixPQUFPLENBQUMsU0FBUyxFQUNqQiw2RUFBNkUsQ0FDOUUsQ0FBQztRQUNKLEtBQUssTUFBTSxDQUFDLGtCQUFrQjtZQUM1QixPQUFPLFdBQVcsQ0FDaEIsT0FBTyxDQUFDLFNBQVMsRUFDakIseUhBQXlILENBQzFILENBQUM7UUFDSixLQUFLLE1BQU0sQ0FBQyxvQkFBb0I7WUFDOUIsT0FBTyxXQUFXLENBQ2hCLE9BQU8sQ0FBQyxTQUFTLEVBQ2pCLGtEQUFrRCxDQUNuRCxDQUFDO1FBQ0osS0FBSyxNQUFNLENBQUMsY0FBYztZQUN4QixPQUFPLFdBQVcsQ0FDaEIsT0FBTyxDQUFDLFNBQVMsRUFDakIsdUZBQXVGLENBQ3hGLENBQUM7UUFDSixLQUFLLE1BQU0sQ0FBQyxzQkFBc0I7WUFDaEMsT0FBTyxXQUFXLENBQ2hCLE9BQU8sQ0FBQyxTQUFTLEVBQ2pCLG1HQUFtRyxDQUNwRyxDQUFDO1FBQ0osS0FBSyxNQUFNLENBQUMsNEJBQTRCO1lBQ3RDLE9BQU8sV0FBVyxDQUNoQixPQUFPLENBQUMsU0FBUyxFQUNqQiw0RUFBNEUsQ0FDN0UsQ0FBQztRQUNKLEtBQUssTUFBTSxDQUFDLHlCQUF5QjtZQUNuQyxPQUFPLFdBQVcsQ0FDaEIsT0FBTyxDQUFDLFNBQVMsRUFDakIsNERBQTRELENBQzdELENBQUM7UUFDSixLQUFLLE1BQU0sQ0FBQyxvQkFBb0I7WUFDOUIsT0FBTyxXQUFXLENBQ2hCLE9BQU8sQ0FBQyxTQUFTLEVBQ2pCLGtHQUFrRyxDQUNuRyxDQUFDO0tBQ0w7QUFDSCxDQUFDIn0=