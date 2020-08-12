import { botCache } from "../../mod.ts";
import { Embed } from "../utils/Embed.ts";
import { createCommandAliases, sendEmbed } from "../utils/helpers.ts";

const druidResponse = () => {
  return new Embed()
    .setDescription("Recommandations de classe")
    .addField("Joueurs de la guilde à contacter: ", "Olzimare")
    .addField(
      "Streamers : ",
      "Sapin - Nyruus: https://www.twitch.tv/nyruusqt, Ours - Tomoboar : https://www.twitch.tv/dorkibear, Poulet - Krona: https://www.twitch.tv/kronawow",
    );
};

botCache.commands.set("druid", {
  name: "druid",
  execute: (message) => {
    sendEmbed(
      message.channel,
      druidResponse(),
      `<@!${message.author.id}>`,
    );
  },
});

createCommandAliases("druid", ["drood", "druide, olzimare"]);
