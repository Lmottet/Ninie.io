import { botCache } from "../../mod.ts";
import { getLove } from "../services/feelsService.ts";
import { sendResponse } from "../utils/helpers.ts";
import { userTag } from "../utils/users.ts";

botCache.commands.set("score", {
  name: `score;`,
  description: "Displays your Ninie.io",
  execute: (message) =>
    sendResponse(
      message,
      "Your Ninie.io score is : " +
        getLove(userTag(message.author.username, message.author.discriminator)),
    ),
});
