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
        kick(guild, message.author.id, "");
        sendEmbed(message.channelID, embed(message));
    },
});
const embed = (message) => new Embed()
    .setDescription(`Suicide from : ${userTag(message.author.username, message.author.discriminator)}`)
    .addField("Time", message.timestamp.toString());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52aW5jaWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImludmluY2libGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLGFBQWEsRUFDYixJQUFJLEdBR0wsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN4QyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDMUMsT0FBTyxFQUFFLFNBQVMsRUFBZ0IsTUFBTSxxQkFBcUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFNUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFO0lBQ2xDLElBQUksRUFBRSxZQUFZO0lBQ2xCLFdBQVcsRUFBRSxrQkFBa0I7SUFFL0IsU0FBUyxFQUFFLElBQUk7SUFDZixvQkFBb0IsRUFBRSxDQUFDLGVBQWUsQ0FBQztJQUN2QyxxQkFBcUIsRUFBRSxDQUFDLGNBQWMsQ0FBQztJQUN2QyxPQUFPLEVBQUUsVUFBVSxPQUFPLEVBQUUsS0FBSztRQUMvQixJQUFJLENBQUMsS0FBSztZQUFFLE9BQU87UUFHbkIsYUFBYSxDQUFDLE9BQU8sRUFBRSw4QkFBOEIsQ0FBQyxDQUFDO1FBRXZELElBQUksQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFbkMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDL0MsQ0FBQztDQUNGLENBQUMsQ0FBQztBQUVILE1BQU0sS0FBSyxHQUFHLENBQUMsT0FBZ0IsRUFBRSxFQUFFLENBQ2pDLElBQUksS0FBSyxFQUFFO0tBQ1IsY0FBYyxDQUNiLGtCQUNFLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FDL0QsRUFBRSxDQUNIO0tBQ0EsUUFBUSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMifQ==