import { Collection } from "../utils/collection.ts";
import { createRole } from "./role.ts";
import { createMember } from "./member.ts";
import { createChannel } from "./channel.ts";
export const createGuild = (data, shardID) => {
    const guild = {
        ...data,
        shardID,
        ownerID: data.owner_id,
        afkChannelID: data.afk_channel_id,
        afkTimeout: data.afk_timeout,
        widgetEnabled: data.widget_enabled,
        widgetChannelID: data.widget_channel_id,
        verificationLevel: data.verification_level,
        mfaLevel: data.mfa_level,
        systemChannelID: data.system_channel_id,
        maxPresences: data.max_presences,
        maxMembers: data.max_members,
        vanityURLCode: data.vanity_url_code,
        premiumTier: data.premium_tier,
        premiumSubscriptionCount: data.premium_subscription_count,
        preferredLocale: data.preferred_locale,
        roles: new Collection(data.roles.map((r) => [r.id, createRole(r)])),
        joinedAt: Date.parse(data.joined_at),
        members: new Collection(),
        channels: new Collection(data.channels.map((c) => [c.id, createChannel(c, data.id)])),
        presences: new Collection(data.presences.map((p) => [p.user.id, p])),
        memberCount: data.member_count || 0,
        voiceStates: new Collection(data.voice_states.map((vs) => [vs.user_id, {
                ...vs,
                guildID: vs.guild_id,
                channelID: vs.channel_id,
                userID: vs.user_id,
                sessionID: vs.session_id,
                selfDeaf: vs.self_deaf,
                selfMute: vs.self_mute,
                selfStream: vs.self_stream,
            }])),
    };
    data.members.forEach((m) => guild.members.set(m.user.id, createMember(m, guild)));
    delete guild.owner_id;
    delete guild.afk_channel_id;
    delete guild.afk_timeout;
    delete guild.widget_enabled;
    delete guild.widget_channel_id;
    delete guild.verification_level;
    delete guild.mfa_level;
    delete guild.system_channel_id;
    delete guild.max_presences;
    delete guild.max_members;
    delete guild.vanity_url_code;
    delete guild.premium_tier;
    delete guild.premium_subscription_count;
    delete guild.preferred_locale;
    delete guild.joined_at;
    delete guild.member_count;
    delete guild.voice_states;
    return guild;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VpbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJndWlsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUN2QyxPQUFPLEVBQUUsWUFBWSxFQUFVLE1BQU0sYUFBYSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFN0MsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFHLENBQUMsSUFBd0IsRUFBRSxPQUFlLEVBQUUsRUFBRTtJQUN2RSxNQUFNLEtBQUssR0FBRztRQUNaLEdBQUcsSUFBSTtRQUVQLE9BQU87UUFFUCxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVE7UUFFdEIsWUFBWSxFQUFFLElBQUksQ0FBQyxjQUFjO1FBRWpDLFVBQVUsRUFBRSxJQUFJLENBQUMsV0FBVztRQUU1QixhQUFhLEVBQUUsSUFBSSxDQUFDLGNBQWM7UUFFbEMsZUFBZSxFQUFFLElBQUksQ0FBQyxpQkFBaUI7UUFFdkMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQjtRQUUxQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVM7UUFFeEIsZUFBZSxFQUFFLElBQUksQ0FBQyxpQkFBaUI7UUFFdkMsWUFBWSxFQUFFLElBQUksQ0FBQyxhQUFhO1FBRWhDLFVBQVUsRUFBRSxJQUFJLENBQUMsV0FBVztRQUU1QixhQUFhLEVBQUUsSUFBSSxDQUFDLGVBQWU7UUFFbkMsV0FBVyxFQUFFLElBQUksQ0FBQyxZQUFZO1FBRTlCLHdCQUF3QixFQUFFLElBQUksQ0FBQywwQkFBMEI7UUFFekQsZUFBZSxFQUFFLElBQUksQ0FBQyxnQkFBZ0I7UUFHdEMsS0FBSyxFQUFFLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVuRSxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBRXBDLE9BQU8sRUFBRSxJQUFJLFVBQVUsRUFBa0I7UUFFekMsUUFBUSxFQUFFLElBQUksVUFBVSxDQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLGFBQWEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FDNUQ7UUFFRCxTQUFTLEVBQUUsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVwRSxXQUFXLEVBQUUsSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDO1FBRW5DLFdBQVcsRUFBRSxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFO2dCQUNyRSxHQUFHLEVBQUU7Z0JBQ0wsT0FBTyxFQUFFLEVBQUUsQ0FBQyxRQUFRO2dCQUNwQixTQUFTLEVBQUUsRUFBRSxDQUFDLFVBQVU7Z0JBQ3hCLE1BQU0sRUFBRSxFQUFFLENBQUMsT0FBTztnQkFDbEIsU0FBUyxFQUFFLEVBQUUsQ0FBQyxVQUFVO2dCQUN4QixRQUFRLEVBQUUsRUFBRSxDQUFDLFNBQVM7Z0JBQ3RCLFFBQVEsRUFBRSxFQUFFLENBQUMsU0FBUztnQkFDdEIsVUFBVSxFQUFFLEVBQUUsQ0FBQyxXQUFXO2FBQzNCLENBQUMsQ0FBQyxDQUFDO0tBQ0wsQ0FBQztJQUVGLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FDekIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUNyRCxDQUFDO0lBR0YsT0FBTyxLQUFLLENBQUMsUUFBUSxDQUFDO0lBQ3RCLE9BQU8sS0FBSyxDQUFDLGNBQWMsQ0FBQztJQUM1QixPQUFPLEtBQUssQ0FBQyxXQUFXLENBQUM7SUFDekIsT0FBTyxLQUFLLENBQUMsY0FBYyxDQUFDO0lBQzVCLE9BQU8sS0FBSyxDQUFDLGlCQUFpQixDQUFDO0lBQy9CLE9BQU8sS0FBSyxDQUFDLGtCQUFrQixDQUFDO0lBQ2hDLE9BQU8sS0FBSyxDQUFDLFNBQVMsQ0FBQztJQUN2QixPQUFPLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQztJQUMvQixPQUFPLEtBQUssQ0FBQyxhQUFhLENBQUM7SUFDM0IsT0FBTyxLQUFLLENBQUMsV0FBVyxDQUFDO0lBQ3pCLE9BQU8sS0FBSyxDQUFDLGVBQWUsQ0FBQztJQUM3QixPQUFPLEtBQUssQ0FBQyxZQUFZLENBQUM7SUFDMUIsT0FBTyxLQUFLLENBQUMsMEJBQTBCLENBQUM7SUFDeEMsT0FBTyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7SUFDOUIsT0FBTyxLQUFLLENBQUMsU0FBUyxDQUFDO0lBQ3ZCLE9BQU8sS0FBSyxDQUFDLFlBQVksQ0FBQztJQUMxQixPQUFPLEtBQUssQ0FBQyxZQUFZLENBQUM7SUFDMUIsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDLENBQUMifQ==