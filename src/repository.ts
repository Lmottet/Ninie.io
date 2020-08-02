export class Repository {
  userLove: Map<string, number>;

  constructor() {
    this.userLove = new Map();
  }

  addLove = (user: string, loveLevel: number) => {
    this.userLove.set(user, this.calculateFeels(user, loveLevel));

    console.log(JSON.stringify(this.userLove));
  };

  removeLove = (user: string, loveLevel: number) => {
    this.userLove.set(user, this.calculateFeels(user, loveLevel));

    console.log(JSON.stringify(this.userLove));
  };

  calculateFeels = (user: string, newLove: number) => {
    let currentLove = this.userLove.get(user);
    return currentLove ? currentLove + newLove : newLove;
  };
}
