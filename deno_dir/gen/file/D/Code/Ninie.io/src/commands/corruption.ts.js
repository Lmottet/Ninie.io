import { sendMessage } from "../../deps.ts";
import { botCache } from "../../mod.ts";
import { createCommandAliases } from "../utils/helpers.ts";
botCache.commands.set("corruption", {
    name: `corruption`,
    execute: (message) => {
        sendMessage(message.channel, "Il est recommandé de ne pas dépasser les 39 de corruptions à la légère - subir les dégâts des illusions dans un contenu difficile n'est pas acceptable.");
        sendMessage(message.channel, "Conseils de corruptions pour votre classe : https://docs.google.com/spreadsheets/u/1/d/e/2PACX-1vQPlWJC64XVWGyeTxgCi4LLoEm6NLwCnkiTF9JYGGyrBoMqtgE0bwBM54aXrZkIVEEN2OoavfT4Tc5E/pubhtml");
    },
});
createCommandAliases("corruption", ["corru", "corruptions"]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ycnVwdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvcnJ1cHRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRTNELFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRTtJQUNsQyxJQUFJLEVBQUUsWUFBWTtJQUNsQixPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUNuQixXQUFXLENBQ1QsT0FBTyxDQUFDLE9BQU8sRUFDZix5SkFBeUosQ0FDMUosQ0FBQztRQUNGLFdBQVcsQ0FDVCxPQUFPLENBQUMsT0FBTyxFQUNmLHlMQUF5TCxDQUMxTCxDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUMsQ0FBQztBQUVILG9CQUFvQixDQUFDLFlBQVksRUFBRSxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDIn0=