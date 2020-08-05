import { botCache } from "../../mod.ts";
import { sendMessage } from "../../deps.ts";
import { isUserAdmin } from "../authorizations.ts";

botCache.commands.set("help", {
  name: `help`,
  execute: (message) => {
    sendMessage(message.channel, "Commands : help, avatar, gm, harem, hate (@user, number), love(@user, number), meow, office, slurp, bureau, score, rio (realm/name), sing");
    sendMessage(message.channel, "Et en bonus: la commande mystère !");
  },
});
