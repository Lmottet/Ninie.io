import { botCache } from "../../mod.ts";
import { isUserAdmin } from "../authorizations.ts";
import { getLove, removeLove } from "../services/feelsService.ts";
import { sendResponse } from "../utils/helpers.ts";
import { anyInsult } from "../utils/insults.ts";
botCache.commands.set("hate", {
    name: `hate`,
    description: "Drop all the hate",
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
            name: "hateLevel",
            type: "number",
            missing: function (message) {
                sendResponse(message, `Nombre non reconnu`);
            },
            required: true,
        },
    ],
    execute: (message, args) => {
        console.log("author : " + JSON.stringify(message));
        if (!isUserAdmin(message.author.username, message.author.discriminator)) {
            sendResponse(message, anyInsult());
        }
        else {
            let beforeHate = getLove(args.member.user.id);
            removeLove(args.member.user.id, args.hateLevel);
            sendResponse(message, `Aouch ! Le Ninie.io de <@!${args.member.user.id}> est passé de ${beforeHate} à : ${getLove(args.member.user.id)}`);
        }
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN4QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRWhELFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRTtJQUM1QixJQUFJLEVBQUUsTUFBTTtJQUNaLFdBQVcsRUFBRSxtQkFBbUI7SUFDaEMsU0FBUyxFQUFFO1FBQ1Q7WUFDRSxJQUFJLEVBQUUsUUFBUTtZQUNkLElBQUksRUFBRSxRQUFRO1lBQ2QsT0FBTyxFQUFFLFVBQVUsT0FBTztnQkFDeEIsWUFBWSxDQUFDLE9BQU8sRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO1lBQ25ELENBQUM7WUFFRCxRQUFRLEVBQUUsSUFBSTtTQUNmO1FBQ0Q7WUFDRSxJQUFJLEVBQUUsV0FBVztZQUNqQixJQUFJLEVBQUUsUUFBUTtZQUNkLE9BQU8sRUFBRSxVQUFVLE9BQU87Z0JBQ3hCLFlBQVksQ0FBQyxPQUFPLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztZQUM5QyxDQUFDO1lBRUQsUUFBUSxFQUFFLElBQUk7U0FDZjtLQUNGO0lBQ0QsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLElBQWMsRUFBRSxFQUFFO1FBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDdkUsWUFBWSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO1NBQ3BDO2FBQU07WUFDTCxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDOUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDaEQsWUFBWSxDQUNWLE9BQU8sRUFDUCw2QkFBNkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxrQkFBa0IsVUFBVSxRQUMxRSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUM3QixFQUFFLENBQ0gsQ0FBQztTQUNIO0lBQ0gsQ0FBQztDQUNGLENBQUMsQ0FBQyJ9