import { botCache } from "../../mod.ts";
import { Embed } from "../utils/Embed.ts";
import { createCommandAliases, sendEmbed } from "../utils/helpers.ts";

const druidResponse = () => {
  return new Embed()
    .setDescription("Class recommandations")
    .addField("Guild player(s) that might help : ", "Olzimare")
    .addField("Popular streamers : ", "Naeniaqt, Tomoboar, Krona";);
};

botCache.commands.set('druid', {
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
