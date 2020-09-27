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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVvdy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1lb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN4QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVuRCxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUU7SUFDNUIsSUFBSSxFQUFFLE1BQU07SUFDWixPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUNuQixJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQ3RFLFdBQVcsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLG9CQUFvQixDQUFDLENBQUM7U0FDdEQ7YUFBTTtZQUNMLFdBQVcsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDO1NBQzlDO0lBQ0gsQ0FBQztDQUNGLENBQUMsQ0FBQyJ9