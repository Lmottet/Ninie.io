const insults = [
  "Du vent margoulin !",
  "Hérétique, au bucher !",
  "Ha ! Bien tenté, moule à gauffre",
  "*Sniffs* Eh ! Tu sens pas la ninie toi, ouste !",
];

export const anyInsult = () => {
  return insults[Math.floor(Math.random() * insults.length)];
};