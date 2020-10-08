import { botCache } from "../../mod.ts";
import { Embed } from "../utils/Embed.ts";
import { createCommandAliases, sendEmbed } from "../utils/helpers.ts";
import { Message } from "../../deps.ts";

const druidResponse = () => {
  return new Embed()
    .setDescription("Recommandations de classe")
    .addField("Joueurs de la guilde à contacter: ", "Olzimare")
    .addField(
      "Streamers : ",
      `Sapin - Nyruus: https://www.twitch.tv/nyruusqt
      Ours - Tomoboar : https://www.twitch.tv/dorkibear
      Poulet - Krona: https://www.twitch.tv/kronawow`,
    )
    .addField(
      "Addons utiles :",
      "HealerStatsWeight",
    ).addField(
      "WeakAuras utiles :",
      "https://docs.google.com/document/d/1YUSqXAeTA9TOFMJBcyO-exg1BGf0L0zT8HNO1sVZxcs/edit",
    );
};

botCache.commands.set("druid", {
  name: "druid",
  execute: (message: Message) => {
    sendEmbed(
      message.channelID,
      druidResponse(),
      `<@!${message.author.id}>`,
    );
  },
});

createCommandAliases("druid", ["drood", "druide, olzimare"]);
