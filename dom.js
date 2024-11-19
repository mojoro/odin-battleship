class Renderer {
  constructor() {}

  setText(element, name) {
    element.textContent = name;
  }

  initialRender(boardElement, player) {
    boardElement.innerHTML = "";
    for (let x = 0; x < player.gameboard.board.length; x++) {
      for (let y = 0; y < player.gameboard.board[x].length; y++) {
        const cell = document.createElement("div");
        cell.addEventListener("click", () => {
          player.gameboard.receiveAttack([x, y]);
          this.renderBoard(boardElement, player.gameboard.board);
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
