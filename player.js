import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";

class Player {
  constructor(playerType) {
    this.type = playerType;
    this.gameboard = new Gameboard();
    this.gameboard.placeShip(new Ship(4), "up", [0, 0]);
    this.gameboard.placeShip(new Ship(2), "left", [5, 0]);
    this.gameboard.placeShip(new Ship(6), "right", [3, 1]);
    this.gameboard.placeShip(new Ship(3), "down", [8, 7]);
  }
}

export { Player };
