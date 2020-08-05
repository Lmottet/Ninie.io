import { deleteMessage, kick, } from "../../deps.ts";
import { botCache } from "../../mod.ts";
import { Embed } from "../utils/Embed.ts";
import { sendEmbed, sendResponse } from "../utils/helpers.ts";
botCache.commands.set(`invincible`, {
    name: `invincible`,
    description: "Call for murder.",
    cooldown: {
        allowedUses: 1,
        seconds: 10,
    },
    guildOnly: true,
    botServerPermissions: ["ADMINISTRATOR"],
    userServerPermissions: ["KICK_MEMBERS"],
    arguments: [
        {
            name: "member",
            type: "member",
            missing: function (message) {
                sendResponse(message, `User cannot be found.`);
            },
            required: true,
        },
        {
            name: "reason",
            type: "...string",
            defaultValue: "No reason provided.",
            lowercase: true,
        },
    ],
    execute: function (message, args, guild) {
        if (!guild)
            return;
        deleteMessage(message, "Remove kick command trigger.");
        kick(guild, args.member.user.id, args.reason);
        sendEmbed(message.channel, embed(message, args));
    },
});
const embed = (message, kickArgs) => new Embed()
    .setDescription(`Suicide from : ${kickArgs.member.mention}`)
    .addField("Reason >", `${kickArgs.reason}`)
    .addField("Time", message.timestamp.toString());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52aW5jaWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImludmluY2libGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLGFBQWEsRUFDYixJQUFJLEdBR0wsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN4QyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDMUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUU5RCxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUU7SUFDbEMsSUFBSSxFQUFFLFlBQVk7SUFDbEIsV0FBVyxFQUFFLGtCQUFrQjtJQUUvQixRQUFRLEVBQUU7UUFFUixXQUFXLEVBQUUsQ0FBQztRQUVkLE9BQU8sRUFBRSxFQUFFO0tBQ1o7SUFFRCxTQUFTLEVBQUUsSUFBSTtJQUNmLG9CQUFvQixFQUFFLENBQUMsZUFBZSxDQUFDO0lBQ3ZDLHFCQUFxQixFQUFFLENBQUMsY0FBYyxDQUFDO0lBQ3ZDLFNBQVMsRUFBRTtRQUNUO1lBQ0UsSUFBSSxFQUFFLFFBQVE7WUFDZCxJQUFJLEVBQUUsUUFBUTtZQUNkLE9BQU8sRUFBRSxVQUFVLE9BQU87Z0JBQ3hCLFlBQVksQ0FBQyxPQUFPLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztZQUNqRCxDQUFDO1lBRUQsUUFBUSxFQUFFLElBQUk7U0FDZjtRQUNEO1lBQ0UsSUFBSSxFQUFFLFFBQVE7WUFFZCxJQUFJLEVBQUUsV0FBVztZQUNqQixZQUFZLEVBQUUscUJBQXFCO1lBRW5DLFNBQVMsRUFBRSxJQUFJO1NBQ2hCO0tBQ0Y7SUFDRCxPQUFPLEVBQUUsVUFBVSxPQUFPLEVBQUUsSUFBYyxFQUFFLEtBQUs7UUFDL0MsSUFBSSxDQUFDLEtBQUs7WUFBRSxPQUFPO1FBSW5CLGFBQWEsQ0FBQyxPQUFPLEVBQUUsOEJBQThCLENBQUMsQ0FBQztRQUV2RCxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFOUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ25ELENBQUM7Q0FDRixDQUFDLENBQUM7QUFFSCxNQUFNLEtBQUssR0FBRyxDQUFDLE9BQWdCLEVBQUUsUUFBa0IsRUFBRSxFQUFFLENBQ3JELElBQUksS0FBSyxFQUFFO0tBQ1IsY0FBYyxDQUFDLGtCQUFrQixRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO0tBQzNELFFBQVEsQ0FBQyxVQUFVLEVBQUUsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDMUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMifQ==