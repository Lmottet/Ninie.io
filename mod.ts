import {
  Client,
  EventHandlers,
  Guild,
  Intents,
  Message,
  serve,
} from "./deps.ts";
import { Argument, Command } from "./src/types/commands.ts";
import { Repository } from "./src/repository.ts";

declare global {
  var Repository: Repository;
  interface Window {
    Repository: any;
  }
}

window.Repository = new Repository();

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
  [
    "./src/commands",
    "./src/inhibitors",
    "./src/events",
    "./src/arguments",
  ].map((path) => importDirectory(path)),
);

/*
const wakeUpDyno = (url: string, interval = 25) => {
  const milliseconds = interval * 60000;
  setTimeout(() => {
    setTimeout(() => {
      try {
        // HTTP GET request to the dyno's url
        fetch(url).then(() => console.log(`Fetching ${url}.`));
      } catch (err) { // catch fetch errors
        console.log(
          `Error fetching ${url}: ${err.message} Will try again in ${interval} minutes...`,
        );
      }
    }, 1);
  }, milliseconds);
};*/

const readPort = () => {
  let port = Deno.env.get("PORT");
  return port ? Number.parseInt(port) : 8000;
};

const port = readPort();
const discord_token_id = Deno.env.get("DISCORD_BOT_TOKEN");
//Deno.env.get("DISCORD_BOT_TOKEN");

const intents = [
  Intents.GUILD_PRESENCES,
  Intents.GUILD_MESSAGES,
  Intents.GUILDS,
];

Client({
  token: discord_token_id ? discord_token_id : "",
  // Pick the intents you wish to have for your bot.
  intents: intents,
  // These are all your event handler functions. Imported from the events folder
  eventHandlers: botCache.eventHandlers,
});

//wakeUpDyno("https://ninie-io.herokuapp.com/");

const body = new TextEncoder().encode("Hello World\n");
const s = serve({ port: port });
for await (const req of s) req.respond({ body });
