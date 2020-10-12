import { botID, hasChannelPermissions, Permissions } from "../../deps.ts";
import { botCache } from "../../mod.ts";
import { sendResponse } from "../utils/helpers.ts";
function missingCommandPermission(message, command, missingPermissions, type) {
    const perms = missingPermissions.join(", ");
    const response = type === "framework/core:BOT_CHANNEL_PERM"
        ? `I am missing the following permissions in this channel: **${perms}**`
        : type === "framework/core:BOT_SERVER_PERM"
            ? `I am missing the following permissions in this server from my roles: **${perms}**`
            : type === "framework/core:USER_CHANNEL_PERM"
                ? `You are missing the following permissions in this channel: **${perms}**`
                : `You are missing the following permissions in this server from your roles: **${perms}**`;
    sendResponse(message, response);
}
botCache.inhibitors.set("permissions", async function (message, command, guild) {
    if (!command.botChannelPermissions?.length &&
        !command.botServerPermissions?.length &&
        !command.userChannelPermissions?.length &&
        !command.userServerPermissions?.length) {
        return false;
    }
    if (!guild)
        return true;
    const botMember = guild.members.get(botID);
    if (!botMember)
        return true;
    if (command.userChannelPermissions?.length) {
        const missingPermissions = command.userChannelPermissions.filter((perm) => !hasChannelPermissions(message.channelID, message.author.id, [
            Permissions[perm],
        ]));
        if (missingPermissions.length) {
            missingCommandPermission(message, command, missingPermissions, "framework/core:USER_CHANNEL_PERM");
            return false;
        }
    }
    if (command.userServerPermissions?.length) {
        const missingPermissions = command.userServerPermissions.filter((perm) => !hasChannelPermissions(message.channelID, message.author.id, [
            Permissions[perm],
        ]));
        if (missingPermissions.length) {
            missingCommandPermission(message, command, missingPermissions, "framework/core:USER_CHANNEL_PERM");
            return false;
        }
    }
    if (command.botChannelPermissions?.length) {
        const missingPermissions = command.botChannelPermissions.filter((perm) => !hasChannelPermissions(message.channelID, message.author.id, [
            Permissions[perm],
        ]));
        if (missingPermissions.length) {
            missingCommandPermission(message, command, missingPermissions, "framework/core:USER_CHANNEL_PERM");
            return false;
        }
    }
    if (command.botServerPermissions?.length) {
        const missingPermissions = command.botServerPermissions.filter((perm) => !hasChannelPermissions(message.channelID, message.author.id, [
            Permissions[perm],
        ]));
        if (missingPermissions.length) {
            missingCommandPermission(message, command, missingPermissions, "framework/core:USER_CHANNEL_PERM");
            return false;
        }
    }
    return false;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVybWlzc2lvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwZXJtaXNzaW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsS0FBSyxFQUNMLHFCQUFxQixFQUdyQixXQUFXLEVBRVosTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUV4QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFHbkQsU0FBUyx3QkFBd0IsQ0FDL0IsT0FBZ0IsRUFDaEIsT0FBZ0IsRUFDaEIsa0JBQWdDLEVBQ2hDLElBSXFDO0lBRXJDLE1BQU0sS0FBSyxHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QyxNQUFNLFFBQVEsR0FDWixJQUFJLEtBQUssaUNBQWlDO1FBQ3hDLENBQUMsQ0FBQyw2REFBNkQsS0FBSyxJQUFJO1FBQ3hFLENBQUMsQ0FBQyxJQUFJLEtBQUssZ0NBQWdDO1lBQzNDLENBQUMsQ0FBQywwRUFBMEUsS0FBSyxJQUFJO1lBQ3JGLENBQUMsQ0FBQyxJQUFJLEtBQUssa0NBQWtDO2dCQUM3QyxDQUFDLENBQUMsZ0VBQWdFLEtBQUssSUFBSTtnQkFDM0UsQ0FBQyxDQUFDLCtFQUErRSxLQUFLLElBQUksQ0FBQztJQUUvRixZQUFZLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ2xDLENBQUM7QUFFRCxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsS0FBSyxXQUMxQyxPQUFlLEVBQ2YsT0FBZSxFQUNmLEtBQXVCO0lBR3ZCLElBQ0UsQ0FBQyxPQUFPLENBQUMscUJBQXFCLEVBQUUsTUFBTTtRQUN0QyxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRSxNQUFNO1FBQ3JDLENBQUMsT0FBTyxDQUFDLHNCQUFzQixFQUFFLE1BQU07UUFDdkMsQ0FBQyxPQUFPLENBQUMscUJBQXFC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