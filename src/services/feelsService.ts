export const handleFeels = (userId: string, feels: number) => {
  window.Repository.addLove(userId, feels);
  window.Repository.removeLove(userId, feels);
};
