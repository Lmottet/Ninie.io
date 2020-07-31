import { botCache } from "../../mod.ts"
import { sendMessage } from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/master/handlers/channel.ts"

botCache.commands.set("meow", {
  name: `meow`,
  execute: (message) => sendMessage(message.channel, "MEOWWW!!!"),
})
