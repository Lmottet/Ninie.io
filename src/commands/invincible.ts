import {
  deleteMessage,
  kick,
  Guild,
  Message,
} from "../../deps.ts";
import { botCache } from "../../mod.ts";
import { Embed } from "../utils/Embed.ts";
import { sendEmbed, sendResponse } from "../utils/helpers.ts";
import { userTag } from "../utils/users.ts";

botCache.commands.set(`invincible`, {
  name: `invincible`,
  description: "Call for murder.",
  // Prevents it from being used in dms
  guildOnly: true,
  botServerPermissions: ["ADMINISTRATOR"],
  userServerPermissions: ["KICK_MEMBERS"],
  execute: function (message: Message, guild: Guild | undefined) {
    if (!guild) return;

    // Delete the message command
    deleteMessage(message, "Remove kick command trigger.");
    // Kick the user with reason
    kick(message.author.id, "");
    // sends the kick report into log/report
    sendEmbed(message.channelID, embed(message));
  },
});

const embed = (message: Message) =>
  new Embed()
    .setDescription(
      `Suicide from : ${
        userTag(message.author.username, message.author.discriminator)
      }`,
    )
    .addField("Time", message.timestamp.toString());