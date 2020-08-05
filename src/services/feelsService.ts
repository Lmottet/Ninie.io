import { Repository } from "../repository.ts";

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
  console.log("rep : " + JSON.stringify(window.Repository));
  console.log("rep un strin : " + window.Repository);
  let y = window.Repository.getAll().keys();
  console.log("y : " + JSON.stringify(y));
};

const calculateLove = (userId: string, newLove: number) => {
  let currentLove = window.Repository.getLove(userId);
  let result = currentLove ? currentLove + newLove : newLove;
  console.log("Calculated total love : " + result + " for : " + userId);

  return result;
};

const calculateHate = (userId: string, hate: number) => {
  let currentLove = window.Repository.getLove(userId);
  let result = currentLove ? (currentLove - hate) : (0 - hate);
  console.log("Calculated total love : " + result + " for : " + userId);

  return result;
};
