import { Ship } from "./ship";
import { Gameboard } from "./gameboard";
import { Player } from "./player";

test("Ship sinks after fully hit", () => {
  const testShip = new Ship(5);
  testShip.hit().hit().hit().hit().hit();
  expect(testShip.isSunk()).toBeTruthy();
});

test("Ship is not sunk initially", () => {
  const testShip = new Ship(5);
  expect(testShip.isSunk()).toBeFalsy();
});

test("Gameboard is 10x10", () => {
  const testBoard = new Gameboard();
  expect(testBoard.board.length && testBoard.board[0].length).toBe(10);
});

test("Gameboard can generate ships", () => {
  const testBoard = new Gameboard();
  testBoard.generateShips();
  expect(Array.isArray(testBoard.ships)).toBeTruthy();
  expect(testBoard.ships.length).toBeGreaterThan(0);
});

test("Gameboard can place ships", () => {
  const testShip = new Ship(5);
  const testBoard = new Gameboard();
  testBoard.removeShipsFromBoard();
  testBoard.placeShip(testShip, "up", [4, 4]);
  expect(
    testBoard.board[4][4].ship &&
      testBoard.board[4][5].ship &&
      testBoard.board[4][6].ship &&
      testBoard.board[4][7].ship &&
      testBoard.board[4][8].ship
  ).toBe(testShip);
});

test("Gameboard can move ships", () => {
  const testShip = new Ship(5);
  const testBoard = new Gameboard();
  testBoard.removeShipsFromBoard();
  testBoard.placeShip(testShip, "up", [4, 4]);
  testBoard.moveShip(testShip, "down", [4, 4]);
  expect(
    testBoard.board[4][4].ship &&
      testBoard.board[4][3].ship &&
      testBoard.board[4][2].ship &&
      testBoard.board[4][1].ship &&
      testBoard.board[4][0].ship
  ).toBe(testShip);
});

test("Gameboard won't place ships on top of each other", () => {
  const testShip1 = new Ship(5);
  const testBoard = new Gameboard();
  const testShip2 = new Ship(3);
  testBoard.removeShipsFromBoard();

  testBoard.placeShip(testShip1, "up", [4, 4]);
  expect(() => testBoard.placeShip(testShip2, "up", [4, 4])).toThrow();
});

test("Gameboard can distribute ships randomly on the board", () => {
  const testBoard = new Gameboard();
  testBoard.randomizeShipPlacement();
  let hasCoords = true;
  let occupiedCoords = [];
  for (const ship of testBoard.ships) {
    if (ship.size != ship.coords.length) hasCoords = false;
    for (const coord of ship.coords) {
      if (occupiedCoords.some((element) => `${element}` == `${coord}`))
        hasCoords = false;
      else occupiedCoords.push(coord);
    }
  }
  expect(hasCoords).toBeTruthy();
});

test("Gameboard records hits", () => {
  const testShip = new Ship(3);
  const testBoard = new Gameboard();
  testBoard.removeShipsFromBoard();
  testBoard.placeShip(testShip, "down", [4, 4]);
  testBoard.receiveAttack([4, 4]);
  expect(testBoard.board[4][4].status).toBe("hit");
});

test("Gameboard records misses", () => {
  const testShip = new Ship(3);
  const testBoard = new Gameboard();
  testBoard.removeShipsFromBoard();
  testBoard.placeShip(testShip, "down", [4, 4]);
  testBoard.receiveAttack([4, 5]);
  expect(testBoard.board[4][5].status).toBe("miss");
});

test("Gameboard detects when all ships are sunk", () => {
  const testShip = new Ship(3);
  const testBoard = new Gameboard();
  const testShip2 = new Ship(5);
  testBoard.removeShipsFromBoard();
  testBoard.ships = [];
  testBoard.placeShip(testShip2, "up", [4, 4]);
  testBoard.placeShip(testShip, "down", [4, 3]);
  testBoard.receiveAttack([4, 3]).receiveAttack([4, 2]).receiveAttack([4, 1]);
  testBoard
    .receiveAttack([4, 4])
    .receiveAttack([4, 5])
    .receiveAttack([4, 6])
    .receiveAttack([4, 7])
    .receiveAttack([4, 8]);
  expect(testBoard.allSunk()).toBeTruthy();
});

test("Gameboard passes direction to ship appropriately", () => {
  const testBoard = new Gameboard();
  const testShip = new Ship();
  testBoard.removeShipsFromBoard();
  testBoard.placeShip(testShip, "up", [4, 4]);
  expect(testShip.direction).toBe("up");
});

test("Player has two types", () => {
  const player1 = new Player("human");
  const player2 = new Player("computer");
  expect(player1.type).toBe("human");
  expect(player2.type).toBe("computer");
});

test("Players have gameboards", () => {
  const player1 = new Player("human");
  const player2 = new Player("computer");
  expect(player1.gameboard).toBeTruthy();
  expect(player2.gameboard).toBeTruthy();
});

for (let i = 0; i < 20; i++) {
  test("Players can generate valid random attacks", () => {
    const player = new Player("computer");
    const sentCoords = player.receiveComputerMove();
    expect(sentCoords[0] && sentCoords[1]).toBeGreaterThanOrEqual(0);
    expect(sentCoords[0] && sentCoords[1]).toBeLessThanOrEqual(
      player.gameboard.length - 1
    );
  });
}

test("Player gameboard updates after receiveComputerMove()", () => {
  const player = new Player("computer");
  const sentCoords = player.receiveComputerMove();
  const [x, y] = sentCoords;
  expect(player.gameboard.board[x][y].status).not.toBe("untouched");
});

test("Player receiveComputerMove() does not double sent moves", () => {
  const player = new Player("computer");
  const sentCoords = player.receiveComputerMove();
  const secondSentCoords = player.receiveComputerMove();

  expect(`${secondSentCoords}`).not.toBe(`${sentCoords}`);
});
