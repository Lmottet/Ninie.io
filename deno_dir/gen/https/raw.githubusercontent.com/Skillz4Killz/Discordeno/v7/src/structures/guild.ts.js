import Collection from "../utils/collection.ts";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VpbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJndWlsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLFVBQVUsTUFBTSx3QkFBd0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxZQUFZLEVBQVUsTUFBTSxhQUFhLENBQUM7QUFDbkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUU3QyxNQUFNLENBQUMsTUFBTSxXQUFXLEdBQUcsQ0FBQyxJQUF3QixFQUFFLE9BQWUsRUFBRSxFQUFFO0lBQ3ZFLE1BQU0sS0FBSyxHQUFHO1FBQ1osR0FBRyxJQUFJO1FBRVAsT0FBTztRQUVQLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUTtRQUV0QixZQUFZLEVBQUUsSUFBSSxDQUFDLGNBQWM7UUFFakMsVUFBVSxFQUFFLElBQUksQ0FBQyxXQUFXO1FBRTVCLGFBQWEsRUFBRSxJQUFJLENBQUMsY0FBYztRQUVsQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGlCQUFpQjtRQUV2QyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsa0JBQWtCO1FBRTFDLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUztRQUV4QixlQUFlLEVBQUUsSUFBSSxDQUFDLGlCQUFpQjtRQUV2QyxZQUFZLEVBQUUsSUFBSSxDQUFDLGFBQWE7UUFFaEMsVUFBVSxFQUFFLElBQUksQ0FBQyxXQUFXO1FBRTVCLGFBQWEsRUFBRSxJQUFJLENBQUMsZUFBZTtRQUVuQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFlBQVk7UUFFOUIsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLDBCQUEwQjtRQUV6RCxlQUFlLEVBQUUsSUFBSSxDQUFDLGdCQUFnQjtRQUd0QyxLQUFLLEVBQUUsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxD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