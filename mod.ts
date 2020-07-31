import Client, {
  updateEventHandlers,
} from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/master/module/client.ts";
import { config } from "./config.ts";
import {
  Intents,
  EventHandlers,
} from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/master/types/options.ts";
import { Message } from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/master/structures/message.ts";
import { Command, Argument } from "./src/types/commands.ts";
import { Guild } from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/master/structures/guild.ts";

export const botCache = {
  commands: new Map<string, Command>(),
  commandAliases: new Map<string, string>(),
  guildPrefixes: new Map<string, string>(),
  inhibitors: new Map<
    string,
    (message: Message, command: Command, guild?: Guild) => Promise<boolean>
  >(),
  eventHandlers: {} as EventHandlers,
  arguments: new Map<string, Argument>(),
};

const importDirectory = async (path: string) => {
  const files = Deno.readDirSync(Deno.realPathSync(path));

  for (const file of files) {
    if (!file.name) continue;

    const currentPath = `${path}/${file.name}`;
    if (file.isFile) {
      await import(currentPath);
      continue;
    }

    importDirectory(currentPath);
  }
};

// Forces deno to read all the files which will fill the commands/inhibitors cache etc.
await Promise.all(
  ["./src/commands", "./src/inhibitors", "./src/events", "./src/arguments"].map(
    (path) => importDirectory(path)
  ),
);


const discord_client_id = Deno.env.get("DISCORD_CLIENT_ID");
const discord_token_id = Deno.env.get("DISCORD_BOT_TOKEN");

const intents = [
  Intents.GUILD_PRESENCES,
]

console.log("token id : " + discord_token_id);

Client({
  token: discord_token_id ? discord_token_id : "",
  // Pick the intents you wish to have for your bot.
  intents: [Intents.GUILDS, Intents.GUILD_MESSAGES],
  // These are all your event handler functions. Imported from the events folder
  eventHandlers: botCache.eventHandlers,
});
