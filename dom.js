class Renderer {
  constructor(playerOneElements, playerTwoElements) {
    this.playerOneElements = playerOneElements;
    this.playerTwoElements = playerTwoElements;
    this.winScreen = document.querySelector(".win-screen");
  }

  setText(element, name) {
    element.textContent = name;
  }

  resetBoards() {
    this.playerOneElements.board.remove();
    this.playerOneElements.board = document.createElement("div");
    this.playerOneElements.board.classList.add("board", "awaiting-turn");
    this.playerTwoElements.board.remove();
    this.playerTwoElements.board = document.createElement("div");
    this.playerTwoElements.board.classList.add("board");
    this.playerOneElements.wrapper.appendChild(this.playerOneElements.board);
    this.playerTwoElements.wrapper.appendChild(this.playerTwoElements.board);
  }

  initialRender(
    currentBoardElement,
    opponentBoardElement,
    currentPlayer,
    opponentPlayer
  ) {
    for (let x = 0; x < currentPlayer.gameboard.board.length; x++) {
      for (let y = 0; y < currentPlayer.gameboard.board[x].length; y++) {
        const cell = document.createElement("div");
        cell.addEventListener("click", () => {
          if (currentPlayer.gameboard.board[x][y].status == "untouched") {
            currentPlayer.gameboard.receiveAttack([x, y]);
            this.switchTurn();
            this.renderBoard(
              currentBoardElement,
              currentPlayer.gameboard.board
            );
          }
          if (currentPlayer.type == "computer") {
            opponentPlayer.receiveComputerMove();
            this.switchTurn();
            this.renderBoard(
              opponentBoardElement,
              opponentPlayer.gameboard.board
            );
          }
        });
        currentBoardElement.appendChild(cell);
      }
    }
  }

  renderBoard(boardElement, board) {
    let currentCell = boardElement.firstElementChild;
    for (let x = 0; x < board.length; x++) {
      for (let y = 0; y < board[x].length; y++) {
        currentCell.classList = returnCellClassList(board[x][y]);
        currentCell = currentCell.nextElementSibling;
      }
    }
  }

  switchTurn() {
    this.playerOneElements.wrapper.classList.toggle("active-target");
    this.playerTwoElements.wrapper.classList.toggle("active-target");
    this.playerOneElements.board.classList.toggle("awaiting-turn");
    this.playerTwoElements.board.classList.toggle("awaiting-turn");
  }

  displayWin(winnerName) {
    this.winScreen.firstElementChild.firstElementChild.textContent = `${winnerName} wins!`;
    this.winScreen.id = "";
  }
}

function returnCellClassList(node) {
  switch (node.status) {
    case "untouched":
      return "cell";
    case "hit":
      return "cell hit";
    case "miss":
      return "cell miss";
  }
}

export { Renderer };
