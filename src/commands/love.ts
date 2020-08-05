import { Member } from "../../deps.ts";
import { botCache } from "../../mod.ts";
import { isUserAdmin } from "../authorizations.ts";
import { addLove, getLove } from "../services/feelsService.ts";
import { sendResponse } from "../utils/helpers.ts";
import { anyInsult } from "../utils/insults.ts";

botCache.commands.set("love", {
  name: `love`,
  description: "Send all the love",
  arguments: [
    {
      name: "member",
      type: "member",
      missing: function (message) {
        sendResponse(message, `User cannot be found.`);
      },
      // By default this is true but for the purpose of the guide so you can see this exists.
      required: true,
    },
    {
      name: "loveLevel",
      type: "number",
      missing: function (message) {
        sendResponse(message, `Should be a number`);
      },
      // By default this is true but for the purpose of the guide so you can see this exists.
      required: true,
    },
  ],
  execute: (message, args: LoveArgs) => {
    console.log("author : " + JSON.stringify(message));
    if (!isUserAdmin(message.author.username, message.author.discriminator)) {
      sendResponse(message, anyInsult());
    } else {
      console.log("args : " + JSON.stringify(args));
      let beforeLove = getLove(args.member.user.id);
      addLove(args.member.user.id, args.loveLevel);
      sendResponse(
        message,
        `Love was ${ beforeLove } and is now ${getLove(args.member.user.id)} for <@!${args.member.user.id}>`,
      );
    }
  },
});

interface LoveArgs {
  member: Member;
  loveLevel: number;
}
