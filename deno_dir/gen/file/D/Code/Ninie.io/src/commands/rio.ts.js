import { botCache } from "../../mod.ts";
import { Embed } from "../utils/Embed.ts";
import { sendEmbed, sendResponse } from "../utils/helpers.ts";
botCache.commands.set("rio", {
    name: `rio`,
    arguments: [
        {
            name: "realm",
            type: "string",
            required: true,
            missing: function (message) {
                sendResponse(message, `User cannot be found.`);
            },
        },
        {
            name: "character",
            type: "string",
            required: true,
            missing: function (message) {
                sendResponse(message, `Should be a number`);
            },
        },
    ],
    execute: (message, args) => {
        console.log("args :" + JSON.stringify(args));
        getRaiderIo(args.realm, args.character).then((rioData) => {
            console.log("status " + rioData.status);
            sendEmbed(message.channel, embed(rioData), `<@!${message.author.id}>`);
        });
    },
});
async function getRaiderIo(realm, name) {
    const url = `https://raider.io/api/v1/characters/profile?region=eu&realm=${realm}&name=${name}&fields=%20mythic_plus_scores_by_season%3Acurrent%2Cmythic_plus_ranks`;
    console.log(url);
    const res = await fetch(url).then((response) => response.json())
        .catch((error) => {
        console.error("Error:", error);
    });
    return await res;
}
const embed = (rioData) => {
    let scores = rioData.mythic_plus_scores_by_season[0].scores;
    return new Embed()
        .addField("Nom :", rioData.name)
        .addField("Scores sur le serveur pour ta classe", `Overall : ${scores.all} Heal : ${scores.heal} Tank : ${scores.tank} DPS : ${scores.dps}`)
        .addField("Rang sur le serveur toutes classes / spécialisations confondues", "" + rioData.mythic_plus_ranks.overall.realm).addField("Rang sur le serveur pour ta classe, toutes spécialisations confondues", "" + rioData.mythic_plus_ranks.class.realm);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmlvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmlvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDeEMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFOUQsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFO0lBQzNCLElBQUksRUFBRSxLQUFLO0lBQ1gsU0FBUyxFQUFFO1FBQ1Q7WUFDRSxJQUFJLEVBQUUsT0FBTztZQUNiLElBQUksRUFBRSxRQUFRO1lBQ2QsUUFBUSxFQUFDLElBQUk7WUFDYixPQUFPLEVBQUUsVUFBVSxPQUFPO2dCQUN4QixZQUFZLENBQUMsT0FBTyxFQUFFLHVCQUF1QixDQUFDLENBQUM7WUFDakQsQ0FBQztTQUNGO1FBQ0Q7WUFDRSxJQUFJLEVBQUUsV0FBVztZQUNqQixJQUFJLEVBQUUsUUFBUTtZQUNkLFFBQVEsRUFBQyxJQUFJO1lBQ2IsT0FBTyxFQUFFLFVBQVUsT0FBTztnQkFDeEIsWUFBWSxDQUFDLE9BQU8sRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1lBQzlDLENBQUM7U0FDRjtLQUNGO0lBQ0QsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLElBQWEsRUFBRSxFQUFFO1FBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUM3QyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDdkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hDLFNBQVMsQ0FDUCxPQUFPLENBQUMsT0FBTyxFQUNmLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFDZCxNQUFNLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFHLENBQzNCLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRixDQUFDLENBQUM7QUFPSCxLQUFLLFVBQVUsV0FBVyxDQUFDLEtBQWEsRUFBRSxJQUFZO0lBQ3BELE1BQU0sR0FBRyxHQUNQLCtEQUErRCxLQUFLLFNBQVMsSUFBSSx1RUFBdUUsQ0FBQztJQUMzSixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2pCLE1BQU0sR0FBRyxHQUFHLE1BQU0sS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQzdELEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQyxDQUFDLENBQUM7SUFDTCxPQUFPLE1BQU0sR0FBRyxDQUFDO0FBQ25CLENBQUM7QUFFRCxNQUFNLEtBQUssR0FBRyxDQUFDLE9BQXFCLEVBQUUsRUFBRTtJQUN0QyxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBQzVELE9BQU8sSUFBSSxLQUFLLEVBQUU7U0FDZixRQUFRLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUM7U0FDL0IsUUFBUSxDQUNQLHNDQUFzQyxFQUN0QyxhQUFhLE1BQU0sQ0FBQyxHQUFHLFdBQVcsTUFBTSxDQUFDLElBQUksV0FBVyxNQUFNLENBQUMsSUFBSSxVQUFVLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FDMUY7U0FDQSxRQUFRLENBQ1AsaUVBQWlFLEVBQ2pFLEVBQUUsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FDN0MsQ0FBQyxRQUFRLENBQ1IsdUVBQXVFLEVBQ3ZFLEVBQUUsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FDM0MsQ0FBQztBQUNOLENBQUMsQ0FBQyJ9