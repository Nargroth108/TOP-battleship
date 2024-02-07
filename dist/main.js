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
  function playTurn(enemyBoard, y, x) {
    if (getType() === "bot") {
      const randomNumber = number => Math.floor(Math.random() * number);
      enemyBoard.receiveAttack(randomNumber(10), randomNumber(10));
      if (enemyBoard.getWasAttackSuccesful() === false) {
        playTurn(enemyBoard);
      }
    } else {
      enemyBoard.receiveAttack(y, x);
    }
  }
  return {
    gameBoard,
    getName,
    getType,
    playTurn
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


function gameLoop(player, bot, playerDisplayTable, botDisplayTable) {
  const playerGrid = playerDisplayTable.querySelector(".cell-container");
  const botGrid = botDisplayTable.querySelector(".cell-container");
  const botCells = botDisplayTable.querySelectorAll(".cell");
  botCells.forEach(cell => {
    cell.addEventListener("click", () => {
      const {
        x
      } = cell.dataset;
      const {
        y
      } = cell.dataset;
      player.playTurn(bot.gameBoard, y, x);
      (0,_helper__WEBPACK_IMPORTED_MODULE_1__.createCells)(botGrid, bot.gameBoard.board, bot.getType());
      if (bot.gameBoard.getWasAttackSuccesful()) {
        if (bot.gameBoard.allSunk() === true) {
          console.log(`GG, you defeated an extremely dumb AI...`);
        } else {
          bot.playTurn(player.gameBoard, y, x);
          (0,_helper__WEBPACK_IMPORTED_MODULE_1__.createCells)(playerGrid, player.gameBoard.board, player.getType());
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
  const bot = (0,_player__WEBPACK_IMPORTED_MODULE_0__["default"])("AI", "bot");
  const player = newPlayer;
  const BODY = document.querySelector("body");
  const playerDisplayTable = (0,_helper__WEBPACK_IMPORTED_MODULE_1__.createMap)("Friendly-Waters", player.gameBoard.board, "player");
  const botDisplayTable = (0,_helper__WEBPACK_IMPORTED_MODULE_1__.createMap)("Enemy-Waters", bot.gameBoard.board, "bot");
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
  button.addEventListener("click", e => {
    e.preventDefault();
    if (!input.value) return;
    const player = (0,_player__WEBPACK_IMPORTED_MODULE_0__["default"])(input.value, "human");
    (0,_helper__WEBPACK_IMPORTED_MODULE_1__.removePageElements)();
    loadSecondPage(player);
  });
}
loadFirstPage();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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cUQsTUFBTSxDQUFDO0VBRXhCQSxNQUFNLENBQUNSLGdCQUFnQixDQUFDLE9BQU8sRUFBR1MsQ0FBQyxJQUFLO0lBQ3RDQSxDQUFDLENBQUNDLGNBQWMsQ0FBQyxDQUFDO0lBRWxCLElBQUksQ0FBQ0gsS0FBSyxDQUFDOUUsS0FBSyxFQUFFO0lBRWxCLE1BQU0rRCxNQUFNLEdBQUdoQixtREFBTSxDQUFDK0IsS0FBSyxDQUFDOUUsS0FBSyxFQUFFLE9BQU8sQ0FBQztJQUUzQ1csMkRBQWtCLENBQUMsQ0FBQztJQUVwQitELGNBQWMsQ0FBQ1gsTUFBTSxDQUFDO0VBQ3hCLENBQUMsQ0FBQztBQUNKO0FBRUFhLGFBQWEsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90ZXN0Ly4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly90ZXN0Ly4vc3JjL2hlbHBlci5qcyIsIndlYnBhY2s6Ly90ZXN0Ly4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly90ZXN0Ly4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vdGVzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90ZXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90ZXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdGVzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3Rlc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBHYW1lQm9hcmQoKSB7XG4gIGNvbnN0IHJhbmRvbU51bWJlciA9IChudW1iZXIpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG51bWJlcik7XG5cbiAgY29uc3QgYm9hcmQgPSBuZXcgQXJyYXkoMTApLmZpbGwoXCJvXCIpLm1hcCgoKSA9PiBuZXcgQXJyYXkoMTApLmZpbGwoXCJvXCIpKTtcblxuICBjb25zdCBjYXJyaWVyID0gU2hpcChcImNhcnJpZXJcIiwgNSk7XG4gIGNvbnN0IGJhdHRsZXNoaXAgPSBTaGlwKFwiYmF0dGxlc2hpcFwiLCA0KTtcbiAgY29uc3QgY3J1aXNlciA9IFNoaXAoXCJjcnVpc2VyXCIsIDMpO1xuICBjb25zdCBzdWJtYXJpbmUgPSBTaGlwKFwic3VibWFyaW5lXCIsIDMpO1xuICBjb25zdCBkZXN0cm95ZXIgPSBTaGlwKFwiZGVzdHJveWVyXCIsIDIpO1xuXG4gIGNvbnN0IHNoaXBzID0gW2NhcnJpZXIsIGJhdHRsZXNoaXAsIGNydWlzZXIsIHN1Ym1hcmluZSwgZGVzdHJveWVyXTtcbiAgY29uc3QgZmxlZXQgPSBbXTtcblxuICBmdW5jdGlvbiBwbGFjZVNoaXBYKHNoaXAsIHksIHgpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhgcHNYOiAke3NoaXAuZ2V0TmFtZSgpfTsgJHt5fSwgJHt4fWApO1xuICAgIGNvbnN0IGxlbmd0aCA9IHNoaXAuZ2V0TGVuZ3RoKCk7XG4gICAgY29uc3QgcG9zaXRpb24gPSBbXTtcblxuICAgIGlmIChib2FyZFt5XVt4ICsgbGVuZ3RoXSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoYm9hcmRbeV1beCArIGldID09PSBcIm9cIikgcG9zaXRpb24ucHVzaChbeSwgeCArIGldKTtcbiAgICAgIGVsc2UgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKHBvc2l0aW9uLmxlbmd0aCA9PT0gbGVuZ3RoKSB7XG4gICAgICB3aGlsZSAocG9zaXRpb25bMF0pIHtcbiAgICAgICAgY29uc3QgW2EsIGJdID0gcG9zaXRpb24ucG9wKCk7XG4gICAgICAgIGJvYXJkW2FdW2JdID0gc2hpcC5nZXROYW1lKCk7XG4gICAgICB9XG4gICAgICBmbGVldC5wdXNoKHNoaXApO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBsYWNlU2hpcFkoc2hpcCwgeSwgeCkge1xuICAgIC8vIGNvbnNvbGUubG9nKGBwc1k6ICR7c2hpcC5nZXROYW1lKCl9OyAke3l9LCAke3h9YCk7XG4gICAgY29uc3QgbGVuZ3RoID0gc2hpcC5nZXRMZW5ndGgoKTtcbiAgICBjb25zdCBwb3NpdGlvbiA9IFtdO1xuXG4gICAgaWYgKGJvYXJkW3kgKyBsZW5ndGhdID09PSB1bmRlZmluZWQpIHJldHVybjtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChib2FyZFt5ICsgaV1beF0gPT09IFwib1wiKSB7XG4gICAgICAgIHBvc2l0aW9uLnB1c2goW3kgKyBpLCB4XSk7XG4gICAgICB9IGVsc2UgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKHBvc2l0aW9uLmxlbmd0aCA9PT0gbGVuZ3RoKSB7XG4gICAgICB3aGlsZSAocG9zaXRpb25bMF0pIHtcbiAgICAgICAgY29uc3QgW2EsIGJdID0gcG9zaXRpb24ucG9wKCk7XG4gICAgICAgIGJvYXJkW2FdW2JdID0gc2hpcC5nZXROYW1lKCk7XG4gICAgICB9XG4gICAgICBmbGVldC5wdXNoKHNoaXApO1xuICAgIH1cbiAgfVxuXG4gIChmdW5jdGlvbiBwbGFjZVNoaXBzKCkge1xuICAgIGxldCBmbGVldENvdW50ID0gMDtcbiAgICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICAvLyAgIGNvbnNvbGUubG9nKGJvYXJkKTtcbiAgICAgIHdoaWxlIChmbGVldC5sZW5ndGggIT09IGZsZWV0Q291bnQgKyAxKSB7XG4gICAgICAgIGlmIChyYW5kb21OdW1iZXIoMikgPT09IDEpIHtcbiAgICAgICAgICBwbGFjZVNoaXBYKHNoaXAsIHJhbmRvbU51bWJlcigxMCksIHJhbmRvbU51bWJlcigxMCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBsYWNlU2hpcFkoc2hpcCwgcmFuZG9tTnVtYmVyKDEwKSwgcmFuZG9tTnVtYmVyKDEwKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZsZWV0Q291bnQgKz0gMTtcbiAgICB9KTtcbiAgfSkoKTtcblxuICBsZXQgd2FzQXR0YWNrU3VjY2VzZnVsID0gZmFsc2U7XG4gIGNvbnN0IGdldFdhc0F0dGFja1N1Y2Nlc2Z1bCA9ICgpID0+IHdhc0F0dGFja1N1Y2Nlc2Z1bDtcblxuICBmdW5jdGlvbiByZWNlaXZlQXR0YWNrKHksIHgpIHtcbiAgICBjb25zdCB2YWx1ZSA9IGJvYXJkW3ldW3hdO1xuXG4gICAgaWYgKHZhbHVlID09PSBcIm9cIikge1xuICAgICAgYm9hcmRbeV1beF0gPSBcInhcIjtcbiAgICAgIHdhc0F0dGFja1N1Y2Nlc2Z1bCA9IHRydWU7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gXCJ4XCIgfHwgdmFsdWUuZW5kc1dpdGgoXCJTaG90XCIpKSB7XG4gICAgICB3YXNBdHRhY2tTdWNjZXNmdWwgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc2hpcCA9IGZsZWV0LmZpbHRlcigodGhpc1NoaXApID0+IHRoaXNTaGlwLmdldE5hbWUoKSA9PT0gdmFsdWUpWzBdO1xuICAgICAgc2hpcC5oaXQoKTtcbiAgICAgIGJvYXJkW3ldW3hdID0gYCR7dmFsdWV9U2hvdGA7XG5cbiAgICAgIGlmIChzaGlwLmdldFN1bmsoKSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBpbmRleCA9IGZsZWV0LmluZGV4T2Yoc2hpcCk7XG4gICAgICAgIGZsZWV0LnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG5cbiAgICAgIHdhc0F0dGFja1N1Y2Nlc2Z1bCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYWxsU3VuaygpIHtcbiAgICBpZiAoZmxlZXQubGVuZ3RoID09PSAwKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4geyBib2FyZCwgcmVjZWl2ZUF0dGFjaywgYWxsU3VuaywgZ2V0V2FzQXR0YWNrU3VjY2VzZnVsLCByYW5kb21OdW1iZXIgfTtcbn1cbiIsImNvbnN0IEJPQVJEX1NJWkUgPSAxMDtcblxuZnVuY3Rpb24gcmVtb3ZlUGFnZUVsZW1lbnRzKCkge1xuICBjb25zdCBCT0RZID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG5cbiAgd2hpbGUgKEJPRFkubGFzdENoaWxkKSBCT0RZLmxhc3RDaGlsZC5yZW1vdmUoKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGV0dGVyc1NlY3Rpb24oKSB7XG4gIGNvbnN0IGxldHRlckNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGxldHRlckNvbnRhaW5lci5jbGFzc0xpc3QgPSBcImxldHRlci1jb250YWluZXJcIjtcbiAgY29uc3QgbGV0dGVycyA9IFtcIkFcIiwgXCJCXCIsIFwiQ1wiLCBcIkRcIiwgXCJFXCIsIFwiRlwiLCBcIkdcIiwgXCJIXCIsIFwiSVwiLCBcIkpcIl07XG5cbiAgbGV0dGVycy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgY29uc3QgbGV0dGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBsZXR0ZXIuY2xhc3NOYW1lID0gXCJsZXR0ZXJcIjtcbiAgICBsZXR0ZXIudGV4dENvbnRlbnQgPSBlbGVtZW50O1xuICAgIGxldHRlckNvbnRhaW5lci5hcHBlbmRDaGlsZChsZXR0ZXIpO1xuICB9KTtcblxuICByZXR1cm4gbGV0dGVyQ29udGFpbmVyO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVOdW1iZXJzU2VjdGlvbigpIHtcbiAgY29uc3QgbnVtYmVyQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbnVtYmVyQ29udGFpbmVyLmlkID0gXCJudW1iZXItY29udGFpbmVyXCI7XG4gIG51bWJlckNvbnRhaW5lci5jbGFzc0xpc3QgPSBcIm51bWJlci1jb250YWluZXJcIjtcbiAgY29uc3QgbnVtYmVycyA9IFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMF07XG5cbiAgbnVtYmVycy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgY29uc3QgbnVtYmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBudW1iZXIuY2xhc3NMaXN0ID0gXCJudW1iZXJcIjtcbiAgICBudW1iZXIudGV4dENvbnRlbnQgPSBlbGVtZW50O1xuICAgIG51bWJlckNvbnRhaW5lci5hcHBlbmRDaGlsZChudW1iZXIpO1xuICB9KTtcblxuICByZXR1cm4gbnVtYmVyQ29udGFpbmVyO1xufVxuXG5mdW5jdGlvbiBjbGVhckNlbGxzKGdyaWQpIHtcbiAgd2hpbGUgKGdyaWQubGFzdENoaWxkKSBncmlkLmxhc3RDaGlsZC5yZW1vdmUoKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ2VsbHMoZ3JpZCwgZ2FtZUJvYXJkLCBib2FyZFR5cGUpIHtcbiAgY2xlYXJDZWxscyhncmlkKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IEJPQVJEX1NJWkU7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgQk9BUkRfU0laRTsgaisrKSB7XG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGNlbGwuY2xhc3NOYW1lID0gXCJjZWxsXCI7XG4gICAgICBjZWxsLmRhdGFzZXQueSA9IGk7XG4gICAgICBjZWxsLmRhdGFzZXQueCA9IGo7XG4gICAgICBjb25zdCBjZWxsVmFsdWUgPSAoKCkgPT4ge1xuICAgICAgICBpZiAoZ2FtZUJvYXJkW2ldW2pdID09PSBcIm9cIikgcmV0dXJuIFwiXCI7XG4gICAgICAgIGlmIChnYW1lQm9hcmRbaV1bal0gPT09IFwieFwiKSByZXR1cm4gXCJYXCI7XG4gICAgICAgIGlmIChnYW1lQm9hcmRbaV1bal0uZW5kc1dpdGgoXCJTaG90XCIpKSByZXR1cm4gXCLimKBcIjtcbiAgICAgICAgaWYgKGJvYXJkVHlwZSA9PT0gXCJib3RcIikgcmV0dXJuIFwiXCI7XG4gICAgICAgIHJldHVybiBcIvCfmqJcIjtcbiAgICAgIH0pKCk7XG4gICAgICBjZWxsLmlubmVyVGV4dCA9IGNlbGxWYWx1ZTtcbiAgICAgIGdyaWQuYXBwZW5kQ2hpbGQoY2VsbCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUdyaWQoZGVzY3JpcHRpb24sIGdhbWVCb2FyZCwgYm9hcmRUeXBlKSB7XG4gIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBncmlkLmlkID0gYGNlbGwtY29udGFpbmVyLSR7ZGVzY3JpcHRpb259YDtcbiAgZ3JpZC5jbGFzc05hbWUgPSBgY2VsbC1jb250YWluZXJgO1xuXG4gIGNyZWF0ZUNlbGxzKGdyaWQsIGdhbWVCb2FyZCwgYm9hcmRUeXBlKTtcblxuICByZXR1cm4gZ3JpZDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVGl0bGUoZGVzY3JpcHRpb24pIHtcbiAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB0aXRsZS5jbGFzc0xpc3QuYWRkKFwibWFwLXRpdGxlXCIpO1xuICB0aXRsZS5pbm5lclRleHQgPSBkZXNjcmlwdGlvbjtcbiAgcmV0dXJuIHRpdGxlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVNYXAoZGVzY3JpcHRpb24sIGdhbWVCb2FyZCwgYm9hcmRUeXBlKSB7XG4gIGNvbnN0IG1hcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG1hcC5pZCA9IGBib2FyZC0ke2Rlc2NyaXB0aW9ufWA7XG4gIG1hcC5jbGFzc0xpc3QuYWRkKFwiYm9hcmRcIiwgZGVzY3JpcHRpb24pO1xuXG4gIG1hcC5hcHBlbmRDaGlsZChjcmVhdGVMZXR0ZXJzU2VjdGlvbigpKTtcbiAgbWFwLmFwcGVuZENoaWxkKGNyZWF0ZU51bWJlcnNTZWN0aW9uKCkpO1xuICBtYXAuYXBwZW5kQ2hpbGQoY3JlYXRlR3JpZChkZXNjcmlwdGlvbiwgZ2FtZUJvYXJkLCBib2FyZFR5cGUpKTtcbiAgbWFwLmFwcGVuZENoaWxkKGNyZWF0ZVRpdGxlKGRlc2NyaXB0aW9uKSk7XG5cbiAgcmV0dXJuIG1hcDtcbn1cblxuZXhwb3J0IHsgY3JlYXRlQ2VsbHMsIGNyZWF0ZU1hcCwgcmVtb3ZlUGFnZUVsZW1lbnRzIH07XG4iLCJpbXBvcnQgR2FtZUJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQbGF5ZXIocGxheWVyTmFtZSwgcGxheWVyVHlwZSkge1xuICBjb25zdCBuYW1lID0gcGxheWVyTmFtZTtcbiAgY29uc3QgdHlwZSA9IHBsYXllclR5cGU7XG5cbiAgY29uc3QgZ2FtZUJvYXJkID0gR2FtZUJvYXJkKCk7XG5cbiAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IG5hbWU7XG4gIGNvbnN0IGdldFR5cGUgPSAoKSA9PiB0eXBlO1xuXG4gIGZ1bmN0aW9uIHBsYXlUdXJuKGVuZW15Qm9hcmQsIHksIHgpIHtcbiAgICBpZiAoZ2V0VHlwZSgpID09PSBcImJvdFwiKSB7XG4gICAgICBjb25zdCByYW5kb21OdW1iZXIgPSAobnVtYmVyKSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBudW1iZXIpO1xuXG4gICAgICBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2socmFuZG9tTnVtYmVyKDEwKSwgcmFuZG9tTnVtYmVyKDEwKSk7XG5cbiAgICAgIGlmIChlbmVteUJvYXJkLmdldFdhc0F0dGFja1N1Y2Nlc2Z1bCgpID09PSBmYWxzZSkge1xuICAgICAgICBwbGF5VHVybihlbmVteUJvYXJkKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKHksIHgpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7IGdhbWVCb2FyZCwgZ2V0TmFtZSwgZ2V0VHlwZSwgcGxheVR1cm4gfTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFNoaXAoc2hpcE5hbWUsIHNoaXBMZW5ndGgpIHtcbiAgY29uc3QgbmFtZSA9IHNoaXBOYW1lO1xuICBjb25zdCBsZW5ndGggPSBzaGlwTGVuZ3RoO1xuICBsZXQgbnVtYmVyT2ZIaXRzID0gMDtcbiAgbGV0IGlzU3VuayA9IGZhbHNlO1xuICBjb25zdCBjb29yZGluYXRlcyA9IFtdO1xuXG4gIGNvbnN0IGdldE5hbWUgPSAoKSA9PiBuYW1lO1xuICBjb25zdCBnZXRMZW5ndGggPSAoKSA9PiBsZW5ndGg7XG4gIGNvbnN0IGdldEhpdHMgPSAoKSA9PiBudW1iZXJPZkhpdHM7XG4gIGNvbnN0IGdldFN1bmsgPSAoKSA9PiBpc1N1bms7XG5cbiAgZnVuY3Rpb24gc2lua1NoaXAoKSB7XG4gICAgaXNTdW5rID0gdHJ1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhpdCgpIHtcbiAgICBudW1iZXJPZkhpdHMgKz0gMTtcbiAgICBpZiAobnVtYmVyT2ZIaXRzID09PSBsZW5ndGgpIHNpbmtTaGlwKCk7XG4gIH1cblxuICByZXR1cm4geyBjb29yZGluYXRlcywgZ2V0TGVuZ3RoLCBnZXROYW1lLCBnZXRTdW5rLCBnZXRIaXRzLCBoaXQgfTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCB7IGNyZWF0ZUNlbGxzLCBjcmVhdGVNYXAsIHJlbW92ZVBhZ2VFbGVtZW50cyB9IGZyb20gXCIuL2hlbHBlclwiO1xuXG5mdW5jdGlvbiBnYW1lTG9vcChwbGF5ZXIsIGJvdCwgcGxheWVyRGlzcGxheVRhYmxlLCBib3REaXNwbGF5VGFibGUpIHtcbiAgY29uc3QgcGxheWVyR3JpZCA9IHBsYXllckRpc3BsYXlUYWJsZS5xdWVyeVNlbGVjdG9yKFwiLmNlbGwtY29udGFpbmVyXCIpO1xuICBjb25zdCBib3RHcmlkID0gYm90RGlzcGxheVRhYmxlLnF1ZXJ5U2VsZWN0b3IoXCIuY2VsbC1jb250YWluZXJcIik7XG5cbiAgY29uc3QgYm90Q2VsbHMgPSBib3REaXNwbGF5VGFibGUucXVlcnlTZWxlY3RvckFsbChcIi5jZWxsXCIpO1xuICBib3RDZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgeyB4IH0gPSBjZWxsLmRhdGFzZXQ7XG4gICAgICBjb25zdCB7IHkgfSA9IGNlbGwuZGF0YXNldDtcblxuICAgICAgcGxheWVyLnBsYXlUdXJuKGJvdC5nYW1lQm9hcmQsIHksIHgpO1xuICAgICAgY3JlYXRlQ2VsbHMoYm90R3JpZCwgYm90LmdhbWVCb2FyZC5ib2FyZCwgYm90LmdldFR5cGUoKSk7XG5cbiAgICAgIGlmIChib3QuZ2FtZUJvYXJkLmdldFdhc0F0dGFja1N1Y2Nlc2Z1bCgpKSB7XG4gICAgICAgIGlmIChib3QuZ2FtZUJvYXJkLmFsbFN1bmsoKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGBHRywgeW91IGRlZmVhdGVkIGFuIGV4dHJlbWVseSBkdW1iIEFJLi4uYCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYm90LnBsYXlUdXJuKHBsYXllci5nYW1lQm9hcmQsIHksIHgpO1xuICAgICAgICAgIGNyZWF0ZUNlbGxzKHBsYXllckdyaWQsIHBsYXllci5nYW1lQm9hcmQuYm9hcmQsIHBsYXllci5nZXRUeXBlKCkpO1xuICAgICAgICAgIGlmIChwbGF5ZXIuZ2FtZUJvYXJkLmdldFdhc0F0dGFja1N1Y2Nlc2Z1bCgpKSB7XG4gICAgICAgICAgICBpZiAocGxheWVyLmdhbWVCb2FyZC5hbGxTdW5rKCkpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coYERhbW4sIHlvdSBnb3QgYmVhdGVuIGJ5IGFuIGV4dHJlbWVseSBkdW1iIEFJLi4uYCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBnYW1lTG9vcChwbGF5ZXIsIGJvdCwgcGxheWVyRGlzcGxheVRhYmxlLCBib3REaXNwbGF5VGFibGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ2FtZUxvb3AocGxheWVyLCBib3QsIHBsYXllckRpc3BsYXlUYWJsZSwgYm90RGlzcGxheVRhYmxlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGxvYWRTZWNvbmRQYWdlKG5ld1BsYXllcikge1xuICBjb25zdCBib3QgPSBQbGF5ZXIoXCJBSVwiLCBcImJvdFwiKTtcbiAgY29uc3QgcGxheWVyID0gbmV3UGxheWVyO1xuXG4gIGNvbnN0IEJPRFkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcblxuICBjb25zdCBwbGF5ZXJEaXNwbGF5VGFibGUgPSBjcmVhdGVNYXAoXG4gICAgXCJGcmllbmRseS1XYXRlcnNcIixcbiAgICBwbGF5ZXIuZ2FtZUJvYXJkLmJvYXJkLFxuICAgIFwicGxheWVyXCIsXG4gICk7XG4gIGNvbnN0IGJvdERpc3BsYXlUYWJsZSA9IGNyZWF0ZU1hcChcIkVuZW15LVdhdGVyc1wiLCBib3QuZ2FtZUJvYXJkLmJvYXJkLCBcImJvdFwiKTtcblxuICBCT0RZLmFwcGVuZENoaWxkKHBsYXllckRpc3BsYXlUYWJsZSk7XG4gIEJPRFkuYXBwZW5kQ2hpbGQoYm90RGlzcGxheVRhYmxlKTtcblxuICBnYW1lTG9vcChwbGF5ZXIsIGJvdCwgcGxheWVyRGlzcGxheVRhYmxlLCBib3REaXNwbGF5VGFibGUpO1xufVxuXG5mdW5jdGlvbiBsb2FkRmlyc3RQYWdlKCkge1xuICBjb25zdCBCT0RZID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG5cbiAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpO1xuICBmb3JtLmNsYXNzTGlzdC5hZGQoXCJmaXJzdC1mb3JtXCIpO1xuICBCT0RZLmFwcGVuZENoaWxkKGZvcm0pO1xuXG4gIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICBpbnB1dC52YWx1ZSA9IFwiUGxheWVyXCI7XG4gIGZvcm0uYXBwZW5kQ2hpbGQoaW5wdXQpO1xuXG4gIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZmlyc3QtYnV0dG9uXCIpO1xuICBidXR0b24uaW5uZXJUZXh0ID0gXCJDcmVhdGUgUGxheWVyXCI7XG4gIGZvcm0uYXBwZW5kQ2hpbGQoYnV0dG9uKTtcblxuICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgaWYgKCFpbnB1dC52YWx1ZSkgcmV0dXJuO1xuXG4gICAgY29uc3QgcGxheWVyID0gUGxheWVyKGlucHV0LnZhbHVlLCBcImh1bWFuXCIpO1xuXG4gICAgcmVtb3ZlUGFnZUVsZW1lbnRzKCk7XG5cbiAgICBsb2FkU2Vjb25kUGFnZShwbGF5ZXIpO1xuICB9KTtcbn1cblxubG9hZEZpcnN0UGFnZSgpO1xuIl0sIm5hbWVzIjpbIlNoaXAiLCJHYW1lQm9hcmQiLCJyYW5kb21OdW1iZXIiLCJudW1iZXIiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJib2FyZCIsIkFycmF5IiwiZmlsbCIsIm1hcCIsImNhcnJpZXIiLCJiYXR0bGVzaGlwIiwiY3J1aXNlciIsInN1Ym1hcmluZSIsImRlc3Ryb3llciIsInNoaXBzIiwiZmxlZXQiLCJwbGFjZVNoaXBYIiwic2hpcCIsInkiLCJ4IiwibGVuZ3RoIiwiZ2V0TGVuZ3RoIiwicG9zaXRpb24iLCJ1bmRlZmluZWQiLCJpIiwicHVzaCIsImEiLCJiIiwicG9wIiwiZ2V0TmFtZSIsInBsYWNlU2hpcFkiLCJwbGFjZVNoaXBzIiwiZmxlZXRDb3VudCIsImZvckVhY2giLCJ3YXNBdHRhY2tTdWNjZXNmdWwiLCJnZXRXYXNBdHRhY2tTdWNjZXNmdWwiLCJyZWNlaXZlQXR0YWNrIiwidmFsdWUiLCJlbmRzV2l0aCIsImZpbHRlciIsInRoaXNTaGlwIiwiaGl0IiwiZ2V0U3VuayIsImluZGV4IiwiaW5kZXhPZiIsInNwbGljZSIsImFsbFN1bmsiLCJCT0FSRF9TSVpFIiwicmVtb3ZlUGFnZUVsZW1lbnRzIiwiQk9EWSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImxhc3RDaGlsZCIsInJlbW92ZSIsImNyZWF0ZUxldHRlcnNTZWN0aW9uIiwibGV0dGVyQ29udGFpbmVyIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImxldHRlcnMiLCJlbGVtZW50IiwibGV0dGVyIiwiY2xhc3NOYW1lIiwidGV4dENvbnRlbnQiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZU51bWJlcnNTZWN0aW9uIiwibnVtYmVyQ29udGFpbmVyIiwiaWQiLCJudW1iZXJzIiwiY2xlYXJDZWxscyIsImdyaWQiLCJjcmVhdGVDZWxscyIsImdhbWVCb2FyZCIsImJvYXJkVHlwZSIsImoiLCJjZWxsIiwiZGF0YXNldCIsImNlbGxWYWx1ZSIsImlubmVyVGV4dCIsImNyZWF0ZUdyaWQiLCJkZXNjcmlwdGlvbiIsImNyZWF0ZVRpdGxlIiwidGl0bGUiLCJhZGQiLCJjcmVhdGVNYXAiLCJQbGF5ZXIiLCJwbGF5ZXJOYW1lIiwicGxheWVyVHlwZSIsIm5hbWUiLCJ0eXBlIiwiZ2V0VHlwZSIsInBsYXlUdXJuIiwiZW5lbXlCb2FyZCIsInNoaXBOYW1lIiwic2hpcExlbmd0aCIsIm51bWJlck9mSGl0cyIsImlzU3VuayIsImNvb3JkaW5hdGVzIiwiZ2V0SGl0cyIsInNpbmtTaGlwIiwiZ2FtZUxvb3AiLCJwbGF5ZXIiLCJib3QiLCJwbGF5ZXJEaXNwbGF5VGFibGUiLCJib3REaXNwbGF5VGFibGUiLCJwbGF5ZXJHcmlkIiwiYm90R3JpZCIsImJvdENlbGxzIiwicXVlcnlTZWxlY3RvckFsbCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb25zb2xlIiwibG9nIiwibG9hZFNlY29uZFBhZ2UiLCJuZXdQbGF5ZXIiLCJsb2FkRmlyc3RQYWdlIiwiZm9ybSIsImlucHV0IiwiYnV0dG9uIiwiZSIsInByZXZlbnREZWZhdWx0Il0sInNvdXJjZVJvb3QiOiIifQ==