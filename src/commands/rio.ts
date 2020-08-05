import { botCache } from "../../mod.ts";
import { Embed } from "../utils/Embed.ts";
import { sendEmbed, sendResponse } from "../utils/helpers.ts";

botCache.commands.set("rio", {
  name: `rio`,
  arguments: [
    {
      name: "realm",
      type: "...string",
      missing: function (message) {
        sendResponse(message, `Realm name is missing`);
      },
      required: true,
    },
    {
      name: "character",
      type: "string",
      missing: function (message) {
        sendResponse(message, `Character name is missing`);
      },
      required: true,
    },
  ],
  execute: (message, args: RioArgs) => {
    console.log("args :" + JSON.stringify(args));
    getRaiderIo(args.realm, args.character).then((rioData) => {
      console.log("status " + rioData.status);
      sendEmbed(
        message.channel,
        embed(rioData),
        `<@!${message.author.id}>`,
      );
    });
  },
});

interface RioArgs {
  realm: string;
  character: string;
}

async function getRaiderIo(realm: string, name: string) {
  const url =
    `https://raider.io/api/v1/characters/profile?region=eu&realm=${realm}&name=${name}&fields=%20mythic_plus_scores_by_season%3Acurrent%2Cmythic_plus_ranks`;
  console.log(url);
  const res = await fetch(url).then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
  return await res;
}

const embed = (rioData: RaiderIoData) => {
  let scores = rioData.mythic_plus_scores_by_season[0].scores;
  return new Embed()
    .addField("Nom :", rioData.name)
    .addField(
      "Scores sur le serveur pour ta classe",
      `Overall : ${scores.all} Heal : ${scores.heal} Tank : ${scores.tank} DPS : ${scores.dps}`,
    )
    .addField(
      "Rang sur le serveur toutes classes / spécialisations confondues",
      "" + rioData.mythic_plus_ranks.overall.realm,
    ).addField(
      "Rang sur le serveur pour ta classe, toutes spécialisations confondues",
      "" + rioData.mythic_plus_ranks.class.realm,
    );
};

interface Scores {
  all: number;
  dps: number;
  tank: number;
  heal: number;
}

interface SeasonalScores {
  season: string;
  scores: Scores;
}

interface Rank {
  world: number;
  region: number;
  realm: number;
}

interface Ranks {
  overall: Rank;
  class: Rank;
  faction_overall: Rank;
  faction_class: Rank;
  tank: Rank;
  class_tank: Rank;
  faction_tank: Rank;
  faction_class_tank: Rank;
  healer: Rank;
  class_healer: Rank;
  faction_healer: Rank;
  faction_class_healer: Rank;
  dps: Rank;
  class_dps: Rank;
  faction_dps: Rank;
  faction_class_dps: Rank;
}

interface RaiderIoData {
  name: string;
  mythic_plus_ranks: Ranks;
  mythic_plus_scores_by_season: SeasonalScores[];
}
