import { sendMessage } from "../../deps.ts";
import { botCache } from "../../mod.ts";
import { Message } from "../../deps.ts";

botCache.commands.set("gm", {
  name: `gm`,
  execute: (message: Message) => {
    sendMessage(message.channelID, "Make Vilaines Crêpes great again !");
  },
});
