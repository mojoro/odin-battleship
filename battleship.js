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

function beginGame() {
  document.querySelector(".win-screen").id = "inactive";
  const playerOne = new Player("human", "John");
  const playerTwo = new Player("computer", "Computer");
  render.setText(playerOneElements.name, playerOne.name);
  render.setText(playerTwoElements.name, playerTwo.name);

  render.resetBoards();
  render.initialRender(
    playerOneElements.board,
    playerTwoElements.board,
    playerOne,
    playerTwo
  );
  render.initialRender(
    playerTwoElements.board,
    playerOneElements.board,
    playerTwo,
    playerOne
  );
  render.renderBoard(playerOneElements.board, playerOne.gameboard.board);
  render.renderBoard(playerTwoElements.board, playerTwo.gameboard.board);

  const winCallback = evaluateWin(playerOne, playerTwo);
  const boardElements = [playerOneElements.board, playerTwoElements.board];
  boardElements.forEach((element) =>
    element.addEventListener("click", winCallback)
  );
}

beginGame();
document
  .querySelector(".win-message-wrapper button")
  .addEventListener("click", beginGame);

function evaluateWin(playerOne, playerTwo) {
  let winner = "";
  return function () {
    if (!playerOne.gameboard.allSunk() && !playerTwo.gameboard.allSunk())
      return;
    if (playerOne.gameboard.allSunk()) {
      winner = playerTwo.name;
    } else if (playerTwo.gameboard.allSunk()) {
      winner = playerOne.name;
    }
    render.displayWin(winner);
  };
}

function cellListener(currentPlayer, currentPlayerElement, opponentPlayer) {
  return function () {
    if (currentPlayer.gameboard.board[x][y].status == "untouched") {
      currentPlayer.gameboard.receiveAttack([x, y]);
      render.switchTurn();
      render.renderBoard(currentPlayerElement, currentPlayer.gameboard.board);
    }
  };
}
