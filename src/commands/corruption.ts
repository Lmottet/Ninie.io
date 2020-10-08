import { sendMessage } from "../../deps.ts";
import { botCache } from "../../mod.ts";
import { createCommandAliases } from "../utils/helpers.ts";
import {Message} from "../../deps.ts";

botCache.commands.set("corruption", {
  name: `corruption`,
  execute: (message: Message) => {
    sendMessage(
      message.channelID,
      "Il est recommandé de ne pas dépasser les 39 de corruptions à la légère - subir les dégâts des illusions dans un contenu difficile n'est pas acceptable.",
    );
    sendMessage(
      message.channelID,
      "Conseils de corruptions pour votre classe : https://docs.google.com/spreadsheets/u/1/d/e/2PACX-1vQPlWJC64XVWGyeTxgCi4LLoEm6NLwCnkiTF9JYGGyrBoMqtgE0bwBM54aXrZkIVEEN2OoavfT4Tc5E/pubhtml",
    );
  },
});

createCommandAliases("corruption", ["corru", "corruptions"]);
