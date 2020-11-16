import { commandHandler } from "../monitors/commandHandler.ts";
import Member from "../../deps.ts";
import get from "../../deps.ts";
import { botCache } from '../../mod.ts'

botCache.eventHandlers.voiceChannelSwitch = function (member: Member, channelID: string, oldChannelID: string) {
    get("guilds",42)
  console.log()

};

