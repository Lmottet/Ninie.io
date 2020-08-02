export class Repository {
  userLove: Map<string, number>;

  constructor() {
    this.userLove = new Map();
  }

  getAll = () => {
      this.userLove;
  };

  getLove = (user: string) => {
    let loveLevel = this.userLove.get(user);
    console.log("Retrieved loveLevel " + loveLevel + " for " + user);
    return loveLevel ? loveLevel : 0;
  };

  setLove = (user: string, loveLevel: number) => {
    console.log("Setting " + loveLevel + " loveLevel to " + user);
    this.userLove.set(user, loveLevel);
  };
}
