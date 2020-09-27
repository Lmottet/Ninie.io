import { botID, hasChannelPermissions, Permissions, } from "../../deps.ts";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVybWlzc2lvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwZXJtaXNzaW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsS0FBSyxFQUNMLHFCQUFxQixFQUdyQixXQUFXLEdBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUV4QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFHbkQsU0FBUyx3QkFBd0IsQ0FDL0IsT0FBZ0IsRUFDaEIsT0FBZ0IsRUFDaEIsa0JBQWdDLEVBQ2hDLElBSXFDO0lBRXJDLE1BQU0sS0FBSyxHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QyxNQUFNLFFBQVEsR0FDWixJQUFJLEtBQUssaUNBQWlDO1FBQ3hDLENBQUMsQ0FBQyw2REFBNkQsS0FBSyxJQUFJO1FBQ3hFLENBQUMsQ0FBQyxJQUFJLEtBQUssZ0NBQWdDO1lBQzNDLENBQUMsQ0FBQywwRUFBMEUsS0FBSyxJQUFJO1lBQ3JGLENBQUMsQ0FBQyxJQUFJLEtBQUssa0NBQWtDO2dCQUM3QyxDQUFDLENBQUMsZ0VBQWdFLEtBQUssSUFBSTtnQkFDM0UsQ0FBQyxDQUFDLCtFQUErRSxLQUFLLElBQUksQ0FBQztJQUUvRixZQUFZLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ2xDLENBQUM7QUFFRCxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsS0FBSyxXQUMxQyxPQUFPLEVBQ1AsT0FBTyxFQUNQLEtBQUs7SUFHTCxJQUNFLENBQUMsT0FBTyxDQUFDLHFCQUFxQixFQUFFLE1BQU07UUFDdEMsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEVBQUUsTUFBTTtRQUNyQyxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsRUFBRSxNQUFNO1FBQ3ZDLENBQUMsT0FBTyxDQUFDLHFCQUFxQixF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