import { userTag } from "./utils/users.ts";
import { config } from "../config.ts";

export const isAdmin = (userTag: string) =>
  userTag === config.ninieTag || userTag === "Olsi#5962";

export const isUserAdmin = (userName: string, discriminator: string) =>
  isAdmin(userTag(userName, discriminator));
