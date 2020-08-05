import { botCache } from "../../mod.ts";

botCache.commands.set("skill", {
  name: `skill`,
  execute: (message) => {
    getRaiderIo("Drek'Thar", "Olzimare");
  },
});

async function getRaiderIo(realm: string, name: string) {
  const res = await fetch(
    `https://raider.io/api/v1/characters/profile?region=eu&realm=${realm}&name=${name}&fields=%20mythic_plus_scores_by_season%3Acurrent`,
  );
  const data = await res.json();
  console.log(data);
}
