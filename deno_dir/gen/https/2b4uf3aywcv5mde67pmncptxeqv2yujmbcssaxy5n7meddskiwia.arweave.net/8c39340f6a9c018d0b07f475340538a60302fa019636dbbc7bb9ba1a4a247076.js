import { Collection } from "./collection.ts";
export const cache = {
    isReady: false,
    guilds: new Collection(),
    channels: new Collection(),
    messages: new Collection(),
    unavailableGuilds: new Collection(),
    presences: new Collection(),
    fetchAllMembersProcessingRequests: new Collection(),
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYWNoZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFnQjdDLE1BQU0sQ0FBQyxNQUFNLEtBQUssR0FBYztJQUM5QixPQUFPLEVBQUUsS0FBSztJQUNkLE1BQU0sRUFBRSxJQUFJLFVBQVUsRUFBRTtJQUN4QixRQUFRLEVBQUUsSUFBSSxVQUFVLEVBQUU7SUFDMUIsUUFBUSxFQUFFLElBQUksVUFBVSxFQUFFO0lBQzFCLGlCQUFpQixFQUFFLElBQUksVUFBVSxFQUFFO0lBQ25DLFNBQVMsRUFBRSxJQUFJLFVBQVUsRUFBRTtJQUMzQixpQ0FBaUMsRUFBRSxJQUFJLFVBQVUsRUFBb0I7Q0FDdEUsQ0FBQyJ9