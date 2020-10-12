import { botCache } from "../../mod.ts";
botCache.inhibitors.set("only_in", async function (message, command, guild) {
    if (command.guildOnly && !guild)
        return true;
    if (command.dmOnly && guild)
        return true;
    return false;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25seUluLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsib25seUluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFJeEMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEtBQUssV0FBVyxPQUFnQixFQUFFLE9BQWUsRUFBRSxLQUF3QjtJQUU1RyxJQUFJLE9BQU8sQ0FBQyxTQUFTLElBQUksQ0FBQyxLQUFLO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFFN0MsSUFBSSxPQUFPLENBQUMsTUFBTSxJQUFJLEtBQUs7UUFBRSxPQUFPLElBQUksQ0FBQztJQUd6QyxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUMsQ0FBQyxDQUFDIn0=