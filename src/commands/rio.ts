import { botCache } from "../../mod.ts";
import { Embed } from "../utils/Embed.ts";
import { sendEmbed, sendResponse } from "../utils/helpers.ts";

botCache.commands.set("rio", {
  name: `rio`,
  arguments: [
    {
      name: "realm",
      type: "string",
      missing: function (message) {
        sendResponse(message, `User cannot be found.`);
      },
    },
    {
      name: "character",
      type: "string",
      missing: function (message) {
        sendResponse(message, `Should be a number`);
      },
    },
  ],
  execute: (message, args: RioArgs) => {
    getRaiderIo(args.realm, args.character).then((rioData) => {
      console.log(rioData);
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
  const res = await fetch(
    `https://raider.io/api/v1/characters/profile?region=eu&realm=${realm}&name=${name}&fields=%20mythic_plus_scores_by_season%3Acurrent%2Cmythic_plus_ranks`,
  );
  return await res.json();
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
      rioData.mythic_plus_ranks.get("overall")?.get("realm") || "rank",
    ).addField(
      "Rang sur le serveur pour ta classe, toutes spécialisations confondues",
      rioData.mythic_plus_ranks.get("class")?.get("realm") || "rank",
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

interface RaiderIoData {
  name: string;
  mythic_plus_ranks: Map<string, Map<string, string>>;
  mythic_plus_scores_by_season: SeasonalScores[];
}
