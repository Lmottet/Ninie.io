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
    .addField("avatar", "no args")
    .addField("gm", `no args`)
    .addField("meow", "no args")
    .addField("sing", "no args");

const io = () =>
  new Embed()
    .setDescription(`Des commandes lier au score de Ninie.io`)
    .addField("harem", "no args")
    .addField("hate", `args: @user number`)
    .addField("love", "args: @user, number")
    .addField("office", "alias slurp, bureau")
    .addField("score", "no args");

const useful = () =>
  new Embed()
    .setDescription(`Des commandes au pif`)
    .addField("help", "no args")
    .addField("rio", `args: realm/name`);
