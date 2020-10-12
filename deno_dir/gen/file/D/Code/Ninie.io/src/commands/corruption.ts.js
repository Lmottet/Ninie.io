import { sendMessage } from "../../deps.ts";
import { botCache } from "../../mod.ts";
import { createCommandAliases } from "../utils/helpers.ts";
botCache.commands.set("corruption", {
    name: `corruption`,
    execute: (message) => {
        sendMessage(message.channelID, "Il est recommandé de ne pas dépasser les 39 de corruptions à la légère - subir les dégâts des illusions dans un contenu difficile n'est pas acceptable.");
        sendMessage(message.channelID, "Conseils de corruptions pour votre classe : https://docs.google.com/spreadsheets/u/1/d/e/2PACX-1vQPlWJC64XVWGyeTxgCi4LLoEm6NLwCnkiTF9JYGGyrBoMqtgE0bwBM54aXrZkIVEEN2OoavfT4Tc5E/pubhtml");
    },
});
createCommandAliases("corruption", ["corru", "corruptions"]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ycnVwdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvcnJ1cHRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRzNELFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRTtJQUNsQyxJQUFJLEVBQUUsWUFBWTtJQUNsQixPQUFPLEVBQUUsQ0FBQyxPQUFnQixFQUFFLEVBQUU7UUFDNUIsV0FBVyxDQUNULE9BQU8sQ0FBQyxTQUFTLEVBQ2pCLHlKQUF5SixDQUMxSixDQUFDO1FBQ0YsV0FBVyxDQUNULE9BQU8sQ0FBQyxTQUFTLEVBQ2pCLHlMQUF5TCxDQUMxTCxDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUMsQ0FBQztBQUVILG9CQUFvQixDQUFDLFlBQVksRUFBRSxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDIn0=