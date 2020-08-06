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
    [
        "Belle qui tiens ma vie :musical_note:",
        "Captive dans tes yeux :musical_note:",
        "Qui m'as l'âme ravie :musical_note:",
        "D'un souris gracieux :musical_note:",
    ],
    [
        "Mon petit oiseau a pris sa volée :musical_note:",
        "A pris sa... A la volette A pris sa volée :musical_note:",
        "Est allé se mettre sur un oranger :musical_note:",
        "Sur un o... A la volette Sur un oranger.  :musical_note:",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2luZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN4QyxPQUFPLEVBQUUsV0FBVyxFQUFXLE1BQU0sZUFBZSxDQUFDO0FBRXJELE1BQU0sS0FBSyxHQUFHO0lBQ1o7UUFDRSxrREFBa0Q7UUFDbEQsb0RBQW9EO1FBQ3BELDJDQUEyQztLQUM1QztJQUNEO1FBQ0UsMkRBQTJEO1FBQzNELHFEQUFxRDtRQUNyRCw0REFBNEQ7S0FDN0Q7SUFDRDtRQUNFLHVDQUF1QztRQUN2QyxzQ0FBc0M7UUFDdEMscUNBQXFDO1FBQ3JDLHFDQUFxQztLQUN0QztJQUNEO1FBQ0UsaURBQWlEO1FBQ2pELDBEQUEwRDtRQUMxRCxrREFBa0Q7UUFDbEQsMERBQTBEO0tBQzNEO0NBQ0YsQ0FBQztBQUVGLE1BQU0sSUFBSSxHQUFHLENBQUMsT0FBZ0IsRUFBRSxJQUFZLEVBQUUsRUFBRTtJQUM5QyxLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUN2RCxXQUFXLENBQ1QsT0FBTyxFQUNQLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FDbkIsQ0FBQztLQUNIO0FBQ0gsQ0FBQyxDQUFDO0FBRUYsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFO0lBQzVCLElBQUksRUFBRSxNQUFNO0lBQ1osT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQ2xFLENBQUMsQ0FBQyJ9