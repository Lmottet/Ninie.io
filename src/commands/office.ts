import { botCache } from "../../mod.ts";
import { Embed } from "../utils/Embed.ts";
import { sendResponse } from "../utils/helpers.ts";

botCache.commands.set(`office`, {
  name: `office`,
  description: "Bend the knee.",
  // adds cooldowns to the command
  cooldown: {
    // usages in certain duration of seconds below
    allowedUses: 1,
    // the cooldown
    seconds: 21600,
  },
  // Prevents it from being used in dms
  guildOnly: true,
  execute: function (message) {
    console.log("test office");
    // setting up the embed for report/log
    const embed = new Embed()
      .setDescription(
        `A reçu 5 points de Ninie.io pour un passage sale au bureau`,
      )
      .addField("Poulain ", `${message.author}`)
      .addField("Heure ", message.timestamp.toString());

    sendResponse(message, embed);
  },
});
