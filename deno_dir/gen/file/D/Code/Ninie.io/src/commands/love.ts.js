import { botCache } from "../../mod.ts";
import { isUserAdmin } from "../authorizations.ts";
import { addLove, getLove } from "../services/feelsService.ts";
import { sendResponse } from "../utils/helpers.ts";
import { anyInsult } from "../utils/insults.ts";
botCache.commands.set("love", {
    name: `love`,
    description: "Send all the love",
    arguments: [
        {
            name: "member",
            type: "member",
            missing: function (message) {
                sendResponse(message, `Utilisateur non reconnu`);
            },
            required: true,
        },
        {
            name: "loveLevel",
            type: "number",
            missing: function (message) {
                sendResponse(message, `Nombre non reconnu`);
            },
            required: true,
        },
    ],
    execute: (message, args) => {
        if (!isUserAdmin(message.author.username, message.author.discriminator)) {
            sendResponse(message, anyInsult());
        }
        else {
            let beforeLove = getLove(args.member.user.id);
            addLove(args.member.user.id, args.loveLevel);
            sendResponse(message, `Le Ninie.io de <@!${args.member.user.id}> est passé de ${beforeLove} à ${getLove(args.member.user.id)}`);
        }
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG92ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN4QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBR2hELFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRTtJQUM1QixJQUFJLEVBQUUsTUFBTTtJQUNaLFdBQVcsRUFBRSxtQkFBbUI7SUFDaEMsU0FBUyxFQUFFO1FBQ1Q7WUFDRSxJQUFJLEVBQUUsUUFBUTtZQUNkLElBQUksRUFBRSxRQUFRO1lBQ2QsT0FBTyxFQUFFLFVBQVUsT0FBZ0I7Z0JBQ2pDLFlBQVksQ0FBQyxPQUFPLEVBQUUseUJBQXlCLENBQUMsQ0FBQztZQUNuRCxDQUFDO1lBRUQsUUFBUSxFQUFFLElBQUk7U0FDZjtRQUNEO1lBQ0UsSUFBSSxFQUFFLFdBQVc7WUFDakIsSUFBSSxFQUFFLFFBQVE7WUFDZCxPQUFPLEVBQUUsVUFBVSxPQUFnQjtnQkFDakMsWUFBWSxDQUFDLE9BQU8sRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1lBQzlDLENBQUM7WUFFRCxRQUFRLEVBQUUsSUFBSTtTQUNmO0tBQ0Y7SUFDRCxPQUFPLEVBQUUsQ0FBQyxPQUFnQixFQUFFLElBQWMsRUFBRSxFQUFFO1FBQzVDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUN2RSxZQUFZLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7U0FDcEM7YUFBTTtZQUNMLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM5QyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM3QyxZQUFZLENBQ1YsT0FBTyxFQUNQLHFCQUFxQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLGtCQUFrQixVQUFVLE1BQ2xFLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQzdCLEVBQUUsQ0FDSCxDQUFDO1NBQ0g7SUFDSCxDQUFDO0NBQ0YsQ0FBQyxDQUFDIn0=