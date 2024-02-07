import Player from "./player";
import { createCells, createMap, removePageElements } from "./helper";

function gameLoop(player, bot, playerDisplayTable, botDisplayTable) {
  const playerGrid = playerDisplayTable.querySelector(".cell-container");
  const botGrid = botDisplayTable.querySelector(".cell-container");

  const botCells = botDisplayTable.querySelectorAll(".cell");
  botCells.forEach((cell) => {
    cell.addEventListener("click", () => {
      const { x } = cell.dataset;
      const { y } = cell.dataset;

      player.playTurn(bot.gameBoard, y, x);
      createCells(botGrid, bot.gameBoard.board, bot.getType());

      if (bot.gameBoard.getWasAttackSuccesful()) {
        if (bot.gameBoard.allSunk() === true) {
          console.log(`GG, you defeated an extremely dumb AI...`);
        } else {
          bot.playTurn(player.gameBoard, y, x);
          createCells(playerGrid, player.gameBoard.board, player.getType());
          if (player.gameBoard.getWasAttackSuccesful()) {
            if (player.gameBoard.allSunk()) {
              console.log(`Damn, you got beaten by an extremely dumb AI...`);
            } else {
              gameLoop(player, bot, playerDisplayTable, botDisplayTable);
            }
          }
        }
      } else {
        gameLoop(player, bot, playerDisplayTable, botDisplayTable);
      }
    });
  });
}

function loadSecondPage(newPlayer) {
  const bot = Player("AI", "bot");
  const player = newPlayer;

  const BODY = document.querySelector("body");

  const playerDisplayTable = createMap(
    "Friendly-Waters",
    player.gameBoard.board,
    "player",
  );
  const botDisplayTable = createMap("Enemy-Waters", bot.gameBoard.board, "bot");

  BODY.appendChild(playerDisplayTable);
  BODY.appendChild(botDisplayTable);

  gameLoop(player, bot, playerDisplayTable, botDisplayTable);
}

function loadFirstPage() {
  const BODY = document.querySelector("body");

  const form = document.createElement("form");
  form.classList.add("first-form");
  BODY.appendChild(form);

  const input = document.createElement("input");
  input.value = "Player";
  form.appendChild(input);

  const button = document.createElement("button");
  button.classList.add("first-button");
  button.innerText = "Create Player";
  form.appendChild(button);

  button.addEventListener("click", (e) => {
    e.preventDefault();

    if (!input.value) return;

    const player = Player(input.value, "human");

    removePageElements();

    loadSecondPage(player);
  });
}

loadFirstPage();
