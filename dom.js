class Renderer {
  constructor(playerOneElements, playerTwoElements, playerOne, playerTwo) {
    this.playerOneElements = playerOneElements;
    this.playerTwoElements = playerTwoElements;
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.winScreen = document.querySelector(".win-screen");
  }

  setText(element, name) {
    element.textContent = name;
  }

  initialRender(boardElement, player) {
    boardElement.innerHTML = "";
    for (let x = 0; x < player.gameboard.board.length; x++) {
      for (let y = 0; y < player.gameboard.board[x].length; y++) {
        const cell = document.createElement("div");
        cell.addEventListener("click", () => {
          if (player.gameboard.board[x][y].status == "untouched")
            this.switchTurn();
          player.gameboard.receiveAttack([x, y]);
          this.renderBoard(boardElement, player.gameboard.board);
          this.evaluateWin(player);
        });
        boardElement.appendChild(cell);
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

  // refactor this it is so ugly
  evaluateWin() {
    if (
      !this.playerOne.gameboard.allSunk() &&
      !this.playerTwo.gameboard.allSunk()
    )
      return;
    if (this.playerOne.gameboard.allSunk()) {
      this.winScreen.firstElementChild.firstElementChild.textContent = `${this.playerTwo.name} wins!`;
      this.winScreen.firstElementChild.lastElementChild.addEventListener(
        "click",
        () => {}
      );
      this.winScreen.id = "";
    } else if (this.playerTwo.gameboard.allSunk()) {
      this.winScreen.firstElementChild.firstElementChild.textContent = `${this.playerOne.name} wins!`;
      this.winScreen.firstElementChild.lastElementChild.addEventListener(
        "click",
        () => {}
      );
      this.winScreen.id = "";
    }
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
