// import GameBoard from "./gameboard";
import Player from "./player";
import { createCells, createMap, removePageElements } from "./helper";

function playTurn(player, opponent, playerDisplayTable, opponentDisplayTable) {
  const playerGrid = playerDisplayTable.querySelector(".cell-container");
  const opponentGrid = opponentDisplayTable.querySelector(".cell-container");

  const opponentCells = opponentDisplayTable.querySelectorAll(".cell");
  opponentCells.forEach((cell) => {
    cell.addEventListener("click", () => {
      const { x } = cell.dataset;
      const { y } = cell.dataset;

      opponent.gameBoard.receiveAttack(y, x);
      createCells(opponentGrid, opponent.gameBoard.board, "bot");

      if (opponent.gameBoard.getWasAttackSuccesful()) {
        if (opponent.gameBoard.allSunk() === true) {
          console.log("gg, bot ded");
        } else {
          opponent.playBotTurn(player.gameBoard);
          createCells(playerGrid, player.gameBoard.board, "player");

          if (player.gameBoard.getWasAttackSuccesful()) {
            if (player.gameBoard.allSunk()) {
              console.log("rip you ded");
            } else {
              playTurn(
                player,
                opponent,
                playerDisplayTable,
                opponentDisplayTable,
              );
            }
          } else {
            console.log("dupe attack bruh bot");
            playTurn(
              player,
              opponent,
              playerDisplayTable,
              opponentDisplayTable,
            );
          }
        }
      } else {
        console.log("dupe attack bruh");
        playTurn(player, opponent, playerDisplayTable, opponentDisplayTable);
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

  playTurn(player, bot, playerDisplayTable, botDisplayTable);

  //   opponent.gameBoard.receiveAttack([y, x]);
  //   if (opponent.gameBoard.getWasAttackSuccesful()) {
  //     console.log(opponent.gameBoard.allSunk());
  //     if (opponent.gameBoard.allSunk()) {
  //       console.log("gg");
  //     } else {
  //       switchOpponent();
  //       turn();
  //     }
  //   } else {
  //     console.log("missed lol");
  //     turn();
  //   }
  // }
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

// const playerOne = Player("Nargroth", "human");
// console.log(playerOne);

// const playerTwo = Player("bot", "computer");

// let opponent = playerTwo;

// function switchOpponent() {
//   if (opponent === playerOne) opponent = playerTwo;
//   else opponent = playerOne;
// }

// function turn() {
//   console.table(playerOne.gameBoard.board);
//   console.table(playerTwo.gameBoard.board);

//   const y = prompt(`y, against ${opponent.getName()}`);
//   const x = prompt(`x, against ${opponent.getName()}`);

//   opponent.gameBoard.receiveAttack([y, x]);
//   if (opponent.gameBoard.getWasAttackSuccesful()) {
//     console.log(opponent.gameBoard.allSunk());
//     if (opponent.gameBoard.allSunk()) {
//       console.log("gg");
//     } else {
//       switchOpponent();
//       turn();
//     }
//   } else {
//     console.log("missed lol");
//     turn();
//   }
// }

// turn();
