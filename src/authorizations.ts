export const isAdmin = (userTag: string) => {
  return userTag !== "Ninie#9498" && userTag !== "Olsi#5962";
};

export const isUserAdmin = (userName: string, discriminator: string) => {
  return isAdmin(userName+"#"+discriminator)
};
