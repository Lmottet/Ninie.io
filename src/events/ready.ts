import { botCache } from "../../mod.ts";
import { cache } from "../../deps.ts"

botCache.eventHandlers.ready = function () {
  console.log(
    `[READY] Bot is online and ready in ${cache.guilds.size} guild(s)!`,
  );
};
