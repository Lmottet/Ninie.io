import { botCache } from "../../mod.ts";
import { sendMessage } from "../../deps.ts";
botCache.commands.set("sing", {
    name: `sing`,
    execute: (message) => {
        sendMessage(message.channel, "Tout le monde veut devenir un Cat :musical_note:");
        sendMessage(message.channel, "Parce qu'un chat - quand il est Cat :musical_note:");
        sendMessage(message.channel, "Retooooombe sur ses pattes :musical_note:");
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2luZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN4QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTVDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRTtJQUM1QixJQUFJLEVBQUUsTUFBTTtJQUNaLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFO1FBQ25CLFdBQVcsQ0FDVCxPQUFPLENBQUMsT0FBTyxFQUNmLGtEQUFrRCxDQUNuRCxDQUFDO1FBQ0YsV0FBVyxDQUNULE9BQU8sQ0FBQyxPQUFPLEVBQ2Ysb0RBQW9ELENBQ3JELENBQUM7UUFDRixXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSwyQ0FBMkMsQ0FBQyxDQUFDO0lBQzVFLENBQUM7Q0FDRixDQUFDLENBQUMifQ==