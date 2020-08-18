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
            sendEmbed(message.channel, classResponse(guildPlayer, streamers), `<@!${message.author.id}>`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN4QyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDMUMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXRFLE1BQU0sYUFBYSxHQUFHLENBQ3BCLFdBQW1CLEVBQ25CLFNBQWlCLEVBQ2pCLEVBQUU7SUFDRixPQUFPLElBQUksS0FBSyxFQUFFO1NBQ2YsY0FBYyxDQUFDLDJCQUEyQixDQUFDO1NBQzNDLFFBQVEsQ0FBQyxvQ0FBb0MsRUFBRSxXQUFXLENBQUM7U0FDM0QsUUFBUSxDQUFDLGNBQWMsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUN6QyxDQUFDLENBQUM7QUFFRixNQUFNLFlBQVksR0FBRyxDQUNuQixPQUFlLEVBQ2YsV0FBbUIsRUFDbkIsU0FBaUIsRUFDakIsRUFBRTtJQUNGLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRTtRQUM3QixJQUFJLEVBQUUsT0FBTztRQUNiLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ25CLFNBQVMsQ0FDUCxPQUFPLENBQUMsT0FBTyxFQUNmLGFBQWEsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLEVBQ3JDLE1BQU0sT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEdBQUcsQ0FDM0IsQ0FBQztRQUNKLENBQUM7S0FDRixDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUFFRixZQUFZLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0FBQ3JELG9CQUFvQixDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBRXJELFlBQVksQ0FDVixNQUFNLEVBQ04sTUFBTSxFQUNOLG1EQUFtRCxDQUNwRCxDQUFDO0FBQ0Ysb0JBQW9CLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUV4QyxZQUFZLENBQUMsU0FBUyxFQUFFLGtCQUFrQixFQUFFLGtCQUFrQixDQUFDLENBQUM7QUFDaEUsb0JBQW9CLENBQUMsU0FBUyxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO0FBRS9ELFlBQVksQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLGtCQUFrQixDQUFDLENBQUM7QUFDdkQsb0JBQW9CLENBQUMsU0FBUyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUU5RSxZQUFZLENBQ1YsUUFBUSxFQUNSLHNCQUFzQixFQUN0Qiw0Q0FBNEMsQ0FDN0MsQ0FBQztBQUNGLG9CQUFvQixDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7QUFFMUUsWUFBWSxDQUNWLEtBQUssRUFDTCxnQkFBZ0IsRUFDaEIsaURBQWlELENBQ2xELENBQUM7QUFDRixvQkFBb0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0FBRTFDLFlBQVksQ0FBQyxRQUFRLEVBQUUseUJBQXlCLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztBQUN0RSxvQkFBb0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFFNUQsWUFBWSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztBQUM5QyxvQkFBb0IsQ0FDbEIsSUFBSSxFQUNKLENBQUMsbUJBQW1CLEVBQUUsY0FBYyxFQUFFLG1CQUFtQixDQUFDLENBQzNELENBQUM7QUFFRixZQUFZLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0FBQzlDLG9CQUFvQixDQUFDLElBQUksRUFBRSxDQUFDLHNCQUFzQixFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUM7QUFFcEUsWUFBWSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztBQUNqRCxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyJ9