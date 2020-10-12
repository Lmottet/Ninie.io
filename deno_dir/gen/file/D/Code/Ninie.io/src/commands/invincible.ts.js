import { deleteMessage, kick, } from "../../deps.ts";
import { botCache } from "../../mod.ts";
import { Embed } from "../utils/Embed.ts";
import { sendEmbed } from "../utils/helpers.ts";
import { userTag } from "../utils/users.ts";
botCache.commands.set(`invincible`, {
    name: `invincible`,
    description: "Call for murder.",
    guildOnly: true,
    botServerPermissions: ["ADMINISTRATOR"],
    userServerPermissions: ["KICK_MEMBERS"],
    execute: function (message, guild) {
        if (!guild)
            return;
        deleteMessage(message, "Remove kick command trigger.");
        kick(message.author.id, "");
        sendEmbed(message.channelID, embed(message));
    },
});
const embed = (message) => new Embed()
    .setDescription(`Suicide from : ${userTag(message.author.username, message.author.discriminator)}`)
    .addField("Time", message.timestamp.toString());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52aW5jaWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImludmluY2libGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLGFBQWEsRUFDYixJQUFJLEdBR0wsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN4QyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDMUMsT0FBTyxFQUFFLFNBQVMsRUFBZ0IsTUFBTSxxQkFBcUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFNUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFO0lBQ2xDLElBQUksRUFBRSxZQUFZO0lBQ2xCLFdBQVcsRUFBRSxrQkFBa0I7SUFFL0IsU0FBUyxFQUFFLElBQUk7SUFDZixvQkFBb0IsRUFBRSxDQUFDLGVBQWUsQ0FBQztJQUN2QyxxQkFBcUIsRUFBRSxDQUFDLGNBQWMsQ0FBQztJQUN2QyxPQUFPLEVBQUUsVUFBVSxPQUFnQixFQUFFLEtBQXdCO1FBQzNELElBQUksQ0FBQyxLQUFLO1lBQUUsT0FBTztRQUduQixhQUFhLENBQUMsT0FBTyxFQUFFLDhCQUE4QixDQUFDLENBQUM7UUFFdkQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRTVCLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQy9DLENBQUM7Q0FDRixDQUFDLENBQUM7QUFFSCxNQUFNLEtBQUssR0FBRyxDQUFDLE9BQWdCLEVBQUUsRUFBRSxDQUNqQyxJQUFJLEtBQUssRUFBRTtLQUNSLGNBQWMsQ0FDYixrQkFDRSxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQy9ELEVBQUUsQ0FDSDtLQUNBLFFBQVEsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDIn0=