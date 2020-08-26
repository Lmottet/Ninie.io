import { cache } from "../utils/cache.ts";
export const createMember = (data, guild) => {
    const member = {
        ...data,
        joinedAt: Date.parse(data.joined_at),
        premiumSince: data.premium_since
            ? Date.parse(data.premium_since)
            : undefined,
        tag: `${data.user.username}#${data.user.discriminator}`,
        mention: `<@!${data.user.id}>`,
        guildID: guild.id,
        mfaEnabled: data.user.mfa_enabled,
        premiumType: data.user.premium_type,
        guild: () => cache.guilds.get(guild.id),
    };
    return member;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVtYmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWVtYmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUUxQyxNQUFNLENBQUMsTUFBTSxZQUFZLEdBQUcsQ0FBQyxJQUF5QixFQUFFLEtBQVksRUFBRSxFQUFFO0lBQ3RFLE1BQU0sTUFBTSxHQUFHO1FBQ2IsR0FBRyxJQUFJO1FBRVAsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUVwQyxZQUFZLEVBQUUsSUFBSSxDQUFDLGFBQWE7WUFDOUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztZQUNoQyxDQUFDLENBQUMsU0FBUztRQUViLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO1FBRXZELE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHO1FBRTlCLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRTtRQUVqQixVQUFVLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXO1FBRWpDLFdBQVcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVk7UUFHbkMsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUU7S0FDekMsQ0FBQztJQVFGLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMsQ0FBQyJ9