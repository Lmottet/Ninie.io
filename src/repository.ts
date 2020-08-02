export class Repository {
  userLove: Map<string, number>;

  constructor() {
    this.userLove = new Map();
  }

  addLove = (user: string, loveLevel: number) => {
    console.log("Add " + loveLevel + " love to " + user);
    this.userLove.set(user, this.calculateFeels(user, loveLevel));

    console.log(JSON.stringify(this.userLove));
  };

  removeLove = (user: string, loveLevel: number) => {
    console.log("Remove " + loveLevel + " love from " + user);
    this.userLove.set(user, this.calculateFeels(user, loveLevel));

    console.log(JSON.stringify(this.userLove));
  };

  calculateFeels = (user: string, newLove: number) => {
    let currentLove = this.userLove.get(user);
    let result = currentLove ? currentLove + newLove : newLove;
    console.log("Calculated love : " + result);
    return result;
  };
}
