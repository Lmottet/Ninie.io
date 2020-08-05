import { botCache } from "../../mod.ts";
botCache.inhibitors.set("only_in", async function (message, command, guild) {
    if (command.guildOnly && !guild)
        return true;
    if (command.dmOnly && guild)
        return true;
    return false;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25seUluLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsib25seUluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFeEMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEtBQUssV0FBVyxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUs7SUFFeEUsSUFBSSxPQUFPLENBQUMsU0FBUyxJQUFJLENBQUMsS0FBSztRQUFFLE9BQU8sSUFBSSxDQUFDO0lBRTdDLElBQUksT0FBTyxDQUFDLE1BQU0sSUFBSSxLQUFLO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFHekMsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDLENBQUMsQ0FBQyJ9