import { botCache } from "../../mod.ts";
botCache.arguments.set("boolean", {
    name: "boolean",
    execute: function (_argument, parameters) {
        const [boolean] = parameters;
        const valid = ["true", "false", "on", "off"].includes(boolean);
        if (valid)
            return ["true", "on"].includes(boolean);
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vbGVhbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJvb2xlYW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUV4QyxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUU7SUFDaEMsSUFBSSxFQUFFLFNBQVM7SUFDZixPQUFPLEVBQUUsVUFBVSxTQUFTLEVBQUUsVUFBVTtRQUN0QyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsVUFBVSxDQUFDO1FBRTdCLE1BQU0sS0FBSyxHQUFHLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9ELElBQUksS0FBSztZQUFFLE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JELENBQUM7Q0FDRixDQUFDLENBQUMifQ==