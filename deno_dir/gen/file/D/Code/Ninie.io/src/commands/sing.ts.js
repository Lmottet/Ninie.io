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
        "Sur un o... A la volette Sur un oranger. :musical_note:",
    ],
    [
        `Et ça fait bim-bam-boum, ça fait -pschhht!- et ça fait "vroum" :musical_note:`,
        "Ça fait bim-bam-boum, dans ma tête y a tout qui tourne :musical_note:",
        `Ça fait "chut!" et puis "blabla!", ça fait, comme ci-comme ça :musical_note:`,
    ],
    [
        `Dites à mes amis que je m'en vais :musical_note:`,
        "Je pars vers de nouveaux pays :musical_note:",
        `Où le ciel est tout bleu, dites que je m'en vais :musical_note:`,
        `Et c'est tout ce qui compte dans ma vie :musical_note:`,
    ],
    [
        `Est-ce que tu m'entends, hey ho :musical_note:`,
        `Est-ce que tu me sens, hey ho :musical_note:`,
        `Touche-moi je suis là, hey ho ho ho ho :musical_note:`,
        `S'il te plait réponds-moi, hey ho :musical_note:`,
    ],
];
const sing = (channelID, song) => {
    for (let index = 0; index < songs[song].length; index++) {
        sendMessage(channelID, songs[song][index]);
    }
};
botCache.commands.set("sing", {
    name: `sing`,
    execute: (message) => sing(message.channelID, Math.floor(Math.random() * songs.length)),
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2luZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN4QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzVDLE1BQU0sS0FBSyxHQUFHO0lBQ1o7UUFDRSxrREFBa0Q7UUFDbEQsb0RBQW9EO1FBQ3BELDJDQUEyQztLQUM1QztJQUNEO1FBQ0UsMkRBQTJEO1FBQzNELHFEQUFxRDtRQUNyRCw0REFBNEQ7S0FDN0Q7SUFDRDtRQUNFLHVDQUF1QztRQUN2QyxzQ0FBc0M7UUFDdEMscUNBQXFDO1FBQ3JDLHFDQUFxQztLQUN0QztJQUNEO1FBQ0UsaURBQWlEO1FBQ2pELDBEQUEwRDtRQUMxRCxrREFBa0Q7UUFDbEQseURBQXlEO0tBQzFEO0lBQ0Q7UUFDRSwrRUFBK0U7UUFDL0UsdUVBQXVFO1FBQ3ZFLDhFQUE4RTtLQUMvRTtJQUNEO1FBQ0Usa0RBQWtEO1FBQ2xELDhDQUE4QztRQUM5QyxpRUFBaUU7UUFDakUsd0RBQXdEO0tBQ3pEO0lBQ0Q7UUFDRSxnREFBZ0Q7UUFDaEQsOENBQThDO1FBQzlDLHVEQUF1RDtRQUN2RCxrREFBa0Q7S0FDbkQ7Q0FDRixDQUFDO0FBRUYsTUFBTSxJQUFJLEdBQUcsQ0FBQyxTQUFpQixFQUFFLElBQVksRUFBRSxFQUFFO0lBQy9DLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQ3ZELFdBQVcsQ0FDVCxTQUFTLEVBQ1QsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUNuQixDQUFDO0tBQ0g7QUFDSCxDQUFDLENBQUM7QUFFRixRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUU7SUFDNUIsSUFBSSxFQUFFLE1BQU07SUFDWixPQUFPLEVBQUUsQ0FBQyxPQUFnQixFQUFFLEVBQUUsQ0FDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQ3BFLENBQUMsQ0FBQyJ9