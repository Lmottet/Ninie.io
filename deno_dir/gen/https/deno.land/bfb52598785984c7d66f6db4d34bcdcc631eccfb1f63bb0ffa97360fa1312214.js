import { createChannel } from "./channel.ts";
import { createGuild } from "./guild.ts";
import { createMember } from "./member.ts";
import { createMessage } from "./message.ts";
import { createRole } from "./role.ts";
export let structures = {
    createChannel,
    createGuild,
    createMember,
    createMessage,
    createRole,
};
export function updateStructures(newStructures) {
    structures = {
        ...structures,
        ...newStructures,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDN0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDN0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUd2QyxNQUFNLENBQUMsSUFBSSxVQUFVLEdBQUc7SUFDdEIsYUFBYTtJQUNiLFdBQVc7SUFDWCxZQUFZO0lBQ1osYUFBYTtJQUNiLFVBQVU7Q0FDWCxDQUFDO0FBUUYsTUFBTSxVQUFVLGdCQUFnQixDQUFDLGFBQXlCO0lBQ3hELFVBQVUsR0FBRztRQUNYLEdBQUcsVUFBVTtRQUNiLEdBQUcsYUFBYTtLQUNqQixDQUFDO0FBQ0osQ0FBQyJ9