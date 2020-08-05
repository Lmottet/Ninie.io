import { botCache } from "../../mod.ts";
import { Embed } from "../utils/Embed.ts";
import { sendEmbed, sendResponse } from "../utils/helpers.ts";
import { Message } from "../../deps.ts";

botCache.commands.set("rio", {
  name: `rio`,
  arguments: [
    {
      name: "character",
      type: "...string",
      missing: function (message) {
        sendResponse(message, `Character name is missing`);
      },
      required: true,
    },
  ],
  execute: (message, args: RioArgs) => {
    let characterDetails = args.character.split("/");
    api(message, characterDetails[0], characterDetails[1]);
  },
});

async function api(message: Message, realm: string, character: string) {
  try {
    const response = await fetch(
      `https://raider.io/api/v1/characters/profile?region=eu&realm=${realm}&name=${character}&fields=%20mythic_plus_scores_by_season%3Acurrent%2Cmythic_plus_ranks%2Craid_progression`,
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    
    response.json()
      .then((rioData) => {
        sendEmbed(
          message.channel,
          embed(rioData),
          `<@!${message.author.id}>`,
        );
      });
  } catch (err) {
    sendResponse(
      message,
      "Retrieval from raider.io failed. Check the syntax of your command ?",
    );
  }
}

interface RioArgs {
  character: string;
}
const embed = (rioData: RaiderIoData) => {
  let scores = rioData.mythic_plus_scores_by_season[0].scores;
  return new Embed()
    .addField("Nom :", rioData.name)
    .addField(
      "Scores sur le serveur pour ta classe: ",
      `Overall : ${scores.all || 0} r.io
      Heal : ${scores.healer || 0} r.io
      Tank : ${scores.tank || 0} r.io
      DPS : ${scores.dps || 0} r.io`,
    )
    .addField(
      "Progression à Ny'alotha :",
      "" + rioData.raid_progression["nyalotha-the-waking-city"]?.summary,
    )
    .addField(
      "Rang sur le serveur toutes classes / spécialisations confondues :",
      "" + rioData.mythic_plus_ranks.overall.realm + " ème",
    ).addField(
      "Rang sur le serveur pour ta classe, toutes spécialisations confondues :",
      "" + rioData.mythic_plus_ranks.class.realm + " ème",
    );
};

interface Scores {
  all: number;
  dps: number;
  tank: number;
  healer: number;
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

interface Raid {
  summary: string;
}

interface Progression {
  "nyalotha-the-waking-city": Raid;
}

interface RaiderIoData {
  name: string;
  mythic_plus_ranks: Ranks;
  mythic_plus_scores_by_season: SeasonalScores[];
  raid_progression: Progression;
}
