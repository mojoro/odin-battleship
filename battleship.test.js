import { Ship } from "./ship";
import { Gameboard } from "./gameboard";

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
