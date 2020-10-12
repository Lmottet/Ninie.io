import { botCache } from "../../mod.ts";
import { sendMessage } from "../../deps.ts";
import { isUserAdmin } from "../authorizations.ts";
botCache.commands.set("meow", {
    name: `meow`,
    execute: (message) => {
        if (isUserAdmin(message.author.username, message.author.discriminator)) {
            sendMessage(message.channelID, "MEOOWWW!!! :heart:");
        }
        else {
            sendMessage(message.channelID, "MEOOWWW!!!");
        }
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVvdy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1lb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN4QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUduRCxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUU7SUFDNUIsSUFBSSxFQUFFLE1BQU07SUFDWixPQUFPLEVBQUUsQ0FBQyxPQUFnQixFQUFFLEVBQUU7UUFDNUIsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUN0RSxXQUFXLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1NBQ3REO2FBQU07WUFDTCxXQUFXLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQztTQUM5QztJQUNILENBQUM7Q0FDRixDQUFDLENBQUMifQ==