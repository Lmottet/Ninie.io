import { sendMessage } from "../../deps.ts";
import { botCache } from "../../mod.ts";
botCache.commands.set("gm", {
    name: `gm`,
    execute: (message) => {
        sendMessage(message.channel, "Make Vilaines Crêpes great again !");
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ20uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFeEMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFO0lBQzFCLElBQUksRUFBRSxJQUFJO0lBQ1YsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDbkIsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsb0NBQW9DLENBQUMsQ0FBQztJQUNyRSxDQUFDO0NBQ0YsQ0FBQyxDQUFDIn0=