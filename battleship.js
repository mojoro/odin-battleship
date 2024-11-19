import { Player } from "./player.js";
import { Renderer } from "./dom.js";

const playerOneElements = {};
playerOneElements.wrapper = document.getElementById("player1");
playerOneElements.name = playerOneElements.wrapper.firstElementChild;
playerOneElements.board = playerOneElements.name.nextElementSibling;
const playerTwoElements = {};
playerTwoElements.wrapper = document.getElementById("player2");
playerTwoElements.name = playerTwoElements.wrapper.firstElementChild;
playerTwoElements.board = playerTwoElements.name.nextElementSibling;

const playerOne = new Player("human", "John");
const playerTwo = new Player("computer", "Computer");
const render = new Renderer(
  playerOneElements,
  playerTwoElements,
  playerOne,
  playerTwo
);
render.setText(playerOneElements.name, playerOne.name);
render.setText(playerTwoElements.name, playerTwo.name);

render.initialRender(playerOneElements.board, playerOne);
render.initialRender(playerTwoElements.board, playerTwo);
render.renderBoard(playerOneElements.board, playerOne.gameboard.board);
render.renderBoard(playerTwoElements.board, playerTwo.gameboard.board);
// what if we just have one event listener on the whole thing that evaluates the win condition, then calls the render with the finished logic already done.
// KEEP GAME LOGIC OUT OF RENDER CLASS
