import { sendMessage } from "../../deps.ts";
import { botCache } from "../../mod.ts";
botCache.commands.set("help", {
    name: `help`,
    execute: (message) => {
        sendMessage(message.channel, "Random commands : avatar, gm, meow, sing");
        sendMessage(message.channel, ".io score-related commands : harem, hate (@user, number), love(@user, number), office, slurp, bureau, score");
        sendMessage(message.channel, "Commands : help, rio (realm/name),");
        sendMessage(message.channel, "Et en bonus: la commande mystère ! Bonne recherche :)");
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhlbHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXhDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRTtJQUM1QixJQUFJLEVBQUUsTUFBTTtJQUNaLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFO1FBQ25CLFdBQVcsQ0FDVCxPQUFPLENBQUMsT0FBTyxFQUNmLDBDQUEwQyxDQUMzQyxDQUFDO1FBQ0YsV0FBVyxDQUNULE9BQU8sQ0FBQyxPQUFPLEVBQ2YsNkdBQTZHLENBQzlHLENBQUM7UUFDRixXQUFXLENBQ1QsT0FBTyxDQUFDLE9BQU8sRUFDZixvQ0FBb0MsQ0FDckMsQ0FBQztRQUNGLFdBQVcsQ0FDVCxPQUFPLENBQUMsT0FBTyxFQUNmLHVEQUF1RCxDQUN4RCxDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUMsQ0FBQyJ9