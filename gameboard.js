class Gameboard {
  constructor() {
    this.board = [
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
  }

  placeShip(ship, direction, startingCoords) {
    if (!isValidCoord(startingCoords))
      throw new Error("Invalid starting coordinates!");
    let coordsArray = [startingCoords];
    for (let i = 0; i < ship.size - 1; i++) {
      let nextCoords = getAdjacentCoords(direction, coordsArray[i]);
      if (!isValidCoord(nextCoords))
        throw new Error(
          "Invalid coordinates! Change starting point or direction"
        );
      coordsArray.push(nextCoords);
    }

    for (const coord of coordsArray) {
      this.setCoords(coord, ship);
    }
  }

  setCoords(coords, value) {
    this.board[coords[0]][coords[1]] = value;
    return this;
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

export { Gameboard };
