import { botCache } from "../../mod.ts";
import { Embed } from "../utils/Embed.ts";
import { createCommandAliases, sendEmbed } from "../utils/helpers.ts";
const druidResponse = () => {
    return new Embed()
        .setDescription("Recommandations de classe")
        .addField("Joueurs de la guilde à contacter: ", "Olzimare")
        .addField("Streamers : ", `Sapin - Nyruus: https://www.twitch.tv/nyruusqt
      Ours - Tomoboar : https://www.twitch.tv/dorkibear
      Poulet - Krona: https://www.twitch.tv/kronawow`)
        .addField("Addons utiles :", "HealerStatsWeight").addField("WeakAuras utiles :", "https://docs.google.com/document/d/1YUSqXAeTA9TOFMJBcyO-exg1BGf0L0zT8HNO1sVZxcs/edit");
};
botCache.commands.set("druid", {
    name: "druid",
    execute: (message) => {
        sendEmbed(message.channel, druidResponse(), `<@!${message.author.id}>`);
    },
});
createCommandAliases("druid", ["drood", "druide, olzimare"]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJ1aWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkcnVpZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMxQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFdEUsTUFBTSxhQUFhLEdBQUcsR0FBRyxFQUFFO0lBQ3pCLE9BQU8sSUFBSSxLQUFLLEVBQUU7U0FDZixjQUFjLENBQUMsMkJBQTJCLENBQUM7U0FDM0MsUUFBUSxDQUFDLG9DQUFvQyxFQUFFLFVBQVUsQ0FBQztTQUMxRCxRQUFRLENBQ1AsY0FBYyxFQUNkOztxREFFK0MsQ0FDaEQ7U0FDQSxRQUFRLENBQ1AsaUJBQWlCLEVBQ2pCLG1CQUFtQixDQUNwQixDQUFDLFFBQVEsQ0FDUixvQkFBb0IsRUFDcEIsc0ZBQXNGLENBQ3ZGLENBQUM7QUFDTixDQUFDLENBQUM7QUFFRixRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUU7SUFDN0IsSUFBSSxFQUFFLE9BQU87SUFDYixPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUNuQixTQUFTLENBQ1AsT0FBTyxDQUFDLE9BQU8sRUFDZixhQUFhLEVBQUUsRUFDZixNQUFNLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFHLENBQzNCLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsb0JBQW9CLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLGtCQUFrQixDQUFDLENBQUMsQ0FBQyJ9