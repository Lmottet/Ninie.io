import { botCache } from "../../mod.ts";
import { getLove } from "../services/feelsService.ts";
import { sendResponse } from "../utils/helpers.ts";
import { Message } from "../../deps.ts";

botCache.commands.set("score", {
  name: `score`,
  description: "Displays your Ninie.io",
  execute: (message : Message) =>
    sendResponse(
      message,
      "Ninie.io score : " +
        getLove(message.author.id),
    ),
});
