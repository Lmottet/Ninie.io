import { botCache } from "../../mod.ts";
botCache.inhibitors.set("nsfw", async function (message, command, guild) {
    if (!command.nsfw)
        return false;
    if (!guild)
        return true;
    const isNsfw = message.channel.nsfw;
    return !isNsfw;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnNmdy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5zZncudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUV4QyxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsS0FBSyxXQUFXLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSztJQUVyRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUk7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUdoQyxJQUFJLENBQUMsS0FBSztRQUFFLE9BQU8sSUFBSSxDQUFDO0lBR3hCLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO0lBRXBDLE9BQU8sQ0FBQyxNQUFNLENBQUM7QUFDakIsQ0FBQyxDQUFDLENBQUMifQ==