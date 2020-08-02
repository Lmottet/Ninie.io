import { Member, sendMessage } from "../../deps.ts";
import { botCache } from "../../mod.ts";
import { handleFeels } from "../services/feelsService.ts";
import { sendResponse } from "../utils/helpers.ts";
import { CommandArgument } from "../types/commands.ts";

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
    console.log(JSON.stringify(args.member));
    handleFeels(args.member.User.id, args.loveLevel);
  },
});


interface LoveArgs {
  member: Member;
  loveLevel: number;
}
