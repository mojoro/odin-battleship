class Renderer {
  constructor() {
    this.playerOne = {};
    this.playerOne.wrapper = document.getElementById("player1");
    this.playerOne.name = this.playerOne.wrapper.firstElementChild;
    this.playerTwo = {};
    this.playerTwo.wrapper = document.getElementById("player2");
    this.playerTwo.name = this.playerTwo.wrapper.firstElementChild;
  }

  setName(player, name) {
    if (player == 1) this.playerOne.name.textContent = name;
    else if (player == 2) this.playerTwo.name.textContent = name;
  }
}

export { Renderer };
