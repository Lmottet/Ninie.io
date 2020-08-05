import { botCache } from "../../mod.ts";
import { Embed } from "../utils/Embed.ts";
import { sendEmbed } from "../utils/helpers.ts";
import { addLove } from "../services/feelsService.ts";
import { config } from "../../config.ts";
import { Message } from "../../deps.ts";

botCache.commands.set(`office`, {
  name: `office`,
  description: "Bend the knee.",
  // adds cooldowns to the command
  cooldown: {
    // usages in certain duration of seconds below
    allowedUses: 1,
    // the cooldown
    seconds: config.officeCooldown,
  },
  // Prevents it from being used in dms
  guildOnly: true,
  execute: function (message) {
    console.log(new Date(message.timestamp))
    addLove(message.author.id, config.officeLove);
    sendEmbed(message.channel, embed(message));
  },
});

const embed = (message: Message) =>
  new Embed()
    .setDescription(
      `A reçu ${config.officeLove} points de Ninie.io pour un passage sale au bureau`,
    )
    .addField("Poulain ", `@${message.author.id}`)
    .addField("Heure ", message.timestamp.toString());
