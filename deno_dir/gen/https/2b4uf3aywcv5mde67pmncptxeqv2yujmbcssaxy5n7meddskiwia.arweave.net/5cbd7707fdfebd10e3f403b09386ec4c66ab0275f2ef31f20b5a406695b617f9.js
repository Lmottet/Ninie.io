import { cacheHandlers } from "../controllers/cache.ts";
import { calculatePermissions } from "../utils/permissions.ts";
export async function createChannel(data, guildID) {
    const { guild_id: rawGuildID, last_message_id: lastMessageID, user_limit: userLimit, rate_limit_per_user: rateLimitPerUser, parent_id: parentID, last_pin_timestamp: lastPinTimestamp, ...rest } = data;
    const channel = {
        ...rest,
        guildID: guildID || rawGuildID,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbm5lbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNoYW5uZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRS9ELE1BQU0sQ0FBQyxLQUFLLFVBQVUsYUFBYSxDQUNqQyxJQUEwQixFQUMxQixPQUFnQjtJQUVoQixNQUFNLEVBQ0osUUFBUSxFQUFFLFVBQVUsRUFDcEIsZUFBZSxFQUFFLGFBQWEsRUFDOUIsVUFBVSxFQUFFLFNBQVMsRUFDckIsbUJBQW1CLEVBQUUsZ0JBQWdCLEVBQ3JDLFNBQVMsRUFBRSxRQUFRLEVBQ25CLGtCQUFrQixFQUFFLGdCQUFnQixFQUNwQyxHQUFHLElBQUksRUFDUixHQUFHLElBQUksQ0FBQztJQUVULE1BQU0sT0FBTyxHQUFHO1FBQ2QsR0FBRyxJQUFJO1FBRVAsT0FBTyxFQUFFLE9BQU8sSUFBSSxVQUFVO1FBRTlCLGFBQWE7UUFFYixTQUFTO1FBRVQsZ0JBQWdCO1FBRWhCLFFBQVE7UUFFUixnQkFBZ0I7UUFFaEIsV0FBVyxFQUFFLElBQUksQ0FBQyxxQkFBcUI7WUFDckMsQ0FBQyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQzFDLEdBQUcsSUFBSTtnQkFDUCxLQUFLLEVBQUUsb0JBQW9CLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxFQUFFLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDOUMsQ0FBQyxDQUFDO1lBQ0gsQ0FBQyxDQUFDLEVBQUU7UUFFTixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksSUFBSSxLQUFLO1FBRXhCLE9BQU8sRUFBRSxLQUFLLElBQUksQ0FBQyxFQUFFLEdBQUc7S0FDekIsQ0FBQztJQUVGLGFBQWEsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDaEQsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQyJ9