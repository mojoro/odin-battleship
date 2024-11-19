import { Gameboard } from "./gameboard.js";
import { Renderer } from "./dom.js";
/**
  const playerOne = { wrapper: document.getElementById("player1") };
  playerOne.name = playerOne.wrapper.firstElementChild;
  
  playerOne.name.textContent = "John";
*/
const render = new Renderer();
render.setName(1, "John");
