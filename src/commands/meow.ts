import { botCache } from "../../mod.ts";
import { sendMessage } from "../../deps.ts";
import { isUserAdmin } from "../authorizations.ts";

botCache.commands.set("meow", {
  name: `meow`,
  execute: (message) => {
    if (isUserAdmin(message.author.username, message.author.discriminator)) {
      sendMessage(message.channel, "MEOOWWW!!! :heart:");
    } else {
      sendMessage(message.channel, "MEOOWWW!!!");
    }
  },
});
