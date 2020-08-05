const insults = [
  "Du vent margoulin !",
  "Hérétique, au bucher !",
  "Ha ! Bien tenté, moule à gauffre !",
  "*Sniffs* Eh ! Tu sens pas la ninie toi, ouste !",
  "That's gonna be a no from me dawg."
];

export const anyInsult = () => {
  return insults[Math.floor(Math.random() * insults.length)];
};
