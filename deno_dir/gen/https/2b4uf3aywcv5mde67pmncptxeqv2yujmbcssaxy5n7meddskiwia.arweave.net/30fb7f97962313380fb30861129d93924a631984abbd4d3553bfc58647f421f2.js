export async function createMember(data, guildID) {
    const { joined_at: joinedAt, premium_since: premiumSince, ...rest } = data;
    const { mfa_enabled: mfaEnabled, premium_type: premiumType, ...user } = data.user || {};
    const member = {
        ...rest,
        user: user,
        joinedAt: Date.parse(joinedAt),
        premiumSince: premiumSince ? Date.parse(premiumSince) : undefined,
        guildID,
        mfaEnabled,
        premiumType,
    };
    return member;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVtYmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWVtYmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE1BQU0sQ0FBQyxLQUFLLFVBQVUsWUFBWSxDQUFDLElBQXlCLEVBQUUsT0FBZTtJQUMzRSxNQUFNLEVBQ0osU0FBUyxFQUFFLFFBQVEsRUFDbkIsYUFBYSxFQUFFLFlBQVksRUFDM0IsR0FBRyxJQUFJLEVBQ1IsR0FBRyxJQUFJLENBQUM7SUFFVCxNQUFNLEVBQ0osV0FBVyxFQUFFLFVBQVUsRUFDdkIsWUFBWSxFQUFFLFdBQVcsRUFDekIsR0FBRyxJQUFJLEVBQ1IsR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUVwQixNQUFNLE1BQU0sR0FBRztRQUNiLEdBQUcsSUFBSTtRQUVQLElBQUksRUFBRSxJQUFJO1FBRVYsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO1FBRTlCLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7UUFFakUsT0FBTztRQUVQLFVBQVU7UUFFVixXQUFXO0tBQ1osQ0FBQztJQUVGLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMifQ==