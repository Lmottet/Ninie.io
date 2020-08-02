export const handleFeels = (userId: number, feels: number) => {
  window.Repository.addLove(userId, feels);
  window.Repository.removeLove(userId, feels);
};
