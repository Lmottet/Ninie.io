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

const sing = (channelID: string, song: number) => {
  for (let index = 0; index < songs[song].length; index++) {
    sendMessage(
      channelID,
      songs[song][index],
    );
  }
};

botCache.commands.set("sing", {
  name: `sing`,
  execute: (message) =>
    sing(message.channelID, Math.floor(Math.random() * songs.length)),
});
