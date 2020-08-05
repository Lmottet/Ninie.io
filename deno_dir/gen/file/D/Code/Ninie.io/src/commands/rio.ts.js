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
        console.log("args :" + JSON.stringify(args));
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
        response.json().then((rioData) => {
            sendEmbed(message.channel, embed(rioData), `<@!${message.author.id}>`);
        });
    }
    catch (err) {
        sendResponse(message, JSON.stringify(err));
    }
}
const embed = (rioData) => {
    let scores = rioData.mythic_plus_scores_by_season[0].scores;
    return new Embed()
        .addField("Nom :", rioData.name)
        .addField("Scores sur le serveur pour ta classe: ", `Overall : ${scores.all || 0}
      Heal : ${scores.healer || 0}
        Tank : ${scores.tank || 0}
        DPS : ${scores.dps || 0}`)
        .addField("Progression à Ny'alotha :", "" + rioData.raid_progression["nyalotha-the-waking-city"]?.summary)
        .addField("Rang sur le serveur toutes classes / spécialisations confondues :", "" + rioData.mythic_plus_ranks.overall.realm).addField("Rang sur le serveur pour ta classe, toutes spécialisations confondues :", "" + rioData.mythic_plus_ranks.class.realm);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmlvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmlvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDeEMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFHOUQsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFO0lBQzNCLElBQUksRUFBRSxLQUFLO0lBQ1gsU0FBUyxFQUFFO1FBQ1Q7WUFDRSxJQUFJLEVBQUUsV0FBVztZQUNqQixJQUFJLEVBQUUsV0FBVztZQUNqQixPQUFPLEVBQUUsVUFBVSxPQUFPO2dCQUN4QixZQUFZLENBQUMsT0FBTyxFQUFFLDJCQUEyQixDQUFDLENBQUM7WUFDckQsQ0FBQztZQUNELFFBQVEsRUFBRSxJQUFJO1NBQ2Y7S0FDRjtJQUNELE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFhLEVBQUUsRUFBRTtRQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDN0MsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqRCxHQUFHLENBQUMsT0FBTyxFQUFFLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxFQUFFLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekQsQ0FBQztDQUNGLENBQUMsQ0FBQztBQUVILEtBQUssVUFBVSxHQUFHLENBQUMsT0FBZ0IsRUFBRSxLQUFhLEVBQUUsU0FBaUI7SUFDbkUsSUFBSTtRQUNGLE1BQU0sUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUMxQiwrREFBK0QsS0FBSyxTQUFTLFNBQVMsMEZBQTBGLENBQ2pMLENBQUM7UUFFRixJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRTtZQUNoQixNQUFNLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUN0QztRQUNELFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQ2xCLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDVixTQUFTLENBQ1AsT0FBTyxDQUFDLE9BQU8sRUFDZixLQUFLLENBQUMsT0FBTyxDQUFDLEVBQ2QsTUFBTSxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsR0FBRyxDQUMzQixDQUFDO1FBQ0osQ0FBQyxDQUNGLENBQUM7S0FDSDtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1osWUFBWSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDNUM7QUFDSCxDQUFDO0FBS0QsTUFBTSxLQUFLLEdBQUcsQ0FBQyxPQUFxQixFQUFFLEVBQUU7SUFDdEMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUM1RCxPQUFPLElBQUksS0FBSyxFQUFFO1NBQ2YsUUFBUSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDO1NBQy9CLFFBQVEsQ0FDUCx3Q0FBd0MsRUFDeEMsYUFBYSxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUM7ZUFDbkIsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDO2lCQUNoQixNQUFNLENBQUMsSUFBSSxJQUFJLENBQUM7Z0JBQ2pCLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQzVCO1NBQ0EsUUFBUSxDQUNQLDJCQUEyQixFQUMzQixFQUFFLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDLDBCQUEwQixDQUFDLEVBQUUsT0FBTyxDQUNuRTtTQUNBLFFBQVEsQ0FDUCxtRUFBbUUsRUFDbkUsRUFBRSxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUM3QyxDQUFDLFFBQVEsQ0FDUix5RUFBeUUsRUFDekUsRUFBRSxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUMzQyxDQUFDO0FBQ04sQ0FBQyxDQUFDIn0=