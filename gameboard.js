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
    this.length = this.board.length;
  }

  placeShip(ship, direction, startingCoords) {
    if (!isValidCoord(startingCoords))
      throw new Error("Invalid starting coordinates!");
    if (checkOccupied(this, startingCoords))
      throw new Error(`${startingCoords} is occupied!`);

    let coordsArray = [startingCoords];
    for (let i = 0; i < ship.size - 1; i++) {
      let nextCoords = getAdjacentCoords(direction, coordsArray[i]);
      if (!isValidCoord(nextCoords))
        throw new Error(
          "Invalid coordinates! Change starting point or direction"
        );
      if (checkOccupied(this, nextCoords))
        throw new Error(`${startingCoords} is occupied!`);
      coordsArray.push(nextCoords);
    }

    for (const coord of coordsArray) {
      this.setCoords(coord, ship);
    }
    this.ships.push(ship);
    return this;
  }

  setCoords(coords, value) {
    if (typeof value == "object") this.board[coords[0]][coords[1]].ship = value;
    if (typeof value == "string")
      this.board[coords[0]][coords[1]].status = value;
    return this;
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
