import {
  deleteMessage,
  kick,
  Member,
  Message,
} from "../../deps.ts";
import { botCache } from "../../mod.ts";
import { Embed } from "../utils/Embed.ts";
import { sendEmbed, sendResponse } from "../utils/helpers.ts";

botCache.commands.set(`invincible`, {
  name: `invincible`,
  description: "Call for murder.",
  // adds cooldowns to the command
  cooldown: {
    // usages in certain duration of seconds below
    allowedUses: 1,
    // the cooldown
    seconds: 10,
  },
  // Prevents it from being used in dms
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
      // By default this is true but for the purpose of the guide so you can see this exists.
      required: true,
    },
    {
      name: "reason",
      // The leftover string provided by the user that was not used by previous args.
      type: "...string",
      defaultValue: "No reason provided.",
      // It is silly to lowercase this but for the purpose of the guide you can see that this is also available to you.
      lowercase: true,
    },
  ],
  execute: function (message, args: KickArgs, guild) {
    if (!guild) return;
    // setting up the embed for report/log

    // Delete the message command
    deleteMessage(message, "Remove kick command trigger.");
    // Kick the user with reason
    kick(guild, args.member.user.id, args.reason);
    // sends the kick report into log/report
    sendEmbed(message, embed(message, args));
  },
});

const embed = (message: Message, kickArgs: KickArgs) =>
  new Embed()
    .setDescription(`Suicide from : ${kickArgs.member.mention}`)
    .addField("Reason >", `${kickArgs.reason}`)
    .addField("Time", message.timestamp.toString());

interface KickArgs {
  member: Member;
  reason: string;
}
