import { cacheHandlers } from "../controllers/cache.ts";
import { calculatePermissions } from "../utils/permissions.ts";
export async function createChannel(data, guildID) {
    const { guild_id: rawGuildID, last_message_id: lastMessageID, user_limit: userLimit, rate_limit_per_user: rateLimitPerUser, parent_id: parentID, last_pin_timestamp: lastPinTimestamp, ...rest } = data;
    const channel = {
        ...rest,
        guildID: guildID || rawGuildID || "",
        lastMessageID,
        userLimit,
        rateLimitPerUser,
        parentID,
        lastPinTimestamp,
        permissions: data.permission_overwrites
            ? data.permission_overwrites.map((perm) => ({
                ...perm,
                allow: calculatePermissions(BigInt(perm.allow)),
                deny: calculatePermissions(BigInt(perm.deny)),
            }))
            : [],
        nsfw: data.nsfw || false,
        mention: `<#${data.id}>`,
    };
    cacheHandlers.set("channels", data.id, channel);
    return channel;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbm5lbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNoYW5uZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBR3hELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRS9ELE1BQU0sQ0FBQyxLQUFLLFVBQVUsYUFBYSxDQUNqQyxJQUEwQixFQUMxQixPQUFnQjtJQUVoQixNQUFNLEVBQ0osUUFBUSxFQUFFLFVBQVUsRUFDcEIsZUFBZSxFQUFFLGFBQWEsRUFDOUIsVUFBVSxFQUFFLFNBQVMsRUFDckIsbUJBQW1CLEVBQUUsZ0JBQWdCLEVBQ3JDLFNBQVMsRUFBRSxRQUFRLEVBQ25CLGtCQUFrQixFQUFFLGdCQUFnQixFQUNwQyxHQUFHLElBQUksRUFDUixHQUFHLElBQUksQ0FBQztJQUVULE1BQU0sT0FBTyxHQUFHO1FBQ2QsR0FBRyxJQUFJO1FBRVAsT0FBTyxFQUFFLE9BQU8sSUFBSSxVQUFVLElBQUksRUFBRTtRQUVwQyxhQUFhO1FBRWIsU0FBUztRQUVULGdCQUFnQjtRQUVoQixRQUFRO1FBRVIsZ0JBQWdCO1FBRWhCLFdBQVcsRUFBRSxJQUFJLENBQUMscUJBQXFCO1lBQ3JDLENBQUMsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUMxQyxHQUFHLElBQUk7Z0JBQ1AsS0FBSyxFQUFFLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQy9DLElBQUksRUFBRSxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzlDLENBQUMsQ0FBQztZQUNILENBQUMsQ0FBQyxFQUFFO1FBRU4sSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLElBQUksS0FBSztRQUV4QixPQUFPLEVBQUUsS0FBSyxJQUFJLENBQUMsRUFBRSxHQUFHO0tBQ3pCLENBQUM7SUFFRixhQUFhLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2hELE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUMifQ==