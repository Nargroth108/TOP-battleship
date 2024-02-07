/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GameBoard)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/ship.js");

function GameBoard() {
  const randomNumber = number => Math.floor(Math.random() * number);
  const board = new Array(10).fill("o").map(() => new Array(10).fill("o"));
  const carrier = (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])("carrier", 5);
  const battleship = (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])("battleship", 4);
  const cruiser = (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])("cruiser", 3);
  const submarine = (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])("submarine", 3);
  const destroyer = (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])("destroyer", 2);
  const ships = [carrier, battleship, cruiser, submarine, destroyer];
  const fleet = [];
  function placeShipX(ship, y, x) {
    // console.log(`psX: ${ship.getName()}; ${y}, ${x}`);
    const length = ship.getLength();
    const position = [];
    if (board[y][x + length] === undefined) return;
    for (let i = 0; i < length; i++) {
      if (board[y][x + i] === "o") position.push([y, x + i]);else break;
    }
    if (position.length === length) {
      while (position[0]) {
        const [a, b] = position.pop();
        board[a][b] = ship.getName();
      }
      fleet.push(ship);
    }
  }
  function placeShipY(ship, y, x) {
    // console.log(`psY: ${ship.getName()}; ${y}, ${x}`);
    const length = ship.getLength();
    const position = [];
    if (board[y + length] === undefined) return;
    for (let i = 0; i < length; i++) {
      if (board[y + i][x] === "o") {
        position.push([y + i, x]);
      } else break;
    }
    if (position.length === length) {
      while (position[0]) {
        const [a, b] = position.pop();
        board[a][b] = ship.getName();
      }
      fleet.push(ship);
    }
  }
  (function placeShips() {
    let fleetCount = 0;
    ships.forEach(ship => {
      //   console.log(board);
      while (fleet.length !== fleetCount + 1) {
        if (randomNumber(2) === 1) {
          placeShipX(ship, randomNumber(10), randomNumber(10));
        } else {
          placeShipY(ship, randomNumber(10), randomNumber(10));
        }
      }
      fleetCount += 1;
    });
  })();
  let wasAttackSuccesful = false;
  const getWasAttackSuccesful = () => wasAttackSuccesful;
  function receiveAttack(y, x) {
    const value = board[y][x];
    if (value === "o") {
      board[y][x] = "x";
      wasAttackSuccesful = true;
    } else if (value === "x" || value.endsWith("Shot")) {
      console.log("dupe shot");
      wasAttackSuccesful = false;
    } else {
      const ship = fleet.filter(thisShip => thisShip.getName() === value)[0];
      ship.hit();
      board[y][x] = `${value}Shot`;
      if (ship.getSunk() === true) {
        const index = fleet.indexOf(ship);
        fleet.splice(index, 1);
      }
      wasAttackSuccesful = true;
    }
  }
  function allSunk() {
    if (fleet.length === 0) return true;
    return false;
  }
  return {
    board,
    receiveAttack,
    allSunk,
    getWasAttackSuccesful,
    randomNumber
  };
}

/***/ }),

/***/ "./src/helper.js":
/*!***********************!*\
  !*** ./src/helper.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createCells: () => (/* binding */ createCells),
/* harmony export */   createMap: () => (/* binding */ createMap),
/* harmony export */   removePageElements: () => (/* binding */ removePageElements)
/* harmony export */ });
const BOARD_SIZE = 10;
function removePageElements() {
  const BODY = document.querySelector("body");
  while (BODY.lastChild) BODY.lastChild.remove();
}
function createLettersSection() {
  const letterContainer = document.createElement("div");
  letterContainer.classList = "letter-container";
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  letters.forEach(element => {
    const letter = document.createElement("div");
    letter.className = "letter";
    letter.textContent = element;
    letterContainer.appendChild(letter);
  });
  return letterContainer;
}
function createNumbersSection() {
  const numberContainer = document.createElement("div");
  numberContainer.id = "number-container";
  numberContainer.classList = "number-container";
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  numbers.forEach(element => {
    const number = document.createElement("div");
    number.classList = "number";
    number.textContent = element;
    numberContainer.appendChild(number);
  });
  return numberContainer;
}
function clearCells(grid) {
  while (grid.lastChild) grid.lastChild.remove();
}
function createCells(grid, gameBoard, boardType) {
  clearCells(grid);
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.y = i;
      cell.dataset.x = j;
      const cellValue = (() => {
        if (gameBoard[i][j] === "o") return "";
        if (gameBoard[i][j] === "x") return "X";
        if (gameBoard[i][j].endsWith("Shot")) return "☠";
        if (boardType === "bot") return "";
        return "🚢";
      })();
      cell.innerText = cellValue;
      grid.appendChild(cell);
    }
  }
}
function createGrid(description, gameBoard, boardType) {
  const grid = document.createElement("div");
  grid.id = `cell-container-${description}`;
  grid.className = `cell-container`;
  createCells(grid, gameBoard, boardType);
  return grid;
}
function createTitle(description) {
  const title = document.createElement("div");
  title.classList.add("map-title");
  title.innerText = description;
  return title;
}
function createMap(description, gameBoard, boardType) {
  const map = document.createElement("div");
  map.id = `board-${description}`;
  map.classList.add("board", description);
  map.appendChild(createLettersSection());
  map.appendChild(createNumbersSection());
  map.appendChild(createGrid(description, gameBoard, boardType));
  map.appendChild(createTitle(description));
  return map;
}


/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");

function Player(playerName, playerType) {
  const name = playerName;
  const type = playerType;
  const gameBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])();
  const getName = () => name;
  const getType = () => type;
  function playBotTurn(enemyBoard) {
    const randomNumber = number => Math.floor(Math.random() * number);
    enemyBoard.receiveAttack(randomNumber(10), randomNumber(10));
  }
  return {
    gameBoard,
    getName,
    getType,
    playBotTurn
  };
}

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Ship)
/* harmony export */ });
function Ship(shipName, shipLength) {
  const name = shipName;
  const length = shipLength;
  let numberOfHits = 0;
  let isSunk = false;
  const coordinates = [];
  const getName = () => name;
  const getLength = () => length;
  const getHits = () => numberOfHits;
  const getSunk = () => isSunk;
  function sinkShip() {
    isSunk = true;
  }
  function hit() {
    numberOfHits += 1;
    if (numberOfHits === length) sinkShip();
  }
  return {
    coordinates,
    getLength,
    getName,
    getSunk,
    getHits,
    hit
  };
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helper */ "./src/helper.js");
// import GameBoard from "./gameboard";


function playTurn(player, opponent, playerDisplayTable, opponentDisplayTable) {
  const playerGrid = playerDisplayTable.querySelector(".cell-container");
  const opponentGrid = opponentDisplayTable.querySelector(".cell-container");
  const opponentCells = opponentDisplayTable.querySelectorAll(".cell");
  opponentCells.forEach(cell => {
    cell.addEventListener("click", () => {
      const {
        x
      } = cell.dataset;
      const {
        y
      } = cell.dataset;
      opponent.gameBoard.receiveAttack(y, x);
      (0,_helper__WEBPACK_IMPORTED_MODULE_1__.createCells)(opponentGrid, opponent.gameBoard.board, "bot");
      if (opponent.gameBoard.getWasAttackSuccesful()) {
        if (opponent.gameBoard.allSunk() === true) {
          console.log("gg, bot ded");
        } else {
          opponent.playBotTurn(player.gameBoard);
          (0,_helper__WEBPACK_IMPORTED_MODULE_1__.createCells)(playerGrid, player.gameBoard.board, "player");
          if (player.gameBoard.getWasAttackSuccesful()) {
            if (player.gameBoard.allSunk()) {
              console.log("rip you ded");
            } else {
              playTurn(player, opponent, playerDisplayTable, opponentDisplayTable);
            }
          } else {
            console.log("dupe attack bruh bot");
            playTurn(player, opponent, playerDisplayTable, opponentDisplayTable);
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
  const bot = (0,_player__WEBPACK_IMPORTED_MODULE_0__["default"])("AI", "bot");
  const player = newPlayer;
  const BODY = document.querySelector("body");
  const playerDisplayTable = (0,_helper__WEBPACK_IMPORTED_MODULE_1__.createMap)("Friendly-Waters", player.gameBoard.board, "player");
  const botDisplayTable = (0,_helper__WEBPACK_IMPORTED_MODULE_1__.createMap)("Enemy-Waters", bot.gameBoard.board, "bot");
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
  button.addEventListener("click", e => {
    e.preventDefault();
    if (!input.value) return;
    const player = (0,_player__WEBPACK_IMPORTED_MODULE_0__["default"])(input.value, "human");
    (0,_helper__WEBPACK_IMPORTED_MODULE_1__.removePageElements)();
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
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQ1IsZ0JBQWdCLENBQUMsT0FBTyxFQUFHUyxDQUFDLElBQUs7SUFDdENBLENBQUMsQ0FBQ0MsY0FBYyxDQUFDLENBQUM7SUFFbEIsSUFBSSxDQUFDSCxLQUFLLENBQUNoRixLQUFLLEVBQUU7SUFFbEIsTUFBTWlFLE1BQU0sR0FBR2hCLG1EQUFNLENBQUMrQixLQUFLLENBQUNoRixLQUFLLEVBQUUsT0FBTyxDQUFDO0lBRTNDYSwyREFBa0IsQ0FBQyxDQUFDO0lBRXBCNkQsY0FBYyxDQUFDVCxNQUFNLENBQUM7RUFDeEIsQ0FBQyxDQUFDO0FBQ0o7QUFFQWEsYUFBYSxDQUFDLENBQUM7O0FBRWY7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90ZXN0Ly4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly90ZXN0Ly4vc3JjL2hlbHBlci5qcyIsIndlYnBhY2s6Ly90ZXN0Ly4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly90ZXN0Ly4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vdGVzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90ZXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90ZXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdGVzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3Rlc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBHYW1lQm9hcmQoKSB7XG4gIGNvbnN0IHJhbmRvbU51bWJlciA9IChudW1iZXIpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG51bWJlcik7XG5cbiAgY29uc3QgYm9hcmQgPSBuZXcgQXJyYXkoMTApLmZpbGwoXCJvXCIpLm1hcCgoKSA9PiBuZXcgQXJyYXkoMTApLmZpbGwoXCJvXCIpKTtcblxuICBjb25zdCBjYXJyaWVyID0gU2hpcChcImNhcnJpZXJcIiwgNSk7XG4gIGNvbnN0IGJhdHRsZXNoaXAgPSBTaGlwKFwiYmF0dGxlc2hpcFwiLCA0KTtcbiAgY29uc3QgY3J1aXNlciA9IFNoaXAoXCJjcnVpc2VyXCIsIDMpO1xuICBjb25zdCBzdWJtYXJpbmUgPSBTaGlwKFwic3VibWFyaW5lXCIsIDMpO1xuICBjb25zdCBkZXN0cm95ZXIgPSBTaGlwKFwiZGVzdHJveWVyXCIsIDIpO1xuXG4gIGNvbnN0IHNoaXBzID0gW2NhcnJpZXIsIGJhdHRsZXNoaXAsIGNydWlzZXIsIHN1Ym1hcmluZSwgZGVzdHJveWVyXTtcbiAgY29uc3QgZmxlZXQgPSBbXTtcblxuICBmdW5jdGlvbiBwbGFjZVNoaXBYKHNoaXAsIHksIHgpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhgcHNYOiAke3NoaXAuZ2V0TmFtZSgpfTsgJHt5fSwgJHt4fWApO1xuICAgIGNvbnN0IGxlbmd0aCA9IHNoaXAuZ2V0TGVuZ3RoKCk7XG4gICAgY29uc3QgcG9zaXRpb24gPSBbXTtcblxuICAgIGlmIChib2FyZFt5XVt4ICsgbGVuZ3RoXSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoYm9hcmRbeV1beCArIGldID09PSBcIm9cIikgcG9zaXRpb24ucHVzaChbeSwgeCArIGldKTtcbiAgICAgIGVsc2UgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKHBvc2l0aW9uLmxlbmd0aCA9PT0gbGVuZ3RoKSB7XG4gICAgICB3aGlsZSAocG9zaXRpb25bMF0pIHtcbiAgICAgICAgY29uc3QgW2EsIGJdID0gcG9zaXRpb24ucG9wKCk7XG4gICAgICAgIGJvYXJkW2FdW2JdID0gc2hpcC5nZXROYW1lKCk7XG4gICAgICB9XG4gICAgICBmbGVldC5wdXNoKHNoaXApO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBsYWNlU2hpcFkoc2hpcCwgeSwgeCkge1xuICAgIC8vIGNvbnNvbGUubG9nKGBwc1k6ICR7c2hpcC5nZXROYW1lKCl9OyAke3l9LCAke3h9YCk7XG4gICAgY29uc3QgbGVuZ3RoID0gc2hpcC5nZXRMZW5ndGgoKTtcbiAgICBjb25zdCBwb3NpdGlvbiA9IFtdO1xuXG4gICAgaWYgKGJvYXJkW3kgKyBsZW5ndGhdID09PSB1bmRlZmluZWQpIHJldHVybjtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChib2FyZFt5ICsgaV1beF0gPT09IFwib1wiKSB7XG4gICAgICAgIHBvc2l0aW9uLnB1c2goW3kgKyBpLCB4XSk7XG4gICAgICB9IGVsc2UgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKHBvc2l0aW9uLmxlbmd0aCA9PT0gbGVuZ3RoKSB7XG4gICAgICB3aGlsZSAocG9zaXRpb25bMF0pIHtcbiAgICAgICAgY29uc3QgW2EsIGJdID0gcG9zaXRpb24ucG9wKCk7XG4gICAgICAgIGJvYXJkW2FdW2JdID0gc2hpcC5nZXROYW1lKCk7XG4gICAgICB9XG4gICAgICBmbGVldC5wdXNoKHNoaXApO1xuICAgIH1cbiAgfVxuXG4gIChmdW5jdGlvbiBwbGFjZVNoaXBzKCkge1xuICAgIGxldCBmbGVldENvdW50ID0gMDtcbiAgICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICAvLyAgIGNvbnNvbGUubG9nKGJvYXJkKTtcbiAgICAgIHdoaWxlIChmbGVldC5sZW5ndGggIT09IGZsZWV0Q291bnQgKyAxKSB7XG4gICAgICAgIGlmIChyYW5kb21OdW1iZXIoMikgPT09IDEpIHtcbiAgICAgICAgICBwbGFjZVNoaXBYKHNoaXAsIHJhbmRvbU51bWJlcigxMCksIHJhbmRvbU51bWJlcigxMCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBsYWNlU2hpcFkoc2hpcCwgcmFuZG9tTnVtYmVyKDEwKSwgcmFuZG9tTnVtYmVyKDEwKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZsZWV0Q291bnQgKz0gMTtcbiAgICB9KTtcbiAgfSkoKTtcblxuICBsZXQgd2FzQXR0YWNrU3VjY2VzZnVsID0gZmFsc2U7XG4gIGNvbnN0IGdldFdhc0F0dGFja1N1Y2Nlc2Z1bCA9ICgpID0+IHdhc0F0dGFja1N1Y2Nlc2Z1bDtcblxuICBmdW5jdGlvbiByZWNlaXZlQXR0YWNrKHksIHgpIHtcbiAgICBjb25zdCB2YWx1ZSA9IGJvYXJkW3ldW3hdO1xuXG4gICAgaWYgKHZhbHVlID09PSBcIm9cIikge1xuICAgICAgYm9hcmRbeV1beF0gPSBcInhcIjtcbiAgICAgIHdhc0F0dGFja1N1Y2Nlc2Z1bCA9IHRydWU7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gXCJ4XCIgfHwgdmFsdWUuZW5kc1dpdGgoXCJTaG90XCIpKSB7XG4gICAgICBjb25zb2xlLmxvZyhcImR1cGUgc2hvdFwiKTtcbiAgICAgIHdhc0F0dGFja1N1Y2Nlc2Z1bCA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzaGlwID0gZmxlZXQuZmlsdGVyKCh0aGlzU2hpcCkgPT4gdGhpc1NoaXAuZ2V0TmFtZSgpID09PSB2YWx1ZSlbMF07XG4gICAgICBzaGlwLmhpdCgpO1xuICAgICAgYm9hcmRbeV1beF0gPSBgJHt2YWx1ZX1TaG90YDtcblxuICAgICAgaWYgKHNoaXAuZ2V0U3VuaygpID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gZmxlZXQuaW5kZXhPZihzaGlwKTtcbiAgICAgICAgZmxlZXQuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cblxuICAgICAgd2FzQXR0YWNrU3VjY2VzZnVsID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBhbGxTdW5rKCkge1xuICAgIGlmIChmbGVldC5sZW5ndGggPT09IDApIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB7IGJvYXJkLCByZWNlaXZlQXR0YWNrLCBhbGxTdW5rLCBnZXRXYXNBdHRhY2tTdWNjZXNmdWwsIHJhbmRvbU51bWJlciB9O1xufVxuIiwiY29uc3QgQk9BUkRfU0laRSA9IDEwO1xuXG5mdW5jdGlvbiByZW1vdmVQYWdlRWxlbWVudHMoKSB7XG4gIGNvbnN0IEJPRFkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcblxuICB3aGlsZSAoQk9EWS5sYXN0Q2hpbGQpIEJPRFkubGFzdENoaWxkLnJlbW92ZSgpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMZXR0ZXJzU2VjdGlvbigpIHtcbiAgY29uc3QgbGV0dGVyQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbGV0dGVyQ29udGFpbmVyLmNsYXNzTGlzdCA9IFwibGV0dGVyLWNvbnRhaW5lclwiO1xuICBjb25zdCBsZXR0ZXJzID0gW1wiQVwiLCBcIkJcIiwgXCJDXCIsIFwiRFwiLCBcIkVcIiwgXCJGXCIsIFwiR1wiLCBcIkhcIiwgXCJJXCIsIFwiSlwiXTtcblxuICBsZXR0ZXJzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICBjb25zdCBsZXR0ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGxldHRlci5jbGFzc05hbWUgPSBcImxldHRlclwiO1xuICAgIGxldHRlci50ZXh0Q29udGVudCA9IGVsZW1lbnQ7XG4gICAgbGV0dGVyQ29udGFpbmVyLmFwcGVuZENoaWxkKGxldHRlcik7XG4gIH0pO1xuXG4gIHJldHVybiBsZXR0ZXJDb250YWluZXI7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU51bWJlcnNTZWN0aW9uKCkge1xuICBjb25zdCBudW1iZXJDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBudW1iZXJDb250YWluZXIuaWQgPSBcIm51bWJlci1jb250YWluZXJcIjtcbiAgbnVtYmVyQ29udGFpbmVyLmNsYXNzTGlzdCA9IFwibnVtYmVyLWNvbnRhaW5lclwiO1xuICBjb25zdCBudW1iZXJzID0gWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwXTtcblxuICBudW1iZXJzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICBjb25zdCBudW1iZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIG51bWJlci5jbGFzc0xpc3QgPSBcIm51bWJlclwiO1xuICAgIG51bWJlci50ZXh0Q29udGVudCA9IGVsZW1lbnQ7XG4gICAgbnVtYmVyQ29udGFpbmVyLmFwcGVuZENoaWxkKG51bWJlcik7XG4gIH0pO1xuXG4gIHJldHVybiBudW1iZXJDb250YWluZXI7XG59XG5cbmZ1bmN0aW9uIGNsZWFyQ2VsbHMoZ3JpZCkge1xuICB3aGlsZSAoZ3JpZC5sYXN0Q2hpbGQpIGdyaWQubGFzdENoaWxkLnJlbW92ZSgpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDZWxscyhncmlkLCBnYW1lQm9hcmQsIGJvYXJkVHlwZSkge1xuICBjbGVhckNlbGxzKGdyaWQpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgQk9BUkRfU0laRTsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBCT0FSRF9TSVpFOyBqKyspIHtcbiAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgY2VsbC5jbGFzc05hbWUgPSBcImNlbGxcIjtcbiAgICAgIGNlbGwuZGF0YXNldC55ID0gaTtcbiAgICAgIGNlbGwuZGF0YXNldC54ID0gajtcbiAgICAgIGNvbnN0IGNlbGxWYWx1ZSA9ICgoKSA9PiB7XG4gICAgICAgIGlmIChnYW1lQm9hcmRbaV1bal0gPT09IFwib1wiKSByZXR1cm4gXCJcIjtcbiAgICAgICAgaWYgKGdhbWVCb2FyZFtpXVtqXSA9PT0gXCJ4XCIpIHJldHVybiBcIlhcIjtcbiAgICAgICAgaWYgKGdhbWVCb2FyZFtpXVtqXS5lbmRzV2l0aChcIlNob3RcIikpIHJldHVybiBcIuKYoFwiO1xuICAgICAgICBpZiAoYm9hcmRUeXBlID09PSBcImJvdFwiKSByZXR1cm4gXCJcIjtcbiAgICAgICAgcmV0dXJuIFwi8J+aolwiO1xuICAgICAgfSkoKTtcbiAgICAgIGNlbGwuaW5uZXJUZXh0ID0gY2VsbFZhbHVlO1xuICAgICAgZ3JpZC5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlR3JpZChkZXNjcmlwdGlvbiwgZ2FtZUJvYXJkLCBib2FyZFR5cGUpIHtcbiAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGdyaWQuaWQgPSBgY2VsbC1jb250YWluZXItJHtkZXNjcmlwdGlvbn1gO1xuICBncmlkLmNsYXNzTmFtZSA9IGBjZWxsLWNvbnRhaW5lcmA7XG5cbiAgY3JlYXRlQ2VsbHMoZ3JpZCwgZ2FtZUJvYXJkLCBib2FyZFR5cGUpO1xuXG4gIHJldHVybiBncmlkO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVUaXRsZShkZXNjcmlwdGlvbikge1xuICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHRpdGxlLmNsYXNzTGlzdC5hZGQoXCJtYXAtdGl0bGVcIik7XG4gIHRpdGxlLmlubmVyVGV4dCA9IGRlc2NyaXB0aW9uO1xuICByZXR1cm4gdGl0bGU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU1hcChkZXNjcmlwdGlvbiwgZ2FtZUJvYXJkLCBib2FyZFR5cGUpIHtcbiAgY29uc3QgbWFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbWFwLmlkID0gYGJvYXJkLSR7ZGVzY3JpcHRpb259YDtcbiAgbWFwLmNsYXNzTGlzdC5hZGQoXCJib2FyZFwiLCBkZXNjcmlwdGlvbik7XG5cbiAgbWFwLmFwcGVuZENoaWxkKGNyZWF0ZUxldHRlcnNTZWN0aW9uKCkpO1xuICBtYXAuYXBwZW5kQ2hpbGQoY3JlYXRlTnVtYmVyc1NlY3Rpb24oKSk7XG4gIG1hcC5hcHBlbmRDaGlsZChjcmVhdGVHcmlkKGRlc2NyaXB0aW9uLCBnYW1lQm9hcmQsIGJvYXJkVHlwZSkpO1xuICBtYXAuYXBwZW5kQ2hpbGQoY3JlYXRlVGl0bGUoZGVzY3JpcHRpb24pKTtcblxuICByZXR1cm4gbWFwO1xufVxuXG5leHBvcnQgeyBjcmVhdGVDZWxscywgY3JlYXRlTWFwLCByZW1vdmVQYWdlRWxlbWVudHMgfTtcbiIsImltcG9ydCBHYW1lQm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFBsYXllcihwbGF5ZXJOYW1lLCBwbGF5ZXJUeXBlKSB7XG4gIGNvbnN0IG5hbWUgPSBwbGF5ZXJOYW1lO1xuICBjb25zdCB0eXBlID0gcGxheWVyVHlwZTtcblxuICBjb25zdCBnYW1lQm9hcmQgPSBHYW1lQm9hcmQoKTtcblxuICBjb25zdCBnZXROYW1lID0gKCkgPT4gbmFtZTtcbiAgY29uc3QgZ2V0VHlwZSA9ICgpID0+IHR5cGU7XG5cbiAgZnVuY3Rpb24gcGxheUJvdFR1cm4oZW5lbXlCb2FyZCkge1xuICAgIGNvbnN0IHJhbmRvbU51bWJlciA9IChudW1iZXIpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG51bWJlcik7XG5cbiAgICBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2socmFuZG9tTnVtYmVyKDEwKSwgcmFuZG9tTnVtYmVyKDEwKSk7XG4gIH1cblxuICByZXR1cm4geyBnYW1lQm9hcmQsIGdldE5hbWUsIGdldFR5cGUsIHBsYXlCb3RUdXJuIH07XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTaGlwKHNoaXBOYW1lLCBzaGlwTGVuZ3RoKSB7XG4gIGNvbnN0IG5hbWUgPSBzaGlwTmFtZTtcbiAgY29uc3QgbGVuZ3RoID0gc2hpcExlbmd0aDtcbiAgbGV0IG51bWJlck9mSGl0cyA9IDA7XG4gIGxldCBpc1N1bmsgPSBmYWxzZTtcbiAgY29uc3QgY29vcmRpbmF0ZXMgPSBbXTtcblxuICBjb25zdCBnZXROYW1lID0gKCkgPT4gbmFtZTtcbiAgY29uc3QgZ2V0TGVuZ3RoID0gKCkgPT4gbGVuZ3RoO1xuICBjb25zdCBnZXRIaXRzID0gKCkgPT4gbnVtYmVyT2ZIaXRzO1xuICBjb25zdCBnZXRTdW5rID0gKCkgPT4gaXNTdW5rO1xuXG4gIGZ1bmN0aW9uIHNpbmtTaGlwKCkge1xuICAgIGlzU3VuayA9IHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiBoaXQoKSB7XG4gICAgbnVtYmVyT2ZIaXRzICs9IDE7XG4gICAgaWYgKG51bWJlck9mSGl0cyA9PT0gbGVuZ3RoKSBzaW5rU2hpcCgpO1xuICB9XG5cbiAgcmV0dXJuIHsgY29vcmRpbmF0ZXMsIGdldExlbmd0aCwgZ2V0TmFtZSwgZ2V0U3VuaywgZ2V0SGl0cywgaGl0IH07XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIGltcG9ydCBHYW1lQm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IHsgY3JlYXRlQ2VsbHMsIGNyZWF0ZU1hcCwgcmVtb3ZlUGFnZUVsZW1lbnRzIH0gZnJvbSBcIi4vaGVscGVyXCI7XG5cbmZ1bmN0aW9uIHBsYXlUdXJuKHBsYXllciwgb3Bwb25lbnQsIHBsYXllckRpc3BsYXlUYWJsZSwgb3Bwb25lbnREaXNwbGF5VGFibGUpIHtcbiAgY29uc3QgcGxheWVyR3JpZCA9IHBsYXllckRpc3BsYXlUYWJsZS5xdWVyeVNlbGVjdG9yKFwiLmNlbGwtY29udGFpbmVyXCIpO1xuICBjb25zdCBvcHBvbmVudEdyaWQgPSBvcHBvbmVudERpc3BsYXlUYWJsZS5xdWVyeVNlbGVjdG9yKFwiLmNlbGwtY29udGFpbmVyXCIpO1xuXG4gIGNvbnN0IG9wcG9uZW50Q2VsbHMgPSBvcHBvbmVudERpc3BsYXlUYWJsZS5xdWVyeVNlbGVjdG9yQWxsKFwiLmNlbGxcIik7XG4gIG9wcG9uZW50Q2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IHsgeCB9ID0gY2VsbC5kYXRhc2V0O1xuICAgICAgY29uc3QgeyB5IH0gPSBjZWxsLmRhdGFzZXQ7XG5cbiAgICAgIG9wcG9uZW50LmdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKHksIHgpO1xuICAgICAgY3JlYXRlQ2VsbHMob3Bwb25lbnRHcmlkLCBvcHBvbmVudC5nYW1lQm9hcmQuYm9hcmQsIFwiYm90XCIpO1xuXG4gICAgICBpZiAob3Bwb25lbnQuZ2FtZUJvYXJkLmdldFdhc0F0dGFja1N1Y2Nlc2Z1bCgpKSB7XG4gICAgICAgIGlmIChvcHBvbmVudC5nYW1lQm9hcmQuYWxsU3VuaygpID09PSB0cnVlKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJnZywgYm90IGRlZFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvcHBvbmVudC5wbGF5Qm90VHVybihwbGF5ZXIuZ2FtZUJvYXJkKTtcbiAgICAgICAgICBjcmVhdGVDZWxscyhwbGF5ZXJHcmlkLCBwbGF5ZXIuZ2FtZUJvYXJkLmJvYXJkLCBcInBsYXllclwiKTtcblxuICAgICAgICAgIGlmIChwbGF5ZXIuZ2FtZUJvYXJkLmdldFdhc0F0dGFja1N1Y2Nlc2Z1bCgpKSB7XG4gICAgICAgICAgICBpZiAocGxheWVyLmdhbWVCb2FyZC5hbGxTdW5rKCkpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyaXAgeW91IGRlZFwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHBsYXlUdXJuKFxuICAgICAgICAgICAgICAgIHBsYXllcixcbiAgICAgICAgICAgICAgICBvcHBvbmVudCxcbiAgICAgICAgICAgICAgICBwbGF5ZXJEaXNwbGF5VGFibGUsXG4gICAgICAgICAgICAgICAgb3Bwb25lbnREaXNwbGF5VGFibGUsXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZHVwZSBhdHRhY2sgYnJ1aCBib3RcIik7XG4gICAgICAgICAgICBwbGF5VHVybihcbiAgICAgICAgICAgICAgcGxheWVyLFxuICAgICAgICAgICAgICBvcHBvbmVudCxcbiAgICAgICAgICAgICAgcGxheWVyRGlzcGxheVRhYmxlLFxuICAgICAgICAgICAgICBvcHBvbmVudERpc3BsYXlUYWJsZSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhcImR1cGUgYXR0YWNrIGJydWhcIik7XG4gICAgICAgIHBsYXlUdXJuKHBsYXllciwgb3Bwb25lbnQsIHBsYXllckRpc3BsYXlUYWJsZSwgb3Bwb25lbnREaXNwbGF5VGFibGUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gbG9hZFNlY29uZFBhZ2UobmV3UGxheWVyKSB7XG4gIGNvbnN0IGJvdCA9IFBsYXllcihcIkFJXCIsIFwiYm90XCIpO1xuICBjb25zdCBwbGF5ZXIgPSBuZXdQbGF5ZXI7XG5cbiAgY29uc3QgQk9EWSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xuXG4gIGNvbnN0IHBsYXllckRpc3BsYXlUYWJsZSA9IGNyZWF0ZU1hcChcbiAgICBcIkZyaWVuZGx5LVdhdGVyc1wiLFxuICAgIHBsYXllci5nYW1lQm9hcmQuYm9hcmQsXG4gICAgXCJwbGF5ZXJcIixcbiAgKTtcbiAgY29uc3QgYm90RGlzcGxheVRhYmxlID0gY3JlYXRlTWFwKFwiRW5lbXktV2F0ZXJzXCIsIGJvdC5nYW1lQm9hcmQuYm9hcmQsIFwiYm90XCIpO1xuXG4gIEJPRFkuYXBwZW5kQ2hpbGQocGxheWVyRGlzcGxheVRhYmxlKTtcbiAgQk9EWS5hcHBlbmRDaGlsZChib3REaXNwbGF5VGFibGUpO1xuXG4gIHBsYXlUdXJuKHBsYXllciwgYm90LCBwbGF5ZXJEaXNwbGF5VGFibGUsIGJvdERpc3BsYXlUYWJsZSk7XG5cbiAgLy8gICBvcHBvbmVudC5nYW1lQm9hcmQucmVjZWl2ZUF0dGFjayhbeSwgeF0pO1xuICAvLyAgIGlmIChvcHBvbmVudC5nYW1lQm9hcmQuZ2V0V2FzQXR0YWNrU3VjY2VzZnVsKCkpIHtcbiAgLy8gICAgIGNvbnNvbGUubG9nKG9wcG9uZW50LmdhbWVCb2FyZC5hbGxTdW5rKCkpO1xuICAvLyAgICAgaWYgKG9wcG9uZW50LmdhbWVCb2FyZC5hbGxTdW5rKCkpIHtcbiAgLy8gICAgICAgY29uc29sZS5sb2coXCJnZ1wiKTtcbiAgLy8gICAgIH0gZWxzZSB7XG4gIC8vICAgICAgIHN3aXRjaE9wcG9uZW50KCk7XG4gIC8vICAgICAgIHR1cm4oKTtcbiAgLy8gICAgIH1cbiAgLy8gICB9IGVsc2Uge1xuICAvLyAgICAgY29uc29sZS5sb2coXCJtaXNzZWQgbG9sXCIpO1xuICAvLyAgICAgdHVybigpO1xuICAvLyAgIH1cbiAgLy8gfVxufVxuXG5mdW5jdGlvbiBsb2FkRmlyc3RQYWdlKCkge1xuICBjb25zdCBCT0RZID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG5cbiAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpO1xuICBmb3JtLmNsYXNzTGlzdC5hZGQoXCJmaXJzdC1mb3JtXCIpO1xuICBCT0RZLmFwcGVuZENoaWxkKGZvcm0pO1xuXG4gIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICBpbnB1dC52YWx1ZSA9IFwiUGxheWVyXCI7XG4gIGZvcm0uYXBwZW5kQ2hpbGQoaW5wdXQpO1xuXG4gIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZmlyc3QtYnV0dG9uXCIpO1xuICBidXR0b24uaW5uZXJUZXh0ID0gXCJDcmVhdGUgUGxheWVyXCI7XG4gIGZvcm0uYXBwZW5kQ2hpbGQoYnV0dG9uKTtcblxuICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgaWYgKCFpbnB1dC52YWx1ZSkgcmV0dXJuO1xuXG4gICAgY29uc3QgcGxheWVyID0gUGxheWVyKGlucHV0LnZhbHVlLCBcImh1bWFuXCIpO1xuXG4gICAgcmVtb3ZlUGFnZUVsZW1lbnRzKCk7XG5cbiAgICBsb2FkU2Vjb25kUGFnZShwbGF5ZXIpO1xuICB9KTtcbn1cblxubG9hZEZpcnN0UGFnZSgpO1xuXG4vLyBjb25zdCBwbGF5ZXJPbmUgPSBQbGF5ZXIoXCJOYXJncm90aFwiLCBcImh1bWFuXCIpO1xuLy8gY29uc29sZS5sb2cocGxheWVyT25lKTtcblxuLy8gY29uc3QgcGxheWVyVHdvID0gUGxheWVyKFwiYm90XCIsIFwiY29tcHV0ZXJcIik7XG5cbi8vIGxldCBvcHBvbmVudCA9IHBsYXllclR3bztcblxuLy8gZnVuY3Rpb24gc3dpdGNoT3Bwb25lbnQoKSB7XG4vLyAgIGlmIChvcHBvbmVudCA9PT0gcGxheWVyT25lKSBvcHBvbmVudCA9IHBsYXllclR3bztcbi8vICAgZWxzZSBvcHBvbmVudCA9IHBsYXllck9uZTtcbi8vIH1cblxuLy8gZnVuY3Rpb24gdHVybigpIHtcbi8vICAgY29uc29sZS50YWJsZShwbGF5ZXJPbmUuZ2FtZUJvYXJkLmJvYXJkKTtcbi8vICAgY29uc29sZS50YWJsZShwbGF5ZXJUd28uZ2FtZUJvYXJkLmJvYXJkKTtcblxuLy8gICBjb25zdCB5ID0gcHJvbXB0KGB5LCBhZ2FpbnN0ICR7b3Bwb25lbnQuZ2V0TmFtZSgpfWApO1xuLy8gICBjb25zdCB4ID0gcHJvbXB0KGB4LCBhZ2FpbnN0ICR7b3Bwb25lbnQuZ2V0TmFtZSgpfWApO1xuXG4vLyAgIG9wcG9uZW50LmdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKFt5LCB4XSk7XG4vLyAgIGlmIChvcHBvbmVudC5nYW1lQm9hcmQuZ2V0V2FzQXR0YWNrU3VjY2VzZnVsKCkpIHtcbi8vICAgICBjb25zb2xlLmxvZyhvcHBvbmVudC5nYW1lQm9hcmQuYWxsU3VuaygpKTtcbi8vICAgICBpZiAob3Bwb25lbnQuZ2FtZUJvYXJkLmFsbFN1bmsoKSkge1xuLy8gICAgICAgY29uc29sZS5sb2coXCJnZ1wiKTtcbi8vICAgICB9IGVsc2Uge1xuLy8gICAgICAgc3dpdGNoT3Bwb25lbnQoKTtcbi8vICAgICAgIHR1cm4oKTtcbi8vICAgICB9XG4vLyAgIH0gZWxzZSB7XG4vLyAgICAgY29uc29sZS5sb2coXCJtaXNzZWQgbG9sXCIpO1xuLy8gICAgIHR1cm4oKTtcbi8vICAgfVxuLy8gfVxuXG4vLyB0dXJuKCk7XG4iXSwibmFtZXMiOlsiU2hpcCIsIkdhbWVCb2FyZCIsInJhbmRvbU51bWJlciIsIm51bWJlciIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImJvYXJkIiwiQXJyYXkiLCJmaWxsIiwibWFwIiwiY2FycmllciIsImJhdHRsZXNoaXAiLCJjcnVpc2VyIiwic3VibWFyaW5lIiwiZGVzdHJveWVyIiwic2hpcHMiLCJmbGVldCIsInBsYWNlU2hpcFgiLCJzaGlwIiwieSIsIngiLCJsZW5ndGgiLCJnZXRMZW5ndGgiLCJwb3NpdGlvbiIsInVuZGVmaW5lZCIsImkiLCJwdXNoIiwiYSIsImIiLCJwb3AiLCJnZXROYW1lIiwicGxhY2VTaGlwWSIsInBsYWNlU2hpcHMiLCJmbGVldENvdW50IiwiZm9yRWFjaCIsIndhc0F0dGFja1N1Y2Nlc2Z1bCIsImdldFdhc0F0dGFja1N1Y2Nlc2Z1bCIsInJlY2VpdmVBdHRhY2siLCJ2YWx1ZSIsImVuZHNXaXRoIiwiY29uc29sZSIsImxvZyIsImZpbHRlciIsInRoaXNTaGlwIiwiaGl0IiwiZ2V0U3VuayIsImluZGV4IiwiaW5kZXhPZiIsInNwbGljZSIsImFsbFN1bmsiLCJCT0FSRF9TSVpFIiwicmVtb3ZlUGFnZUVsZW1lbnRzIiwiQk9EWSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImxhc3RDaGlsZCIsInJlbW92ZSIsImNyZWF0ZUxldHRlcnNTZWN0aW9uIiwibGV0dGVyQ29udGFpbmVyIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImxldHRlcnMiLCJlbGVtZW50IiwibGV0dGVyIiwiY2xhc3NOYW1lIiwidGV4dENvbnRlbnQiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZU51bWJlcnNTZWN0aW9uIiwibnVtYmVyQ29udGFpbmVyIiwiaWQiLCJudW1iZXJzIiwiY2xlYXJDZWxscyIsImdyaWQiLCJjcmVhdGVDZWxscyIsImdhbWVCb2FyZCIsImJvYXJkVHlwZSIsImoiLCJjZWxsIiwiZGF0YXNldCIsImNlbGxWYWx1ZSIsImlubmVyVGV4dCIsImNyZWF0ZUdyaWQiLCJkZXNjcmlwdGlvbiIsImNyZWF0ZVRpdGxlIiwidGl0bGUiLCJhZGQiLCJjcmVhdGVNYXAiLCJQbGF5ZXIiLCJwbGF5ZXJOYW1lIiwicGxheWVyVHlwZSIsIm5hbWUiLCJ0eXBlIiwiZ2V0VHlwZSIsInBsYXlCb3RUdXJuIiwiZW5lbXlCb2FyZCIsInNoaXBOYW1lIiwic2hpcExlbmd0aCIsIm51bWJlck9mSGl0cyIsImlzU3VuayIsImNvb3JkaW5hdGVzIiwiZ2V0SGl0cyIsInNpbmtTaGlwIiwicGxheVR1cm4iLCJwbGF5ZXIiLCJvcHBvbmVudCIsInBsYXllckRpc3BsYXlUYWJsZSIsIm9wcG9uZW50RGlzcGxheVRhYmxlIiwicGxheWVyR3JpZCIsIm9wcG9uZW50R3JpZCIsIm9wcG9uZW50Q2VsbHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiYWRkRXZlbnRMaXN0ZW5lciIsImxvYWRTZWNvbmRQYWdlIiwibmV3UGxheWVyIiwiYm90IiwiYm90RGlzcGxheVRhYmxlIiwibG9hZEZpcnN0UGFnZSIsImZvcm0iLCJpbnB1dCIsImJ1dHRvbiIsImUiLCJwcmV2ZW50RGVmYXVsdCJdLCJzb3VyY2VSb290IjoiIn0=