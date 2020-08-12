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
    )
    .addField(
      "Macro type :",
      `#showtooltip 
       / use[@mouseover, help, nodead][help, nodead][@player]Fleur de vie",
    `,
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
  execute: (message) => {
    sendEmbed(
      message.channel,
      druidResponse(),
      `<@!${message.author.id}>`,
    );
  },
});

createCommandAliases("druid", ["drood", "druide, olzimare"]);
