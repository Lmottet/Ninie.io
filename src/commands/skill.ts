import { axiod } from "../../deps.ts";

import { botCache } from "../../mod.ts";
import { sendMessage } from "../../deps.ts";
import { isUserAdmin } from "../authorizations.ts";

botCache.commands.set("skill", {
  name: `skill`,
  execute: (message) => {
    getRaiderIo("Drek'Thar", "Olzimare");
  },
});
const instance = axiod.create({
  baseURL: "https://raider.io/api/v1/characters",
  timeout: 1000,
});

const getRaiderIo = (realm: string, name: string) => {
  return axiod
    .get("/profile", {
      params: {
        region: "EU",
        realm: realm,
        name: name,
        fields: "%20mythic_plus_scores_by_season%3Acurrent",
      },
    }).then((response) => console.log(response));
};

instance.get();
