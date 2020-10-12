import { botCache } from "../../mod.ts";
import { Embed } from "../utils/Embed.ts";
import { sendEmbed } from "../utils/helpers.ts";
const druidResponse = () => {
    return new Embed()
        .setDescription("Exemples de macros")
        .addField("Macro type en heal :", `#showtooltip 
       / use[@mouseover, help, nodead][help, nodead][@player]Fleur de vie,
    `).addField("Macro type en dps :", `#showtooltip
        /cast [exists] [@mouseover]Fireball
    `);
};
botCache.commands.set("macro", {
    name: "macro",
    execute: (message) => {
        sendEmbed(message.channelID, druidResponse(), `<@!${message.author.id}>`);
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFjcm8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtYWNyby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMxQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFHaEQsTUFBTSxhQUFhLEdBQUcsR0FBRyxFQUFFO0lBQ3pCLE9BQU8sSUFBSSxLQUFLLEVBQUU7U0FDZixjQUFjLENBQUMsb0JBQW9CLENBQUM7U0FDcEMsUUFBUSxDQUNQLHNCQUFzQixFQUN0Qjs7S0FFRCxDQUNBLENBQUMsUUFBUSxDQUNSLHFCQUFxQixFQUNyQjs7S0FFRCxDQUNBLENBQUM7QUFDTixDQUFDLENBQUM7QUFFRixRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUU7SUFDN0IsSUFBSSxFQUFFLE9BQU87SUFDYixPQUFPLEVBQUUsQ0FBQyxPQUFnQixFQUFFLEVBQUU7UUFDNUIsU0FBUyxDQUNQLE9BQU8sQ0FBQyxTQUFTLEVBQ2pCLGFBQWEsRUFBRSxFQUNmLE1BQU0sT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEdBQUcsQ0FDM0IsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFDLENBQUMifQ==