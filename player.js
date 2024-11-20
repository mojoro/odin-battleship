import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";

class Player {
  constructor(playerType, name) {
    this.type = playerType;
    this.name = name;
    this.gameboard = new Gameboard();
    this.gameboard.placeShip(new Ship(4), "up", [0, 0]);
  }

  receiveComputerMove() {
    const firstCoord =
      Math.floor(Math.random() * 100) % (this.gameboard.length - 1);
    const secondCoord =
      Math.floor(Math.random() * 100) % (this.gameboard.length - 1);
    if (this.gameboard.board[firstCoord][secondCoord].status == "untouched") {
      this.gameboard.receiveAttack([firstCoord, secondCoord]);
      return [firstCoord, secondCoord];
    }
    return this.receiveComputerMove();
  }
}

export { Player };
