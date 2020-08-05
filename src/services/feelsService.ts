export const addLove = (userId: string, loveLevel: number) => {
  console.log("Add " + loveLevel + " love to " + userId);
  window.Repository.setLove(userId, calculateLove(userId, loveLevel));
};

export const removeLove = (userId: string, loveLevel: number) => {
  console.log("Remove " + loveLevel + " love from " + userId);
  window.Repository.setLove(userId, calculateHate(userId, loveLevel));
};

export const getLove = (userId: string) => window.Repository.getLove(userId);

export const getHarem = () => {
  let x = window.Repository.userLove;
  console.log("x : " + JSON.stringify(x));
  console.log("rep string : " + JSON.stringify(window.Repository));
  let getAll = window.Repository.getAll();
  console.log("getAll : " + JSON.stringify(getAll));
  console.log("getAll keys : " + JSON.stringify(getAll.keys()));
  getAll.keys().forEach((element:string) => {
    console.log("test");
  });
  getAll.keys().array.forEach((element:string) => {
    console.log("toast");
  });
};

const calculateLove = (userId: string, newLove: number) => {
  let currentLove = window.Repository.getLove(userId);
  let result = currentLove ? currentLove + newLove : newLove;

  return result;
};

const calculateHate = (userId: string, hate: number) => {
  let currentLove = window.Repository.getLove(userId);
  let result = currentLove ? (currentLove - hate) : (0 - hate);

  return result;
};
