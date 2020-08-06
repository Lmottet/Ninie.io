import { botCache } from "../../mod.ts";
import { Embed } from "../utils/Embed.ts";
import { sendEmbed, sendResponse } from "../utils/helpers.ts";
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
    execute: (message, args) => {
        let characterDetails = args.character.split("/");
        api(message, characterDetails[0], characterDetails[1]);
    },
});
async function api(message, realm, character) {
    try {
        const response = await fetch(`https://raider.io/api/v1/characters/profile?region=eu&realm=${realm}&name=${character}&fields=%20mythic_plus_scores_by_season%3Acurrent%2Cmythic_plus_ranks%2Craid_progression`);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        response.json()
            .then((rioData) => {
            sendEmbed(message.channel, embed(rioData), `<@!${message.author.id}>`);
        });
    }
    catch (err) {
        sendResponse(message, "Retrieval from raider.io failed. Check the syntax of your command ?");
    }
}
const embed = (rioData) => {
    let scores = rioData.mythic_plus_scores_by_season[0].scores;
    return new Embed()
        .addField("Nom :", rioData.name)
        .addField("Scores sur le serveur pour ta classe: ", `Overall : ${scores.all || 0} r.io
      Heal : ${scores.healer || 0} r.io
      Tank : ${scores.tank || 0} r.io
      DPS : ${scores.dps || 0} r.io`)
        .addField("Progression à Ny'alotha :", "" + rioData.raid_progression["nyalotha-the-waking-city"]?.summary)
        .addField("Rang sur le serveur toutes classes / spécialisations confondues :", "" + rioData.mythic_plus_ranks.overall.realm + " ème").addField("Rang sur le serveur pour ta classe, toutes spécialisations confondues :", "" + rioData.mythic_plus_ranks.class.realm + " ème");
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmlvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmlvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDeEMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFHOUQsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFO0lBQzNCLElBQUksRUFBRSxLQUFLO0lBQ1gsU0FBUyxFQUFFO1FBQ1Q7WUFDRSxJQUFJLEVBQUUsV0FBVztZQUNqQixJQUFJLEVBQUUsV0FBVztZQUNqQixPQUFPLEVBQUUsVUFBVSxPQUFPO2dCQUN4QixZQUFZLENBQUMsT0FBTyxFQUFFLDJCQUEyQixDQUFDLENBQUM7WUFDckQsQ0FBQztZQUNELFFBQVEsRUFBRSxJQUFJO1NBQ2Y7S0FDRjtJQUNELE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFhLEVBQUUsRUFBRTtRQUNsQyxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pELEdBQUcsQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6RCxDQUFDO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsS0FBSyxVQUFVLEdBQUcsQ0FBQyxPQUFnQixFQUFFLEtBQWEsRUFBRSxTQUFpQjtJQUNuRSxJQUFJO1FBQ0YsTUFBTSxRQUFRLEdBQUcsTUFBTSxLQUFLLENBQzFCLCtEQUErRCxLQUFLLFNBQVMsU0FBUywwRkFBMEYsQ0FDakwsQ0FBQztRQUVGLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFO1lBQ2hCLE1BQU0sSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3RDO1FBRUQsUUFBUSxDQUFDLElBQUksRUFBRTthQUNaLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ2hCLFNBQVMsQ0FDUCxPQUFPLENBQUMsT0FBTyxFQUNmLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFDZCxNQUFNLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFHLENBQzNCLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztLQUNOO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixZQUFZLENBQ1YsT0FBTyxFQUNQLHFFQUFxRSxDQUN0RSxDQUFDO0tBQ0g7QUFDSCxDQUFDO0FBS0QsTUFBTSxLQUFLLEdBQUcsQ0FBQyxPQUFxQixFQUFFLEVBQUU7SUFDdEMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUM1RCxPQUFPLElBQUksS0FBSyxFQUFFO1NBQ2YsUUFBUSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDO1NBQy9CLFFBQVEsQ0FDUCx3Q0FBd0MsRUFDeEMsYUFBYSxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUM7ZUFDbkIsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDO2VBQ2xCLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQztjQUNqQixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUMvQjtTQUNBLFFBQVEsQ0FDUCwyQkFBMkIsRUFDM0IsRUFBRSxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQywwQkFBMEIsQ0FBQyxFQUFFLE9BQU8sQ0FDbkU7U0FDQSxRQUFRLENBQ1AsbUVBQW1FLEVBQ25FLEVBQUUsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQ3RELENBQUMsUUFBUSxDQUNSLHlFQUF5RSxFQUN6RSxFQUFFLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUNwRCxDQUFDO0FBQ04sQ0FBQyxDQUFDIn0=