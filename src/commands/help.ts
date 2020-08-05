import { sendMessage } from "../../deps.ts";
import { botCache } from "../../mod.ts";

botCache.commands.set("help", {
  name: `help`,
  execute: (message) => {
    sendMessage(
      message.channel,
      "Random commands : avatar, gm, meow, sing",
    );
    sendMessage(
      message.channel,
      ".io score-related commands : harem, hate (@user, number), love(@user, number), office, slurp, bureau, score",
    );
    sendMessage(
      message.channel,
      "Commands : help, rio (realm/name),",
    );
    sendMessage(
      message.channel,
      "Et en bonus: la commande mystère ! Bonne recherche :)",
    );
  },
});
