export class Repository {
  userLove: Map<string, number>;

  constructor() {
    this.userLove = new Map();
  }

  addLove = (user: string, loveLevel: number) => {
    console.log("Add " + loveLevel + " love to " + user);
    this.userLove.set(user, this.calculateFeels(user, loveLevel));
  };

  removeLove = (user: string, loveLevel: number) => {
    console.log("Remove " + loveLevel + " love from " + user);
    this.userLove.set(user, this.calculateFeels(user, loveLevel));
  };

  calculateFeels = (user: string, newLove: number) => {
    let currentLove = this.userLove.get(user);
    let result = currentLove ? currentLove + newLove : newLove;
    console.log("Calculated total love : " + result + " for : " + user);

    return result;
  };
}
