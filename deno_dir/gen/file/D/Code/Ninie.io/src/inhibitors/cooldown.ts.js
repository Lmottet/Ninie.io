import { botCache } from "../../mod.ts";
import { sendResponse, humanizeMilliseconds } from "../utils/helpers.ts";
const membersInCooldown = new Map();
botCache.inhibitors.set("cooldown", async function (message, command, guild) {
    if (!command.cooldown)
        return false;
    const key = `${message.author.id}-${command.name}`;
    const cooldown = membersInCooldown.get(key);
    if (cooldown) {
        if (cooldown.used + 1 >= (command.cooldown.allowedUses || 1)) {
            const now = Date.now();
            if (cooldown.timestamp > now) {
                sendResponse(message, `Vous devez attendre **${humanizeMilliseconds(now - cooldown.timestamp)}** avant d'utiliser cette commande à nouveau.`);
                return true;
            }
        }
        membersInCooldown.set(key, {
            used: cooldown.used + 1,
            timestamp: cooldown.timestamp,
        });
        return false;
    }
    membersInCooldown.set(key, {
        used: 1,
        timestamp: Date.now() + command.cooldown.seconds * 1000,
    });
    return false;
});
setInterval(() => {
    const now = Date.now();
    membersInCooldown.forEach((cooldown, key) => {
        if (cooldown.timestamp > now)
            return;
        membersInCooldown.delete(key);
    });
}, 30000);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29vbGRvd24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb29sZG93bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUl6RSxNQUFNLGlCQUFpQixHQUFHLElBQUksR0FBRyxFQUFvQixDQUFDO0FBT3RELFFBQVEsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxLQUFLLFdBQVcsT0FBZ0IsRUFBRSxPQUFnQixFQUFFLEtBQXdCO0lBQzlHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUTtRQUFFLE9BQU8sS0FBSyxDQUFDO0lBRXBDLE1BQU0sR0FBRyxHQUFHLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ25ELE1BQU0sUUFBUSxHQUFHLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM1QyxJQUFJLFFBQVEsRUFBRTtRQUNaLElBQUksUUFBUSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsRUFBRTtZQUM1RCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDdkIsSUFBSSxRQUFRLENBQUMsU0FBUyxHQUFHLEdBQUcsRUFBRTtnQkFDNUIsWUFBWSxDQUNWLE9BQU8sRUFDUCx5QkFBeUIsb0JBQW9CLENBQzNDLEdBQUcsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUN6QiwrQ0FBK0MsQ0FDakQsQ0FBQztnQkFDRixPQUFPLElBQUksQ0FBQzthQUNiO1NBQ0Y7UUFFRCxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFO1lBQ3pCLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSSxHQUFHLENBQUM7WUFDdkIsU0FBUyxFQUFFLFFBQVEsQ0FBQyxTQUFTO1NBQzlCLENBQUMsQ0FBQztRQUNILE9BQU8sS0FBSyxDQUFDO0tBQ2Q7SUFFRCxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFO1FBQ3pCLElBQUksRUFBRSxDQUFDO1FBQ1AsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxJQUFJO0tBQ3hELENBQUMsQ0FBQztJQUNILE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQyxDQUFDLENBQUM7QUFFSCxXQUFXLENBQUMsR0FBRyxFQUFFO0lBQ2YsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBRXZCLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUMxQyxJQUFJLFFBQVEsQ0FBQyxTQUFTLEdBQUcsR0FBRztZQUFFLE9BQU87UUFDckMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDIn0=