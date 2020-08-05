import { avatarURL, sendMessage } from "../../deps.ts";
import { botCache } from "../../mod.ts";
botCache.commands.set(`avatar`, {
    name: `avatar`,
    guildOnly: true,
    execute: (message, _args, guild) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXZhdGFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFeEMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFO0lBQzlCLElBQUksRUFBRSxRQUFRO0lBQ2QsU0FBUyxFQUFFLElBQUk7SUFDZixPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQ2pDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTTtZQUNwQyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN2QixDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRyxDQUFDO1FBRXRCLE9BQU8sV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDbEMsS0FBSyxFQUFFO2dCQUNMLE1BQU0sRUFBRTtvQkFDTixJQUFJLEVBQUUsTUFBTSxDQUFDLEdBQUc7b0JBQ2hCLFFBQVEsRUFBRSxTQUFTLENBQUMsTUFBTSxDQUFDO2lCQUM1QjtnQkFDRCxLQUFLLEVBQUU7b0JBQ0wsR0FBRyxFQUFFLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDO2lCQUM3QjthQUNGO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGLENBQUMsQ0FBQyJ9