import { sendMessage } from "../../deps.ts";
import { botCache } from "../../mod.ts";
import { Embed } from "../utils/Embed.ts";
import { sendEmbed } from "../utils/helpers.ts";
botCache.commands.set("help", {
    name: `help`,
    execute: (message) => {
        sendEmbed(message.channelID, useful());
        sendEmbed(message.channelID, randoms());
        sendEmbed(message.channelID, io());
        sendMessage(message.channelID, "Et en bonus: la commande mystère ! Bonne recherche :)");
    },
});
const randoms = () => new Embed()
    .setDescription(`Des commandes au pif`)
    .addField("avatar, gm, meow, sing", "no args");
const io = () => new Embed()
    .setDescription(`Des commandes liées au score de Ninie.io`)
    .addField("harem, score", "no args")
    .addField("hate, love", `args: @user number`)
    .addField("office", "alias: slurp, bureau");
const useful = () => new Embed()
    .setDescription(`Des commandes utiles`)
    .addField("rio", `args: realm/name`)
    .addField("help, corruption, macro", "no args")
    .addField("druid, priest, monk, paladin, war, hunter, mage, warlock, rogue, dk, dh", "no args - alias en français & diminutifs courant (druide, démo etc.)");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhlbHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMxQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFaEQsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFO0lBQzVCLElBQUksRUFBRSxNQUFNO0lBQ1osT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDbkIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUN2QyxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQ3hDLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbkMsV0FBVyxDQUNULE9BQU8sQ0FBQyxTQUFTLEVBQ2pCLHVEQUF1RCxDQUN4RCxDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUMsQ0FBQztBQUVILE1BQU0sT0FBTyxHQUFHLEdBQUcsRUFBRSxDQUNuQixJQUFJLEtBQUssRUFBRTtLQUNSLGNBQWMsQ0FBQyxzQkFBc0IsQ0FBQztLQUN0QyxRQUFRLENBQUMsd0JBQXdCLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFFbkQsTUFBTSxFQUFFLEdBQUcsR0FBRyxFQUFFLENBQ2QsSUFBSSxLQUFLLEVBQUU7S0FDUixjQUFjLENBQUMsMENBQTBDLENBQUM7S0FDMUQsUUFBUSxDQUFDLGNBQWMsRUFBRSxTQUFTLENBQUM7S0FDbkMsUUFBUSxDQUFDLFlBQVksRUFBRSxvQkFBb0IsQ0FBQztLQUM1QyxRQUFRLENBQUMsUUFBUSxFQUFFLHNCQUFzQixDQUFDLENBQUM7QUFFaEQsTUFBTSxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQ2xCLElBQUksS0FBSyxFQUFFO0tBQ1IsY0FBYyxDQUFDLHNCQUFzQixDQUFDO0tBQ3RDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsa0JBQWtCLENBQUM7S0FDbkMsUUFBUSxDQUFDLHlCQUF5QixFQUFFLFNBQVMsQ0FBQztLQUM5QyxRQUFRLENBQ1AseUVBQXlFLEVBQ3pFLHNFQUFzRSxDQUN2RSxDQUFDIn0=