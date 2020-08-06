import { config } from "../../config.ts";
import { Message, sendMessage } from "../../deps.ts";
import { botCache } from "../../mod.ts";
import { getLove } from "../services/feelsService.ts";
import { Embed } from "../utils/Embed.ts";
import { sendEmbed } from "../utils/helpers.ts";

botCache.commands.set("help", {
  name: `help`,
  execute: (message) => {
    sendEmbed(message.channel, randoms());
    sendEmbed(message.channel, io());
    sendEmbed(message.channel, useful());
    sendMessage(
      message.channel,
      "Et en bonus: la commande mystère ! Bonne recherche :)",
    );
  },
});

const randoms = () =>
  new Embed()
    .setDescription(`Des commandes au pif`)
    .addField("avatar", "")
    .addField("gm", ``)
    .addField("meow", "")
    .addField("sing", "");

const io = () =>
  new Embed()
    .setDescription(`Des commandes lier au score de Ninie.io`)
    .addField("harem", "")
    .addField("hate (@user, number)", ``)
    .addField("love(@user, number)", "")
    .addField("office", "alias slurp, bureau")
    .addField("score", "");

const useful = () =>
  new Embed()
    .setDescription(`Des commandes au pif`)
    .addField("help", "")
    .addField("rio(realm / name);", ``);
