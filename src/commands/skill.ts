import { axiod } from "../../deps.ts";
import { botCache } from "../../mod.ts";

botCache.commands.set("skill", {
  name: `skill`,
  execute: (message) => {
    getRaiderIo("Drek'Thar", "Olzimare");
  },
});

const getRaiderIo = (realm: string, name: string) => {
  return axiod
    .get("https://raider.io/api/v1/characters/profile", {
      params: {
        region: "EU",
        realm: realm,
        name: name,
        fields: "%20mythic_plus_scores_by_season%3Acurrent",
      },
    }).then((response: any) => console.log(response));
};
