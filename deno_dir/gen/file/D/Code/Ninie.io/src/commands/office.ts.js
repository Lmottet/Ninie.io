import { config } from "../../config.ts";
import { botCache } from "../../mod.ts";
import { addLove, getLove } from "../services/feelsService.ts";
import { Embed } from "../utils/Embed.ts";
import { createCommandAliases, sendEmbed } from "../utils/helpers.ts";
botCache.commands.set(`office`, {
    name: `office`,
    description: "Bend the knee.",
    cooldown: {
        allowedUses: 1,
        seconds: config.officeCooldown,
    },
    guildOnly: true,
    execute: function (message) {
        addLove(message.author.id, config.officeLove);
        sendEmbed(message.channelID, embed(message), `<@!353512918379397130> vient de passer un bon moment !`);
    },
});
createCommandAliases("office", ["bureau", "slurp"]);
const embed = (message) => new Embed()
    .setDescription(`Gain de ${config.officeLove} points de Ninie.io pour un passage sale au bureau !`)
    .addField("Poulain :", `${message.author.username}`)
    .addField("Heure de la gâterie :", `Le ${new Date(message.timestamp).toLocaleDateString()} à ${new Date(message.timestamp).toLocaleTimeString("Europe/Bruxelles")}`)
    .addField("Nouveau Ninie.io :", getLove(message.author.id));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2ZmaWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsib2ZmaWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDL0QsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzFDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUV0RSxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUU7SUFDOUIsSUFBSSxFQUFFLFFBQVE7SUFDZCxXQUFXLEVBQUUsZ0JBQWdCO0lBRTdCLFFBQVEsRUFBRTtRQUVSLFdBQVcsRUFBRSxDQUFDO1FBRWQsT0FBTyxFQUFFLE1BQU0sQ0FBQyxjQUFjO0tBQy9CO0lBRUQsU0FBUyxFQUFFLElBQUk7SUFDZixPQUFPLEVBQUUsVUFBVSxPQUFPO1FBQ3hCLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDOUMsU0FBUyxDQUNQLE9BQU8sQ0FBQyxTQUFTLEVBQ2pCLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFDZCx3REFBd0QsQ0FDekQsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFDLENBQUM7QUFFSCxvQkFBb0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUVwRCxNQUFNLEtBQUssR0FBRyxDQUFDLE9BQWdCLEVBQUUsRUFBRSxDQUNqQyxJQUFJLEtBQUssRUFBRTtLQUNSLGNBQWMsQ0FDYixXQUFXLE1BQU0sQ0FBQyxVQUFVLHNEQUFzRCxDQUNuRjtLQUNBLFFBQVEsQ0FBQyxXQUFXLEVBQUUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQ25ELFFBQVEsQ0FDUCx1QkFBdUIsRUFDdkIsTUFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsa0JBQWtCLEVBQUUsTUFDcEQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLGtCQUFrQixDQUNuRSxFQUFFLENBQ0g7S0FDQSxRQUFRLENBQUMsb0JBQW9CLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyJ9