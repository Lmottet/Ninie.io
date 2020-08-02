import { Member } from "../../deps.ts";
import { botCache } from "../../mod.ts";
import { removeLove, getLove } from "../services/feelsService.ts";
import { sendResponse } from "../utils/helpers.ts";
import { isAdmin } from "../authorizations.ts";
import { anyInsult } from "../utils/insults.ts";

botCache.commands.set("hate", {
  name: `hate;`,
  description: "Drop all the hate;",
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
    removeLove(args.member.user.id, args.hateLevel);
    if (isAdmin(args.member.tag)) {
      sendResponse(message, anyInsult());
    } else {
      console.log("args : " + JSON.stringify(args));
      removeLove(args.member.user.id, args.hateLevel);
      sendResponse(
        message,
        "Aouch ! Love is now down to : " + getLove(args.member.user.id),
      );
    }
  },
});

interface HateArgs {
  member: Member;
  hateLevel: number;
}
