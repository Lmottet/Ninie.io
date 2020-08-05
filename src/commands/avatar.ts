// This command is intentionally different from other commands to show that they can also be done this way.
// This is the ideal way because it will give you automated typings.
import { avatarURL, sendMessage } from "../../deps.ts";
import { botCache } from "../../mod.ts";

botCache.commands.set(`avatar`, {
  name: `avatar`,
  guildOnly: true,
  execute: (message, _args) => {
    const member = message.mentions.length
      ? message.mentions()[0]
      : message.member()!;

    return sendMessage(message.channel, {
      embed: {
        author: {
          name: member.tag,
          icon_url: avatarURL(member),
        },
        image: {
          url: avatarURL(member, 2048),
        },
      },
    });
  },
});
