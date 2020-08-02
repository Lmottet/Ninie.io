import { Member } from "../../deps.ts";
import { botCache } from "../../mod.ts";
import { removeLove } from "../services/feelsService.ts";
import { sendResponse } from "../utils/helpers.ts";

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
  },
});

interface HateArgs {
  member: Member;
  hateLevel: number;
}
