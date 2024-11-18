import { Ship } from "./ship";

test("Ship sinks after fully hit", () => {
  const testShip = new Ship(5);
  testShip.hit().hit().hit().hit().hit();
  expect(testShip.isSunk()).toBeTruthy();
});
