import { calculatePermissions } from "../utils/permissions.ts";
import { cache } from "../utils/cache.ts";
export function createChannel(data, guildID) {
    const channel = {
        ...data,
        guildID: guildID || data.guild_id,
        lastMessageID: data.last_message_id,
        userLimit: data.user_limit,
        rateLimitPerUser: data.rate_limit_per_user,
        parentID: data.parent_id,
        lastPinTimestamp: data.last_pin_timestamp,
        permissions: data.permission_overwrites
            ? data.permission_overwrites.map((perm) => ({
                ...perm,
                allow: calculatePermissions(BigInt(perm.allow_new)),
                deny: calculatePermissions(BigInt(perm.deny_new)),
            }))
            : [],
        nsfw: data.nsfw || false,
        mention: `<#${data.id}>`,
    };
    delete channel.guild_id;
    delete channel.last_message_id;
    delete channel.rate_limit_per_user;
    delete channel.last_pin_timestamp;
    delete channel.user_limit;
    cache.channels.set(data.id, channel);
    return channel;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbm5lbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNoYW5uZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDL0QsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRTFDLE1BQU0sVUFBVSxhQUFhLENBQUMsSUFBMEIsRUFBRSxPQUFnQjtJQUN4RSxNQUFNLE9BQU8sR0FBRztRQUNkLEdBQUcsSUFBSTtRQUVQLE9BQU8sRUFBRSxPQUFPLElBQUksSUFBSSxDQUFDLFFBQVE7UUFFakMsYUFBYSxFQUFFLElBQUksQ0FBQyxlQUFlO1FBRW5DLFNBQVMsRUFBRSxJQUFJLENBQUMsVUFBVTtRQUUxQixnQkFBZ0IsRUFBRSxJQUFJLENBQUMsbUJBQW1CO1FBRTFDLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUztRQUV4QixnQkFBZ0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCO1FBRXpDLFdBQVcsRUFBRSxJQUFJLENBQUMscUJBQXFCO1lBQ3JDLENBQUMsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUMxQyxHQUFHLElBQUk7Z0JBQ1AsS0FBSyxFQUFFLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ25ELElBQUksRUFBRSxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ2xELENBQUMsQ0FBQztZQUNILENBQUMsQ0FBQyxFQUFFO1FBRU4sSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLElBQUksS0FBSztRQUV4QixPQUFPLEVBQUUsS0FBSyxJQUFJLENBQUMsRUFBRSxHQUFHO0tBQ3pCLENBQUM7SUFHRixPQUFPLE9BQU8sQ0FBQyxRQUFRLENBQUM7SUFDeEIsT0FBTyxPQUFPLENBQUMsZUFBZSxDQUFDO0lBQy9CLE9BQU8sT0FBTyxDQUFDLG1CQUFtQixDQUFDO0lBQ25DLE9BQU8sT0FBTyxDQUFDLGtCQUFrQixDQUFDO0lBQ2xDLE9BQU8sT0FBTyxDQUFDLFVBQVUsQ0FBQztJQUUxQixLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3JDLE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUMifQ==