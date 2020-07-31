import { botCache } from "../../mod.ts";
import { sendMessage } from "../../deps.ts";

botCache.commands.set("meow", {
  name: `meow`,
  execute: (message) => sendMessage(message.channel, "MEOWWW!!!"),
});
