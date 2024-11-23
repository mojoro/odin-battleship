class Renderer {
  constructor(playerOneElements, playerTwoElements, introScreenElements) {
    this.playerOneElements = playerOneElements;
    this.playerTwoElements = playerTwoElements;
    this.introScreenElements = introScreenElements;
    this.winScreen = document.querySelector(".win-screen");
    this.directionHandlers = {
      up: {
        highlight: highlightUp,
        dragImage: dragImageUp,
      },
      down: {
        highlight: highlightDown,
        dragImage: dragImageDown,
      },
      left: {
        highlight: highlightLeft,
        dragImage: dragImageLeft,
      },
      right: {
        highlight: highlightRight,
        dragImage: dragImageRight,
      },
    };
  }

  introScreen() {
    const introScreen = this.introScreenElements.page;
    const logoText = document.createElement("h1");
    logoText.id = "logo-text";
    logoText.textContent = "BATTLESHIP";
    introScreen.appendChild(logoText);

    const mainLogo = document.createElement("img");
    mainLogo.id = "main-logo";
    mainLogo.src = "media/main-logo.svg";
    mainLogo.alt = "Vector image of a battleship";
    introScreen.appendChild(mainLogo);

    const introGrid = document.createElement("div");
    introGrid.className = "intro-grid";

    const playerOptions1 = document.createElement("div");
    playerOptions1.className = "player-options";

    const inputWrapper1 = document.createElement("div");
    inputWrapper1.className = "input-wrapper";

    const label1 = document.createElement("label");
    label1.htmlFor = "name1";
    label1.textContent = "Player One Name";
    inputWrapper1.appendChild(label1);

    const input1 = document.createElement("input");
    this.introScreenElements.input1 = input1;
    input1.type = "text";
    input1.name = "name1";
    input1.id = "name1";
    inputWrapper1.appendChild(input1);

    playerOptions1.appendChild(inputWrapper1);

    const inputWrapper2 = document.createElement("div");
    inputWrapper2.className = "input-wrapper";

    const label2 = document.createElement("label");
    label2.htmlFor = "player-type1";
    label2.textContent = "Select Player One Type";
    inputWrapper2.appendChild(label2);

    const select1 = document.createElement("select");
    this.introScreenElements.select1 = select1;
    select1.name = "player-type1";
    select1.id = "player-type1";

    const option1 = document.createElement("option");
    option1.value = "human";
    option1.textContent = "Human";
    select1.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = "computer";
    option2.textContent = "Computer";
    select1.appendChild(option2);

    inputWrapper2.appendChild(select1);
    playerOptions1.appendChild(inputWrapper2);
    introGrid.appendChild(playerOptions1);

    const playerOptions2 = document.createElement("div");
    playerOptions2.className = "player-options";

    const inputWrapper3 = document.createElement("div");
    inputWrapper3.className = "input-wrapper";

    const label3 = document.createElement("label");
    label3.htmlFor = "name2";
    label3.textContent = "Player Two Name";
    inputWrapper3.appendChild(label3);

    const input2 = document.createElement("input");
    this.introScreenElements.input2 = input2;
    input2.type = "text";
    input2.name = "name2";
    input2.id = "name2";
    inputWrapper3.appendChild(input2);

    playerOptions2.appendChild(inputWrapper3);

    const inputWrapper4 = document.createElement("div");
    inputWrapper4.className = "input-wrapper";

    const label4 = document.createElement("label");
    label4.htmlFor = "player-type2";
    label4.textContent = "Select Player Two Type";
    inputWrapper4.appendChild(label4);

    const select2 = document.createElement("select");
    this.introScreenElements.select2 = select2;
    select2.name = "player-type2";
    select2.id = "player-type2";

    const option3 = document.createElement("option");
    option3.value = "human";
    option3.textContent = "Human";
    select2.appendChild(option3);

    const option4 = document.createElement("option");
    option4.value = "computer";
    option4.textContent = "Computer";
    select2.appendChild(option4);

    inputWrapper4.appendChild(select2);
    playerOptions2.appendChild(inputWrapper4);
    introGrid.appendChild(playerOptions2);

    const button = document.createElement("button");
    this.introScreenElements.button = button;
    button.classList = "text-button";
    button.textContent = "Choose your layout!";
    introGrid.appendChild(button);

    introScreen.appendChild(introGrid);
  }

  clearIntro() {
    this.introScreenElements.page.innerHTML = "";
  }

  shipSelection(player) {
    const boardWrapper = document.createElement("div");
    boardWrapper.classList = "board-wrapper";
    boardWrapper.id = "player1-preview";
    const playerName = document.createElement("div");
    playerName.classList = "player-name";
    playerName.textContent = player.name;
    boardWrapper.appendChild(playerName);
    const boardElement = document.createElement("div");
    boardElement.classList = "board";
    boardWrapper.appendChild(boardElement);

    const randomizePlacementButton = document.createElement("button");
    randomizePlacementButton.textContent = "Randomize Placement";
    randomizePlacementButton.classList = "text-button";
    randomizePlacementButton.addEventListener("click", () => {
      player.gameboard.randomizeShipPlacement();
      this.clearIntro();
      this.shipSelection(player);
      this.renderEditableBoard(boardElement, player.gameboard.board);
    });

    this.introScreenElements.page.appendChild(boardWrapper);
    this.introScreenElements.page.appendChild(randomizePlacementButton);

    for (let x = 0; x < player.gameboard.board.length; x++) {
      for (let y = 0; y < player.gameboard.board[x].length; y++) {
        const cell = document.createElement("div");
        cell.id = `${x}${y}`;

        if (player.gameboard.board[x][y].ship) {
          cell.setAttribute("draggable", "true");
          cell.addEventListener("dragstart", (event) => {
            player.gameboard.movingShip = player.gameboard.board[x][y].ship;
            dragCell(
              event,
              player.gameboard,
              player.gameboard.board[x][y].ship
            );
          });
        }

        let lastTargetCell = null;

        cell.addEventListener("dragover", (event) => {
          event.preventDefault();
          lastTargetCell = event.target;
          const ship = player.gameboard.movingShip;
          const lastID = lastTargetCell.id;
          const targetCoords = [Number(lastID[0]), Number(lastID[1])];
          if (`${ship.coords[0]}` == `${targetCoords}`) return;
          if (ship.direction == "down") ship.direction = "up";
          if (ship.direction == "left") ship.direction = "right";
          player.gameboard.moveShip(ship, ship.direction, targetCoords);
        });

        cell.addEventListener("dragend", (event) => {
          if (player.gameboard.movingShip.coords.length == 0) {
            const dragCellID = event.target.id;
            const returnCoords = [Number(dragCellID[0]), Number(dragCellID[1])];
            player.gameboard.moveShip(
              player.gameboard.movingShip,
              player.gameboard.movingShip.previousDirection,
              returnCoords
            );
          }
          this.clearIntro();
          this.shipSelection(player);
          this.renderEditableBoard(boardElement, player.gameboard.board);
        });

        cell.addEventListener("mouseover", () => {
          if (player.gameboard.board[x][y].ship)
            this.highlightShip(player.gameboard.board[x][y].ship);
        });

        cell.addEventListener("mouseleave", () => {
          if (player.gameboard.board[x][y].ship)
            this.renderEditableBoard(boardElement, player.gameboard.board);
        });

        if (player.gameboard.board[x][y].ship) {
          cell.addEventListener("click", (e) => {
            player.gameboard.rotatingShip = player.gameboard.board[x][y].ship;
            const rotationButton = document.createElement("button");
            rotationButton.id = "rotation-button";
            rotationButton.addEventListener("click", () => {
              player.gameboard.rotateShip(player.gameboard.rotatingShip);
              this.clearIntro();
              this.shipSelection(player);
              this.renderEditableBoard(boardElement, player.gameboard.board);
            });
            cell.appendChild(rotationButton);
          });
        }
        boardElement.appendChild(cell);
      }
    }
    this.renderEditableBoard(boardElement, player.gameboard.board);
  }

  setText(element, content) {
    element.textContent = content;
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
          let status = currentPlayer.gameboard.board[x][y].status;
          if (status == "untouched") {
            currentPlayer.gameboard.receiveAttack([x, y]);
            this.switchTurn();
            this.renderBoard(
              currentBoardElement,
              currentPlayer.gameboard.board
            );
          }
          if (currentPlayer.type == "computer" && status == "untouched") {
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

  renderEditableBoard(boardElement, board) {
    let currentCell = boardElement.firstElementChild;
    for (let x = 0; x < board.length; x++) {
      for (let y = 0; y < board[x].length; y++) {
        if (board[x][y].ship) currentCell.classList = "cell occupied";
        else currentCell.classList = "cell";
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

  highlightShip(ship) {
    const coords = ship.coords;

    for (let i = 0; i < coords.length; i++) {
      let x = coords[i][0];
      let y = coords[i][1];
      const currentCell = document.getElementById(`${x}${y}`);
      this.directionHandlers[ship.direction].highlight(
        currentCell,
        i,
        coords.length
      );
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

function dragCell(event, gameboard, ship) {
  const dragImage = constructDragImage(ship);
  document.body.appendChild(dragImage);
  event.dataTransfer.setDragImage(dragImage, 10, 10);
  event.target.classList.add("dragging");
  setTimeout(() => {
    document.body.removeChild(dragImage);
  }, 0);
}

// call moveShip with ship and direction to the starting coords derived from target cell.

function highlightLeft(currentCell, index, length) {
  if (index == 0) {
    currentCell.classList = "cell occupied bottom-vert";
  } else if (index == length - 1)
    currentCell.classList = "cell occupied top-vert";
  else currentCell.classList = "cell occupied inner-vert";
}

function highlightRight(currentCell, index, length) {
  if (index == 0) {
    currentCell.classList = "cell occupied top-vert";
  } else if (index == length - 1)
    currentCell.classList = "cell occupied bottom-vert";
  else currentCell.classList = "cell occupied inner-vert";
}

function highlightUp(currentCell, index, length) {
  if (index == 0) {
    currentCell.classList = "cell occupied left-hori";
  } else if (index == length - 1)
    currentCell.classList = "cell occupied right-hori";
  else currentCell.classList = "cell occupied inner-hori";
}

function highlightDown(currentCell, index, length) {
  if (index == 0) {
    currentCell.classList = "cell occupied right-hori";
  } else if (index == length - 1)
    currentCell.classList = "cell occupied left-hori";
  else currentCell.classList = "cell occupied inner-hori";
}

// build dragImage based on ship coordinates and direction
function constructDragImage(ship) {
  const dragImage = document.createElement("div");
  dragImage.style.display = "grid";
  if (ship.direction == "up" || ship.direction == "down")
    dragImage.style.gridTemplateColumns = `repeat(${ship.size}, 1fr)`;
  if (ship.direction == "left" || ship.direction == "right")
    dragImage.style.gridTemplateRows = `repeat(${ship.size}, 1fr)`;

  dragImage.style.maxWidth = "min-content";
  const cellRect = document.querySelector(".cell").getBoundingClientRect();

  for (let i = 0; i < ship.size; i++) {
    const dragCell = document.createElement("div");
    dragCell.classList = "cell occupied";
    dragCell.style.width = `${cellRect.width}px`;
    dragCell.style.height = `${cellRect.height}px`;
    dragCell.style.backgroundColor = `var(--secondary-background-color)`;
    dragImage.appendChild(dragCell);
  }
  return dragImage;
}

function dragImageLeft() {}
function dragImageRight() {}
function dragImageUp() {}
function dragImageDown() {}
export { Renderer };
