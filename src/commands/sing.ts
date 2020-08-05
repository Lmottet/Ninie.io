import { botCache } from "../../mod.ts";
import { sendMessage } from "../../deps.ts";

botCache.commands.set("sing", {
  name: `sing`,
  execute: (message) => {
    sendMessage(
      message.channel,
      "Tout le monde veut devenir un Cat :musical_note:",
    );
    sendMessage(
      message.channel,
      "Parce qu'un chat - quand il est Cat :musical_note:",
    );
    sendMessage(message.channel, "Retooooombe sur ses pattes :musical_note:");
  },
});
