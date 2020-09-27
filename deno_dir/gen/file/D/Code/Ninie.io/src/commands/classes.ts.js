import { botCache } from "../../mod.ts";
import { Embed } from "../utils/Embed.ts";
import { createCommandAliases, sendEmbed } from "../utils/helpers.ts";
const classResponse = (guildPlayer, streamers) => {
    return new Embed()
        .setDescription("Recommandations de classe")
        .addField("Joueurs de la guilde à contacter: ", guildPlayer)
        .addField("Streamers : ", streamers);
};
const classCommand = (command, guildPlayer, streamers) => {
    botCache.commands.set(command, {
        name: command,
        execute: (message) => {
            sendEmbed(message.channelID, classResponse(guildPlayer, streamers), `<@!${message.author.id}>`);
        },
    });
};
classCommand("priest", "Lincce", "help me find 'em");
createCommandAliases("priest", ["prêtre", "pretre"]);
classCommand("monk", "Fupô", "Tank - Andybrew : https://www.twitch.tv/andybrew3");
createCommandAliases("monk", ["moine"]);
classCommand("warlock", "Occitia, Olsimar", "help me find 'em");
createCommandAliases("warlock", ["lock", "démo", "démoniste"]);
classCommand("paladin", "Iraldin", "help me find 'em");
createCommandAliases("paladin", ["palarpette", "carpette", "pala", "palouf"]);
classCommand("hunter", "Zeki (Ghorim), Kerby", "BM - Gingi : https://www.twitch.tv/gingitv");
createCommandAliases("hunter", ["hunter", "hunt", "chasseur", "chassou"]);
classCommand("war", "Kerby (Willow)", "Tank - Andybrew https://www.twitch.tv/andybrew3");
createCommandAliases("war", ["guerrier"]);
classCommand("shaman", "Ñil, Erienne (Olzimare)", "help me find 'em");
createCommandAliases("shaman", ["sham", "chaman", "chamy"]);
classCommand("dh", "tbd", "help me find 'em");
createCommandAliases("dh", ["chasseur-de-démon", "demon-hunter", "chasseur-de-demon"]);
classCommand("dk", "tbd", "help me find 'em");
createCommandAliases("dk", ["chevalier-de-la-mort", "deathknight"]);
classCommand("rogue", "tbd", "help me find 'em");
createCommandAliases("rogue", ["voleur", "fufu"]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN4QyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDMUMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXRFLE1BQU0sYUFBYSxHQUFHLENBQ3BCLFdBQW1CLEVBQ25CLFNBQWlCLEVBQ2pCLEVBQUU7SUFDRixPQUFPLElBQUksS0FBSyxFQUFFO1NBQ2YsY0FBYyxDQUFDLDJCQUEyQixDQUFDO1NBQzNDLFFBQVEsQ0FBQyxvQ0FBb0MsRUFBRSxXQUFXLENBQUM7U0FDM0QsUUFBUSxDQUFDLGNBQWMsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUN6QyxDQUFDLENBQUM7QUFFRixNQUFNLFlBQVksR0FBRyxDQUNuQixPQUFlLEVBQ2YsV0FBbUIsRUFDbkIsU0FBaUIsRUFDakIsRUFBRTtJQUNGLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRTtRQUM3QixJQUFJLEVBQUUsT0FBTztRQUNiLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ25CLFNBQVMsQ0FDUCxPQUFPLENBQUMsU0FBUyxFQUNqQixhQUFhLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxFQUNyQyxNQUFNLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFHLENBQzNCLENBQUM7UUFDSixDQUFDO0tBQ0YsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBRUYsWUFBWSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztBQUNyRCxvQkFBb0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUVyRCxZQUFZLENBQ1YsTUFBTSxFQUNOLE1BQU0sRUFDTixtREFBbUQsQ0FDcEQsQ0FBQztBQUNGLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFFeEMsWUFBWSxDQUFDLFNBQVMsRUFBRSxrQkFBa0IsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0FBQ2hFLG9CQUFvQixDQUFDLFNBQVMsRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQztBQUUvRCxZQUFZLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0FBQ3ZELG9CQUFvQixDQUFDLFNBQVMsRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFFOUUsWUFBWSxDQUNWLFFBQVEsRUFDUixzQkFBc0IsRUFDdEIsNENBQTRDLENBQzdDLENBQUM7QUFDRixvQkFBb0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0FBRTFFLFlBQVksQ0FDVixLQUFLLEVBQ0wsZ0JBQWdCLEVBQ2hCLGlEQUFpRCxDQUNsRCxDQUFDO0FBQ0Ysb0JBQW9CLENBQUMsS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztBQUUxQyxZQUFZLENBQUMsUUFBUSxFQUFFLHlCQUF5QixFQUFFLGtCQUFrQixDQUFDLENBQUM7QUFDdEUsb0JBQW9CLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBRTVELFlBQVksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLGtCQUFrQixDQUFDLENBQUM7QUFDOUMsb0JBQW9CLENBQ2xCLElBQUksRUFDSixDQUFDLG1CQUFtQixFQUFFLGNBQWMsRUFBRSxtQkFBbUIsQ0FBQyxDQUMzRCxDQUFDO0FBRUYsWUFBWSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztBQUM5QyxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDO0FBRXBFLFlBQVksQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLGtCQUFrQixDQUFDLENBQUM7QUFDakQsb0JBQW9CLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMifQ==