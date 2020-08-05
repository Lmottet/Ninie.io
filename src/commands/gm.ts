import { botCache } from "../../mod.ts";
import { sendMessage } from "../../deps.ts";
import { isUserAdmin } from "../authorizations.ts";

botCache.commands.set("gm", {
  name: `gm`,
  execute: (message) => {
    sendMessage(message.channel, "Make Vilaines Crêpes great again !");
  },
});
