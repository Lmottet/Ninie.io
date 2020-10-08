import { commandHandler } from "../monitors/commandHandler.ts";
import { botCache } from "../../mod.ts";
botCache.eventHandlers.messageCreate = function (message) {
    commandHandler(message);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZUNyZWF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1lc3NhZ2VDcmVhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFHeEMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLEdBQUcsVUFBVSxPQUFnQjtJQUMvRCxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDMUIsQ0FBQyxDQUFDIn0=