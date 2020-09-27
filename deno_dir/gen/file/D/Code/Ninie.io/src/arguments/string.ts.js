import { botCache } from "../../mod.ts";
botCache.arguments.set("string", {
    name: "string",
    execute: function (argument, parameters) {
        const [text] = parameters;
        const valid = argument.literals?.length && text
            ? argument.literals.includes(text.toLowerCase()) ? text : undefined
            : undefined;
        if (valid) {
            return argument.lowercase ? valid.toLowerCase() : valid;
        }
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3RyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFeEMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFO0lBQy9CLElBQUksRUFBRSxRQUFRO0lBQ2QsT0FBTyxFQUFFLFVBQVUsUUFBUSxFQUFFLFVBQVU7UUFDckMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLFVBQVUsQ0FBQztRQUUxQixNQUFNLEtBQUssR0FFVCxRQUFRLENBQUMsUUFBUSxFQUFFLE1BQU0sSUFBSSxJQUFJO1lBQy9CLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTO1lBQ25FLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFFaEIsSUFBSSxLQUFLLEVBQUU7WUFDVCxPQUFPLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1NBQ3pEO0lBQ0gsQ0FBQztDQUNGLENBQUMsQ0FBQyJ9