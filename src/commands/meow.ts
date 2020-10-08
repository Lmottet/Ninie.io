import { botCache } from "../../mod.ts";
import { sendMessage } from "../../deps.ts";
import { isUserAdmin } from "../authorizations.ts";
import { Message } from "../../deps.ts";

botCache.commands.set("meow", {
  name: `meow`,
  execute: (message: Message) => {
    if (isUserAdmin(message.author.username, message.author.discriminator)) {
      sendMessage(message.channelID, "MEOOWWW!!! :heart:");
    } else {
      sendMessage(message.channelID, "MEOOWWW!!!");
    }
  },
});
