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

const render = new Renderer(playerOneElements, playerTwoElements);
render.setText(playerOneElements.name, "John");
render.setText(playerTwoElements.name, "Computer");

const playerOne = new Player("human");
const playerTwo = new Player("computer");

render.initialRender(playerOneElements.board, playerOne);
render.initialRender(playerTwoElements.board, playerTwo);
render.renderBoard(playerOneElements.board, playerOne.gameboard.board);
render.renderBoard(playerTwoElements.board, playerTwo.gameboard.board);
