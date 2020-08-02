import { Member, sendMessage } from "../../deps.ts";
import { botCache } from "../../mod.ts";
import { addLove, getLove } from "../services/feelsService.ts";
import { sendResponse } from "../utils/helpers.ts";
import { CommandArgument } from "../types/commands.ts";
import { isAdmin } from "../authorizations.ts";

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
    if (isAdmin(args.member.tag)) {
      sendResponse(message, anyInsult());
    } else {
      console.log("args : " + JSON.stringify(args));
      addLove(args.member.user.id, args.loveLevel);
      sendResponse(
        message,
        "Love is now " + getLove(args.member.user.id),
      );
    }
  },
});

const insults = [
  "Du vent margoulin !",
  "Hérétique, au bucher !",
  "Ha ! Bien tenté, moule à gauffre",
  "*Sniffs* Eh ! Tu sens pas la ninie toi, ouste !",
];

const anyInsult = () => {
  return insults[Math.floor(Math.random() * insults.length)];
};

interface LoveArgs {
  member: Member;
  loveLevel: number;
}
