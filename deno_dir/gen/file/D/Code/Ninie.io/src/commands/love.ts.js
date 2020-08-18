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
        console.log("author : " + JSON.stringify(message));
        if (!isUserAdmin(message.author.username, message.author.discriminator)) {
            sendResponse(message, anyInsult());
        }
        else {
            console.log("args : " + JSON.stringify(args));
            let beforeLove = getLove(args.member.user.id);
            addLove(args.member.user.id, args.loveLevel);
            sendResponse(message, `Le Ninie.io de <@!${args.member.user.id}> est passé de ${beforeLove} à ${getLove(args.member.user.id)}`);
        }
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG92ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN4QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRWhELFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRTtJQUM1QixJQUFJLEVBQUUsTUFBTTtJQUNaLFdBQVcsRUFBRSxtQkFBbUI7SUFDaEMsU0FBUyxFQUFFO1FBQ1Q7WUFDRSxJQUFJLEVBQUUsUUFBUTtZQUNkLElBQUksRUFBRSxRQUFRO1lBQ2QsT0FBTyxFQUFFLFVBQVUsT0FBTztnQkFDeEIsWUFBWSxDQUFDLE9BQU8sRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO1lBQ25ELENBQUM7WUFFRCxRQUFRLEVBQUUsSUFBSTtTQUNmO1FBQ0Q7WUFDRSxJQUFJLEVBQUUsV0FBVztZQUNqQixJQUFJLEVBQUUsUUFBUTtZQUNkLE9BQU8sRUFBRSxVQUFVLE9BQU87Z0JBQ3hCLFlBQVksQ0FBQyxPQUFPLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztZQUM5QyxDQUFDO1lBRUQsUUFBUSxFQUFFLElBQUk7U0FDZjtLQUNGO0lBQ0QsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLElBQWMsRUFBRSxFQUFFO1FBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDdkUsWUFBWSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO1NBQ3BDO2FBQU07WUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDOUMsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzlDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzdDLFlBQVksQ0FDVixPQUFPLEVBQ1AscUJBQXFCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsa0JBQWtCLFVBQVUsTUFDbEUsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FDN0IsRUFBRSxDQUNILENBQUM7U0FDSDtJQUNILENBQUM7Q0FDRixDQUFDLENBQUMifQ==