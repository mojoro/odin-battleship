import { Ship } from "./ship.js";
class Node {
  constructor(ship = null, status = "untouched") {
    (this.ship = ship), (this.status = status);
  }
}
/* Board visualized
[
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
*/
class Gameboard {
  constructor() {
    this.board = [];
    for (let i = 0; i < 10; i++) {
      let column = [];
      for (let j = 0; j < 10; j++) {
        column.push(new Node());
      }
      this.board.push(column);
    }
    this.ships = [];
    this.generateShips();
    this.length = this.board.length;
    this.randomizeShipPlacement();
    this.movingShip = null;
    this.rotatingShip = null;
  }

  generateShips() {
    const shipSizes = [5, 4, 3, 3, 2];
    for (const size of shipSizes) {
      const ship = new Ship(size);
      this.ships.push(ship);
    }
    return this.ships;
  }

  randomizeShipPlacement() {
    const directions = ["up", "down", "left", "right"];
    for (const ship of this.ships) {
      let placed = false;
      while (!placed) {
        placed = this.randomizeShipHelper(ship, directions);
      }
    }
  }

  randomizeShipHelper(ship, directions) {
    let firstCoord = Math.floor(Math.random() * this.length);
    let secondCoord = Math.floor(Math.random() * this.length);
    let directionChoice = Math.floor(Math.random() * 4);
    let direction = directions[directionChoice];
    let startingCoords = [firstCoord, secondCoord];
    return this.moveShip(ship, direction, startingCoords);
  }

  placeShip(ship, direction, startingCoords) {
    if (!this.moveShip(ship, direction, startingCoords))
      throw new Error(
        "Placement failed due to occupied starting point, invalid coordinate, or collision"
      );
    this.ships.push(ship);
    return this;
  }

  moveShip(ship, direction, startingCoords) {
    if (ship.coords.length > 0) this.removeShipFromBoard(ship);
    if (!isValidCoord(startingCoords)) return false;
    if (checkOccupied(this, startingCoords)) return false;
    if (direction == null) direction = ship.previousDirection;

    let coordsArray = [startingCoords];
    for (let i = 0; i < ship.size - 1; i++) {
      let nextCoords = getAdjacentCoords(direction, coordsArray[i]);
      if (!isValidCoord(nextCoords)) return false;
      if (checkOccupied(this, nextCoords)) return false;
      coordsArray.push(nextCoords);
    }

    for (const coord of coordsArray) {
      ship.addCoords(coord);
      this.setCoords(coord, ship);
    }
    ship.addDirection(direction);
    return true;
  }

  rotateShip(ship) {
    let direction;
    if (ship.direction) direction = ship.direction;
    else direction = ship.previousDirection;
    if (direction == "up") direction = "right";
    else if (direction == "right") direction = "down";
    else if (direction == "down") direction = "left";
    else if (direction == "left") direction = "up";

    if (!this.moveShip(ship, direction, ship.coords[0])) {
      this.moveShip(ship, ship.previousDirection, ship.previousCoords[0]);
    }
  }

  setCoords(coords, value) {
    if (typeof value == "object") this.board[coords[0]][coords[1]].ship = value;
    if (typeof value == "string")
      this.board[coords[0]][coords[1]].status = value;
    return this;
  }

  removeShipFromBoard(ship) {
    for (let i = 0; i < ship.coords.length; i++) {
      let x = ship.coords[i][0];
      let y = ship.coords[i][1];
      this.board[x][y].ship = null;
    }
    ship.clearCoords();
    ship.clearDirection();
  }

  removeShipsFromBoard() {
    for (const ship of this.ships) {
      this.removeShipFromBoard(ship);
    }
  }

  receiveAttack(coords) {
    if (!isValidCoord) throw new Error("Invalid coordinates!");
    const status = checkOccupied(this, coords) ? "hit" : "miss";
    this.setCoords(coords, status);
    if (status == "hit") this.board[coords[0]][coords[1]].ship.hit();
    return this;
  }

  allSunk() {
    let shipsSunk = true;
    for (const ship of this.ships) {
      if (!ship.isSunk()) shipsSunk = false;
    }
    return shipsSunk;
  }
}

function isValidCoord(coords) {
  if (0 <= coords[0] && coords[0] <= 9 && 0 <= coords[1] && coords[1] <= 9)
    return true;
  else return false;
}

function getAdjacentCoords(direction, coords) {
  switch (direction) {
    case "up":
      return [coords[0], coords[1] + 1];

    case "right":
      return [coords[0] + 1, coords[1]];

    case "down":
      return [coords[0], coords[1] - 1];

    case "left":
      return [coords[0] - 1, coords[1]];
  }
}

function checkOccupied(Gameboard, coords) {
  if (Gameboard.board[coords[0]][coords[1]].ship) return true;
  else return false;
}

export { Gameboard };
