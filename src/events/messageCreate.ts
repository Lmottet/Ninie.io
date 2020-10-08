import { commandHandler } from "../monitors/commandHandler.ts";
import { botCache } from "../../mod.ts";
import { Message } from "../../deps.ts";

botCache.eventHandlers.messageCreate = function (message: Message) {
  commandHandler(message);
};
