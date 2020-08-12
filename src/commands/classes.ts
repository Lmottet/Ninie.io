import { botCache } from "../../mod.ts";
import { Embed } from "../utils/Embed.ts";
import { createCommandAliases, sendEmbed } from "../utils/helpers.ts";

const classResponse = (
  guildPlayer: string,
  streamers: string,
) => {
  return new Embed()
    .setDescription("Recommandations de classe")
    .addField("Joueurs de la guilde à contacter: ", guildPlayer)
    .addField("Streamers : ", streamers);
};

const classCommand = (
  command: string,
  guildPlayer: string,
  streamers: string,
) => {
  botCache.commands.set(command, {
    name: command,
    execute: (message) => {
      sendEmbed(
        message.channel,
        classResponse(guildPlayer, streamers),
        `<@!${message.author.id}>`,
      );
    },
  });
};

classCommand("priest", "Lincce", "help me find 'em");
createCommandAliases("priest", ["prêtre", "pretre"]);

classCommand("monk", "Fupô", "Andybrew");
createCommandAliases("monk", ["moine"]);

classCommand("warlock", "Occitia, Olsimar", "help me find 'em");
createCommandAliases("warlock", ["lock", "démo", "démoniste"]);

classCommand("paladin", "Iraldin", "help me find 'em");
createCommandAliases("paladin", ["palarpette", "carpette", "pala"]);

classCommand("hunter", "Zeki (Ghorim), Kerby", "help me find 'em");
createCommandAliases("hunter", ["hunter", "hunt", "chasseur", "chassou"]);

classCommand("shaman", "Ñil, Erienne (Olzimare)", "help me find 'em");
createCommandAliases("shaman", ["sham", "chaman", "chamy"]);

classCommand("dh", "tbd", "help me find 'em");
createCommandAliases("dh", ["chasseur-de-démon", "demon-hunter"]);

classCommand("dk", "tbd", "help me find 'em");
createCommandAliases("dk", ["chevalier-de-la-mort", "deathknight"]);

classCommand("rogue", "tbd", "help me find 'em");
createCommandAliases("rogue", ["voleur", "fufu"]);
