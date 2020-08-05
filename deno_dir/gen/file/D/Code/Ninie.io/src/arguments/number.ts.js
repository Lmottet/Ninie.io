import { botCache } from "../../mod.ts";
botCache.arguments.set("number", {
    name: "number",
    execute: function (_argument, parameters) {
        const [number] = parameters;
        const valid = Number(number);
        if (valid)
            return valid;
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibnVtYmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFeEMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFO0lBQy9CLElBQUksRUFBRSxRQUFRO0lBQ2QsT0FBTyxFQUFFLFVBQVUsU0FBUyxFQUFFLFVBQVU7UUFDdEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLFVBQVUsQ0FBQztRQUU1QixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0IsSUFBSSxLQUFLO1lBQUUsT0FBTyxLQUFLLENBQUM7SUFDMUIsQ0FBQztDQUNGLENBQUMsQ0FBQyJ9