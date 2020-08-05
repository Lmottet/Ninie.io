import { userTag } from "./utils/users.ts";

export const isAdmin = (userTag: string) =>
  userTag === "Ninie#9498" || userTag === "Olsi#5962";

export const isUserAdmin = (userName: string, discriminator: string) =>
  isAdmin(userTag(userName, discriminator));
