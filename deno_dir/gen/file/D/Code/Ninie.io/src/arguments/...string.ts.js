import { botCache } from "../../mod.ts";
botCache.arguments.set("...string", {
    name: "...string",
    execute: function (argument, parameters) {
        if (!parameters.length)
            return;
        return argument.lowercase
            ? parameters.join(" ").toLowerCase()
            : parameters.join(" ");
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi4uc3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4uc3RyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFeEMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFO0lBQ2xDLElBQUksRUFBRSxXQUFXO0lBQ2pCLE9BQU8sRUFBRSxVQUFVLFFBQVEsRUFBRSxVQUFVO1FBQ3JDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTTtZQUFFLE9BQU87UUFFL0IsT0FBTyxRQUFRLENBQUMsU0FBUztZQUN2QixDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUU7WUFDcEMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0IsQ0FBQztDQUNGLENBQUMsQ0FBQyJ9