export async function createRole(data) {
    return {
        ...data,
        mention: `<@&${data.id}>`,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJvbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsTUFBTSxDQUFDLEtBQUssVUFBVSxVQUFVLENBQUMsSUFBYztJQUM3QyxPQUFPO1FBQ0wsR0FBRyxJQUFJO1FBRVAsT0FBTyxFQUFFLE1BQU0sSUFBSSxDQUFDLEVBQUUsR0FBRztLQUMxQixDQUFDO0FBQ0osQ0FBQyJ9