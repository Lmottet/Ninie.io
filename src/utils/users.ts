export const userTag = (userName: string, discriminator: string) => {
  return userName + "#" + discriminator;
};