import { sendMessage } from "../../deps.ts";
import { botCache } from "../../mod.ts";

botCache.commands.set("gm", {
  name: `gm`,
  execute: (message) => {
    sendMessage(message.channelID, "Make Vilaines Crêpes great again !");
  },
});
