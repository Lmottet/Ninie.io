import { avatarURL, sendMessage } from "../../deps.ts";
import { botCache } from "../../mod.ts";
botCache.commands.set(`avatar`, {
    name: `avatar`,
    guildOnly: true,
    execute: (message, _args) => {
        const member = message.mentions.length
            ? message.mentions()[0]
            : message.member();
        return sendMessage(message.channel, {
            embed: {
                author: {
                    name: member.tag,
                    icon_url: avatarURL(member),
                },
                image: {
                    url: avatarURL(member, 2048),
                },
            },
        });
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXZhdGFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFeEMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFO0lBQzlCLElBQUksRUFBRSxRQUFRO0lBQ2QsU0FBUyxFQUFFLElBQUk7SUFDZixPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDMUIsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNO1lBQ3BDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFHLENBQUM7UUFFdEIsT0FBTyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUNsQyxLQUFLLEVBQUU7Z0JBQ0wsTUFBTSxFQUFFO29CQUNOLElBQUksRUFBRSxNQUFNLENBQUMsR0FBRztvQkFDaEIsUUFBUSxFQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUM7aUJBQzVCO2dCQUNELEtBQUssRUFBRTtvQkFDTCxHQUFHLEVBQUUsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUM7aUJBQzdCO2FBQ0Y7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0YsQ0FBQyxDQUFDIn0=