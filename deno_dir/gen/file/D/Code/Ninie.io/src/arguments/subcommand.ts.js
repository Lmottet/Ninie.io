import { botCache } from "../../mod.ts";
botCache.arguments.set("subcommand", {
    name: "subcommand",
    execute: function (argument, parameters) {
        const [subcommand] = parameters;
        return argument.literals?.find((literal) => literal.toLowerCase() === subcommand?.toLowerCase());
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ViY29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN1YmNvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUV4QyxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUU7SUFDbkMsSUFBSSxFQUFFLFlBQVk7SUFDbEIsT0FBTyxFQUFFLFVBQVUsUUFBUSxFQUFFLFVBQVU7UUFDckMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLFVBQVUsQ0FBQztRQUVoQyxPQUFPLFFBQVEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FDekMsT0FBTyxDQUFDLFdBQVcsRUFBRSxLQUFLLFVBQVUsRUFBRSxXQUFXLEVBQUUsQ0FDcEQsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFDLENBQUMifQ==