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
  execute: function (message, args: KickArgs, guild) {
    if (!guild) return;

    // Delete the message command
    deleteMessage(message, "Remove kick command trigger.");
    // Kick the user with reason
    kick(guild, message.author.id, "");
    // sends the kick report into log/report
    sendEmbed(message.channel, embed(message, args));
  },
});

const embed = (message: Message, kickArgs: KickArgs) =>
  new Embed()
    .setDescription(`Suicide from : ${kickArgs.member.mention}`)
    .addField("Time", message.timestamp.toString());

interface KickArgs {
  member: Member;
}
