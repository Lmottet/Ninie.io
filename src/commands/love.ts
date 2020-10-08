import { Member } from "../../deps.ts";
import { botCache } from "../../mod.ts";
import { isUserAdmin } from "../authorizations.ts";
import { addLove, getLove } from "../services/feelsService.ts";
import { sendResponse } from "../utils/helpers.ts";
import { anyInsult } from "../utils/insults.ts";
import { Message } from "../../deps.ts";

botCache.commands.set("love", {
  name: `love`,
  description: "Send all the love",
  arguments: [
    {
      name: "member",
      type: "member",
      missing: function (message: Message) {
        sendResponse(message, `Utilisateur non reconnu`);
      },
      // By default this is true but for the purpose of the guide so you can see this exists.
      required: true,
    },
    {
      name: "loveLevel",
      type: "number",
      missing: function (message: Message) {
        sendResponse(message, `Nombre non reconnu`);
      },
      // By default this is true but for the purpose of the guide so you can see this exists.
      required: true,
    },
  ],
  execute: (message: Message, args: LoveArgs) => {
    if (!isUserAdmin(message.author.username, message.author.discriminator)) {
      sendResponse(message, anyInsult());
    } else {
      let beforeLove = getLove(args.member.user.id);
      addLove(args.member.user.id, args.loveLevel);
      sendResponse(
        message,
        `Le Ninie.io de <@!${args.member.user.id}> est passé de ${beforeLove} à ${
          getLove(args.member.user.id)
        }`,
      );
    }
  },
});

interface LoveArgs {
  member: Member;
  loveLevel: number;
}
