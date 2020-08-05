import { botCache } from "../../mod.ts";
import { Embed } from "../utils/Embed.ts";
import { sendResponse } from "../utils/helpers.ts";
import { addLove } from "../services/feelsService.ts";
import { config } from "../../config.ts";

botCache.commands.set(`office`, {
  name: `office`,
  description: "Bend the knee.",
  // adds cooldowns to the command
  cooldown: {
    // usages in certain duration of seconds below
    allowedUses: 1,
    // the cooldown
    seconds: 7200,
  },
  // Prevents it from being used in dms
  guildOnly: true,
  execute: function (message) {
    addLove(message.author.id, config.officeLove);
    // setting up the embed for report/log
    const embed = new Embed()
      .setDescription(
        `A reçu ${config.officeLove} points de Ninie.io pour un passage sale au bureau`,
      )
      .addField("Poulain ", `${message.author}`)
      .addField("Heure ", message.timestamp.toString());

    sendResponse(message, embed);
  },
});
