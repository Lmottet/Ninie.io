export const addLove = (userId: string, feels: number) => {
  window.Repository.addLove(userId, feels);
};

export const removeLove = (userId: string, feels: number) => {
  window.Repository.removeLove(userId, feels);
};