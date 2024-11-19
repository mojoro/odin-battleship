import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";

class Player {
  constructor(playerType, name) {
    this.type = playerType;
    this.name = name;
    this.gameboard = new Gameboard();
    this.gameboard.placeShip(new Ship(4), "up", [0, 0]);
  }
}

export { Player };
