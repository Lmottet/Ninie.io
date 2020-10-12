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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhlbHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMxQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFHaEQsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFO0lBQzVCLElBQUksRUFBRSxNQUFNO0lBQ1osT0FBTyxFQUFFLENBQUMsT0FBZ0IsRUFBRSxFQUFFO1FBQzVCLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDdkMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUN4QyxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ25DLFdBQVcsQ0FDVCxPQUFPLENBQUMsU0FBUyxFQUNqQix1REFBdUQsQ0FDeEQsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFDLENBQUM7QUFFSCxNQUFNLE9BQU8sR0FBRyxHQUFHLEVBQUUsQ0FDbkIsSUFBSSxLQUFLLEVBQUU7S0FDUixjQUFjLENBQUMsc0JBQXNCLENBQUM7S0FDdEMsUUFBUSxDQUFDLHdCQUF3QixFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBRW5ELE1BQU0sRUFBRSxHQUFHLEdBQUcsRUFBRSxDQUNkLElBQUksS0FBSyxFQUFFO0tBQ1IsY0FBYyxDQUFDLDBDQUEwQyxDQUFDO0tBQzFELFFBQVEsQ0FBQyxjQUFjLEVBQUUsU0FBUyxDQUFDO0tBQ25DLFFBQVEsQ0FBQyxZQUFZLEVBQUUsb0JBQW9CLENBQUM7S0FDNUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO0FBRWhELE1BQU0sTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUNsQixJQUFJLEtBQUssRUFBRTtLQUNSLGNBQWMsQ0FBQyxzQkFBc0IsQ0FBQztLQUN0QyxRQUFRLENBQUMsS0FBSyxFQUFFLGtCQUFrQixDQUFDO0tBQ25DLFFBQVEsQ0FBQyx5QkFBeUIsRUFBRSxTQUFTLENBQUM7S0FDOUMsUUFBUSxDQUNQLHlFQUF5RSxFQUN6RSxzRUFBc0UsQ0FDdkUsQ0FBQyJ9