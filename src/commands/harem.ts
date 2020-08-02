import { Member, sendMessage } from "../../deps.ts";
import { botCache } from "../../mod.ts";
import { getHarem } from "../services/feelsService.ts";
import { sendResponse } from "../utils/helpers.ts";
import { CommandArgument } from "../types/commands.ts";
import { isAdmin } from "../authorizations.ts";
import { anyInsult } from "../utils/insults.ts";

botCache.commands.set("harem", {
  name: `harem`,
  description: "Show the loveliest",
  
  execute: (message) => {
    console.log("test harem")
    getHarem();
      sendResponse(
        message,
        "Love is now ",
      );
  },
});
