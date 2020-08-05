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
        sendEmbed(message.channel, embed(message), `<@!${config.ninieTag}> vient de passer un bon moment !`);
    },
});
createCommandAliases("office", ["bureau", "slurp"]);
const embed = (message) => new Embed()
    .setDescription(`Gain de ${config.officeLove} points de Ninie.io pour un passage sale au bureau !`)
    .addField("Poulain :", `${message.author.username}`)
    .addField("Heure de la gâterie :", `Le ${new Date(message.timestamp).toLocaleDateString()} à ${new Date(message.timestamp).toLocaleTimeString("Europe/Bruxelles")}`)
    .addField("Nouveau Ninie.io :", getLove(message.author.id));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2ZmaWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsib2ZmaWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDL0QsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzFDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUV0RSxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUU7SUFDOUIsSUFBSSxFQUFFLFFBQVE7SUFDZCxXQUFXLEVBQUUsZ0JBQWdCO0lBRTdCLFFBQVEsRUFBRTtRQUVSLFdBQVcsRUFBRSxDQUFDO1FBRWQsT0FBTyxFQUFFLE1BQU0sQ0FBQyxjQUFjO0tBQy9CO0lBRUQsU0FBUyxFQUFFLElBQUk7SUFDZixPQUFPLEVBQUUsVUFBVSxPQUFPO1FBQ3hCLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDOUMsU0FBUyxDQUNQLE9BQU8sQ0FBQyxPQUFPLEVBQ2YsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUNkLE1BQU0sTUFBTSxDQUFDLFFBQVEsbUNBQW1DLENBQ3pELENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsb0JBQW9CLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFFcEQsTUFBTSxLQUFLLEdBQUcsQ0FBQyxPQUFnQixFQUFFLEVBQUUsQ0FDakMsSUFBSSxLQUFLLEVBQUU7S0FDUixjQUFjLENBQ2IsV0FBVyxNQUFNLENBQUMsVUFBVSxzREFBc0QsQ0FDbkY7S0FDQSxRQUFRLENBQUMsV0FBVyxFQUFFLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUNuRCxRQUFRLENBQ1AsdUJBQXVCLEVBQ3ZCLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLGtCQUFrQixFQUFFLE1BQ3BELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxrQkFBa0IsQ0FDbkUsRUFBRSxDQUNIO0tBQ0EsUUFBUSxDQUFDLG9CQUFvQixFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMifQ==