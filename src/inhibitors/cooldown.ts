import { botCache } from "../../mod.ts";
import { sendResponse, humanizeMilliseconds } from "../utils/helpers.ts";
import { Message, Guild } from "../../deps.ts";
import { Command } from "../types/commands.ts"

const membersInCooldown = new Map<string, Cooldown>();

export interface Cooldown {
  used: number;
  timestamp: number;
}

botCache.inhibitors.set("cooldown", async function (message: Message, command: Command, guild: Guild) {
  if (!command.cooldown) return false;

  const key = `${message.author.id}-${command.name}`;
  const cooldown = membersInCooldown.get(key);
  if (cooldown) {
    if (cooldown.used + 1 >= (command.cooldown.allowedUses || 1)) {
      const now = Date.now();
      if (cooldown.timestamp > now) {
        sendResponse(
          message,
          `Vous devez attendre **${humanizeMilliseconds(
            now - cooldown.timestamp
          )}** avant d'utiliser cette commande à nouveau.`
        );
        return true;
      }
    }

    membersInCooldown.set(key, {
      used: cooldown.used + 1,
      timestamp: cooldown.timestamp,
    });
    return false;
  }

  membersInCooldown.set(key, {
    used: 1,
    timestamp: Date.now() + command.cooldown.seconds * 1000,
  });
  return false;
});

setInterval(() => {
  const now = Date.now();

  membersInCooldown.forEach((cooldown, key) => {
    if (cooldown.timestamp > now) return;
    membersInCooldown.delete(key);
  });
}, 30000);
