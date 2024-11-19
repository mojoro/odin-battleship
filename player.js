import { Gameboard } from "./gameboard";

class Player {
  constructor(playerType) {
    this.type = playerType;
    this.gameboard = new Gameboard();
  }
}

export { Player };
