import { botCache } from "../../mod.ts";
import { Embed } from "../utils/Embed.ts";
import { sendEmbed } from "../utils/helpers.ts";

const druidResponse = () => {
  return new Embed()
    .setDescription("Exemples de macros")
    .addField(
      "Macro type en heal :",
      `#showtooltip 
       / use[@mouseover, help, nodead][help, nodead][@player]Fleur de vie,
    `,
    ).addField(
      "Macro type en dps :",
      `#showtooltip
        /cast [exists] [@mouseover]Fireball
    `,
    );
};

botCache.commands.set("macro", {
  name: "macro",
  execute: (message) => {
    sendEmbed(
      message.channelID,
      druidResponse(),
      `<@!${message.author.id}>`,
    );
  },
});
