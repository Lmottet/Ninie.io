import { botCache } from "../../mod.ts";
import { getLove } from "../services/feelsService.ts";
import { sendResponse } from "../utils/helpers.ts";
botCache.commands.set("score", {
    name: `score`,
    description: "Displays your Ninie.io",
    execute: (message) => sendResponse(message, "Ninie.io score : " +
        getLove(message.author.id)),
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzY29yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFbkQsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFO0lBQzdCLElBQUksRUFBRSxPQUFPO0lBQ2IsV0FBVyxFQUFFLHdCQUF3QjtJQUNyQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUNuQixZQUFZLENBQ1YsT0FBTyxFQUNQLG1CQUFtQjtRQUNqQixPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FDN0I7Q0FDSixDQUFDLENBQUMifQ==