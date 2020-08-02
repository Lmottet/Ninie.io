import { Member, sendMessage } from "../../deps.ts";
import { botCache } from "../../mod.ts";
import { sendResponse } from "../utils/helpers.ts";

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
    }
  ],
    execute: (message, args: LoveArgs) => {
        console.log(JSON.stringify(args.member))
        //addPoints()
        sendMessage(message.channel, "MEOWWW!!!")
    },
});

interface LoveArgs {
  member: Member;
}