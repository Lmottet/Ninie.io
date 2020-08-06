import { botCache } from "../../mod.ts";
import { sendMessage } from "../../deps.ts";
const songs = [
    [
        "Tout le monde veut devenir un Cat :musical_note:",
        "Parce qu'un chat - quand il est Cat :musical_note:",
        "Retooooombe sur ses pattes :musical_note:",
    ],
    [
        "Manon la gueuse ne porte jamais de culotte :musical_note:",
        "Chevalier sors ton dard et décalotte :musical_note:",
        "Et bourre la ribaude, fourre-z’y ta rapière :musical_note:",
    ],
];
const sing = (channel, song) => {
    for (let index = 0; index < songs[song].length; index++) {
        sendMessage(channel, songs[song][index]);
    }
};
botCache.commands.set("sing", {
    name: `sing`,
    execute: (message) => sing(message.channel, Math.floor(Math.random() * songs.length)),
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2luZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN4QyxPQUFPLEVBQUUsV0FBVyxFQUFXLE1BQU0sZUFBZSxDQUFDO0FBRXJELE1BQU0sS0FBSyxHQUFHO0lBQ1o7UUFDRSxrREFBa0Q7UUFDbEQsb0RBQW9EO1FBQ3BELDJDQUEyQztLQUM1QztJQUNEO1FBQ0UsMkRBQTJEO1FBQzNELHFEQUFxRDtRQUNyRCw0REFBNEQ7S0FDN0Q7Q0FDRixDQUFDO0FBRUYsTUFBTSxJQUFJLEdBQUcsQ0FBQyxPQUFnQixFQUFFLElBQVksRUFBRSxFQUFFO0lBQzlDLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQ3ZELFdBQVcsQ0FDVCxPQUFPLEVBQ1AsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUNuQixDQUFDO0tBQ0g7QUFDSCxDQUFDLENBQUM7QUFFRixRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUU7SUFDNUIsSUFBSSxFQUFFLE1BQU07SUFDWixPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUNuQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7Q0FDbEUsQ0FBQyxDQUFDIn0=