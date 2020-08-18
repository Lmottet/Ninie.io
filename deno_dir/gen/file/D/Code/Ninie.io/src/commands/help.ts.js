import { sendMessage } from "../../deps.ts";
import { botCache } from "../../mod.ts";
import { Embed } from "../utils/Embed.ts";
import { sendEmbed } from "../utils/helpers.ts";
botCache.commands.set("help", {
    name: `help`,
    execute: (message) => {
        sendEmbed(message.channel, useful());
        sendEmbed(message.channel, randoms());
        sendEmbed(message.channel, io());
        sendMessage(message.channel, "Et en bonus: la commande mystère ! Bonne recherche :)");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhlbHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMxQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFaEQsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFO0lBQzVCLElBQUksRUFBRSxNQUFNO0lBQ1osT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDbkIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUNyQyxTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQ3RDLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakMsV0FBVyxDQUNULE9BQU8sQ0FBQyxPQUFPLEVBQ2YsdURBQXVELENBQ3hELENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsTUFBTSxPQUFPLEdBQUcsR0FBRyxFQUFFLENBQ25CLElBQUksS0FBSyxFQUFFO0tBQ1IsY0FBYyxDQUFDLHNCQUFzQixDQUFDO0tBQ3RDLFFBQVEsQ0FBQyx3QkFBd0IsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUVuRCxNQUFNLEVBQUUsR0FBRyxHQUFHLEVBQUUsQ0FDZCxJQUFJLEtBQUssRUFBRTtLQUNSLGNBQWMsQ0FBQywwQ0FBMEMsQ0FBQztLQUMxRCxRQUFRLENBQUMsY0FBYyxFQUFFLFNBQVMsQ0FBQztLQUNuQyxRQUFRLENBQUMsWUFBWSxFQUFFLG9CQUFvQixDQUFDO0tBQzVDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztBQUVoRCxNQUFNLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FDbEIsSUFBSSxLQUFLLEVBQUU7S0FDUixjQUFjLENBQUMsc0JBQXNCLENBQUM7S0FDdEMsUUFBUSxDQUFDLEtBQUssRUFBRSxrQkFBa0IsQ0FBQztLQUNuQyxRQUFRLENBQUMseUJBQXlCLEVBQUUsU0FBUyxDQUFDO0tBQzlDLFFBQVEsQ0FDUCx5RUFBeUUsRUFDekUsc0VBQXNFLENBQ3ZFLENBQUMifQ==