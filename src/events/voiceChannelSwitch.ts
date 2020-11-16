import { commandHandler } from "../monitors/commandHandler.ts";
import { botCache } from "../../mod.ts";
import { Message , Member} from "../../deps.ts";

botCache.eventHandlers.voiceChannelSwitch = function (member: Member, channelID: string, oldChannelID: string) {
    botCache.get("channels", channelID);
  console.log()

};

