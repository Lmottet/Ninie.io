import { Member } from "../../deps.ts";
import { botCache } from "../../mod.ts";
import { isUserAdmin } from "../authorizations.ts";
import { getLove, removeLove } from "../services/feelsService.ts";
import { sendResponse } from "../utils/helpers.ts";
import { anyInsult } from "../utils/insults.ts";

botCache.commands.set("hate", {
  name: `hate`,
  description: "Drop all the hate",
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
      name: "hateLevel",
      type: "number",
      missing: function (message) {
        sendResponse(message, `Should be a number`);
      },
      // By default this is true but for the purpose of the guide so you can see this exists.
      required: true,
    },
  ],
  execute: (message, args: HateArgs) => {
    console.log("author : " + JSON.stringify(message));
    if (isUserAdmin(message.author.username, message.author.discriminator)) {
      sendResponse(message, anyInsult());
    } else {
      console.log("args : " + JSON.stringify(args));
      let beforeHate = getLove(args.member.user.id);
      removeLove(args.member.user.id, args.hateLevel);
      sendResponse(
        message,
        "Aouch ! Love was " + beforeHate + " and is now down to : " +
          getLove(args.member.user.id),
      );
    }
  },
});

interface HateArgs {
  member: Member;
  hateLevel: number;
}
