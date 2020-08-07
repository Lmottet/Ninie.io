import { sendMessage } from "../../deps.ts";
import { botCache } from "../../mod.ts";
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
    .addField("avatar, gm, meow, sing", "no args");

const io = () =>
  new Embed()
    .setDescription(`Des commandes liées au score de Ninie.io`)
    .addField("harem, score", "no args")
    .addField("hate, love", `args: @user number`)
    .addField("office", "alias slurp, bureau");

const useful = () =>
  new Embed()
    .setDescription(`Des commandes utiles`)
    .addField("help", "no args")
    .addField("rio", `args: realm/name`);
