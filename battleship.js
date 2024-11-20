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
const introScreenElements = {};
introScreenElements.page = document.getElementById("intro-screen");

const render = new Renderer(
  playerOneElements,
  playerTwoElements,
  introScreenElements
);

render.introScreen();

introScreenElements.button.addEventListener("click", () => {
  const name1 = introScreenElements.input1.value;
  const name2 = introScreenElements.input2.value;
  const type1 = introScreenElements.select1.value;
  const type2 = introScreenElements.select2.value;

  const playerOne = new Player(type1, name1);
  const playerTwo = new Player(type2, name2);

  render.clearIntro();
  render.shipSelection(playerOne);
});

function beginGame(playerOne, playerTwo) {
  document.querySelector(".win-screen").id = "inactive";
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

//beginGame();
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
