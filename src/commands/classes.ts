import { botCache } from "../../mod.ts";
import { Embed } from "../utils/Embed.ts";
import { createCommandAliases, sendEmbed } from "../utils/helpers.ts";

const classResponse = (
  guildPlayer: string,
  streamers: string,
) => {
  return new Embed()
    .setDescription("Class recommandations")
    .addField("Guild player(s) that might help : ", guildPlayer)
    .addField("Popular streamers : ", streamers);
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
