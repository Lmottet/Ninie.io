import { botCache } from "../../mod.ts";
import { cache, sendMessage } from "../../deps.ts";
botCache.commands.set(`ping`, {
    name: `ping`,
    execute: function (message) {
        sendMessage(message.channelID, `Ping MS: ${Date.now() - message.timestamp}ms`);
    },
});
botCache.commands.set(`devping`, {
    name: `devping`,
    guildOnly: true,
    execute: function (message) {
        let memberCount = 0;
        cache.guilds.forEach((guild) => {
            memberCount += guild.members.size;
        });
        sendMessage(message.channelID, `Ping MS: ${Date.now() - message.timestamp}ms | Guilds: ${cache.guilds.size} | Users: ${memberCount}`);
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN4QyxPQUFPLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRCxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUU7SUFDNUIsSUFBSSxFQUFFLE1BQU07SUFDWixPQUFPLEVBQUUsVUFBVSxPQUFPO1FBQ3hCLFdBQVcsQ0FDVCxPQUFPLENBQUMsU0FBUyxFQUNqQixZQUFZLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxPQUFPLENBQUMsU0FBUyxJQUFJLENBQy9DLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFO0lBQy9CLElBQUksRUFBRSxTQUFTO0lBQ2YsU0FBUyxFQUFFLElBQUk7SUFDZixPQUFPLEVBQUUsVUFBVSxPQUFPO1FBQ3hCLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQztRQUNwQixLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQzdCLFdBQVcsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztRQUNwQyxDQUFDLENBQUMsQ0FBQztRQUVILFdBQVcsQ0FDVCxPQUFPLENBQUMsU0FBUyxFQUNqQixZQUFZLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxPQUFPLENBQUMsU0FBUyxnQkFDeEMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUNmLGFBQWEsV0FBVyxFQUFFLENBQzNCLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQyxDQUFDIn0=