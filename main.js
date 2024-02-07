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
    let result;
    if (value === "o") {
      board[y][x] = "x";
      wasAttackSuccesful = true;
      result = "Missed...";
      return result;
    }
    if (value === "x" || value.endsWith("Shot")) {
      wasAttackSuccesful = false;
      result = "You shot here before!";
      return result;
    }
    const ship = fleet.filter(thisShip => thisShip.getName() === value)[0];
    ship.hit();
    board[y][x] = `${value}Shot`;
    if (ship.getSunk() === true) {
      const index = fleet.indexOf(ship);
      fleet.splice(index, 1);
      result = `${ship.getName()} has sunk!`;
      return result;
    }
    wasAttackSuccesful = true;
    result = `A ship was hit!`;
    return result;
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
/* harmony export */   removePageElements: () => (/* binding */ removePageElements),
/* harmony export */   setMapInfoContent: () => (/* binding */ setMapInfoContent)
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
function createInfo() {
  const info = document.createElement("div");
  info.classList.add("map-info");
  return info;
}
function setMapInfoContent(board, message) {
  const info = board.querySelector(".map-info");
  info.innerText = message;
}
function createMap(description, gameBoard, boardType) {
  const map = document.createElement("div");
  map.id = `board-${description}`;
  map.classList.add("board", description);
  map.appendChild(createLettersSection());
  map.appendChild(createNumbersSection());
  map.appendChild(createGrid(description, gameBoard, boardType));
  map.appendChild(createTitle(description));
  map.appendChild(createInfo());
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
    let result;
    if (getType() === "bot") {
      const randomNumber = number => Math.floor(Math.random() * number);
      result = enemyBoard.receiveAttack(randomNumber(10), randomNumber(10));
      if (enemyBoard.getWasAttackSuccesful() === false) {
        result = playTurn(enemyBoard);
      }
      return result;
    }
    result = enemyBoard.receiveAttack(y, x);
    return result;
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
      let result = player.playTurn(bot.gameBoard, y, x);
      (0,_helper__WEBPACK_IMPORTED_MODULE_1__.createCells)(botGrid, bot.gameBoard.board, bot.getType());
      (0,_helper__WEBPACK_IMPORTED_MODULE_1__.setMapInfoContent)(botDisplayTable, result);
      if (bot.gameBoard.getWasAttackSuccesful()) {
        if (bot.gameBoard.allSunk() === true) {
          (0,_helper__WEBPACK_IMPORTED_MODULE_1__.setMapInfoContent)(botDisplayTable, "GG, you defeated an extremely dumb AI...");
        } else {
          result = bot.playTurn(player.gameBoard, y, x);
          (0,_helper__WEBPACK_IMPORTED_MODULE_1__.createCells)(playerGrid, player.gameBoard.board, player.getType());
          (0,_helper__WEBPACK_IMPORTED_MODULE_1__.setMapInfoContent)(playerDisplayTable, result);
          if (player.gameBoard.getWasAttackSuccesful()) {
            if (player.gameBoard.allSunk()) {
              (0,_helper__WEBPACK_IMPORTED_MODULE_1__.setMapInfoContent)(playerDisplayTable, "Damn, you got beaten by an extremely dumb AI...");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TSxDQUFDNkIsS0FBSyxDQUFDakYsS0FBSyxFQUFFLE9BQU8sQ0FBQztJQUUzQ1ksMkRBQWtCLENBQUMsQ0FBQztJQUVwQmlFLGNBQWMsQ0FBQ1QsTUFBTSxDQUFDO0VBQ3hCLENBQUMsQ0FBQztBQUNKO0FBRUFXLGFBQWEsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90ZXN0Ly4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly90ZXN0Ly4vc3JjL2hlbHBlci5qcyIsIndlYnBhY2s6Ly90ZXN0Ly4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly90ZXN0Ly4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vdGVzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90ZXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90ZXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdGVzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3Rlc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBHYW1lQm9hcmQoKSB7XG4gIGNvbnN0IHJhbmRvbU51bWJlciA9IChudW1iZXIpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG51bWJlcik7XG5cbiAgY29uc3QgYm9hcmQgPSBuZXcgQXJyYXkoMTApLmZpbGwoXCJvXCIpLm1hcCgoKSA9PiBuZXcgQXJyYXkoMTApLmZpbGwoXCJvXCIpKTtcblxuICBjb25zdCBjYXJyaWVyID0gU2hpcChcImNhcnJpZXJcIiwgNSk7XG4gIGNvbnN0IGJhdHRsZXNoaXAgPSBTaGlwKFwiYmF0dGxlc2hpcFwiLCA0KTtcbiAgY29uc3QgY3J1aXNlciA9IFNoaXAoXCJjcnVpc2VyXCIsIDMpO1xuICBjb25zdCBzdWJtYXJpbmUgPSBTaGlwKFwic3VibWFyaW5lXCIsIDMpO1xuICBjb25zdCBkZXN0cm95ZXIgPSBTaGlwKFwiZGVzdHJveWVyXCIsIDIpO1xuXG4gIGNvbnN0IHNoaXBzID0gW2NhcnJpZXIsIGJhdHRsZXNoaXAsIGNydWlzZXIsIHN1Ym1hcmluZSwgZGVzdHJveWVyXTtcbiAgY29uc3QgZmxlZXQgPSBbXTtcblxuICBmdW5jdGlvbiBwbGFjZVNoaXBYKHNoaXAsIHksIHgpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhgcHNYOiAke3NoaXAuZ2V0TmFtZSgpfTsgJHt5fSwgJHt4fWApO1xuICAgIGNvbnN0IGxlbmd0aCA9IHNoaXAuZ2V0TGVuZ3RoKCk7XG4gICAgY29uc3QgcG9zaXRpb24gPSBbXTtcblxuICAgIGlmIChib2FyZFt5XVt4ICsgbGVuZ3RoXSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoYm9hcmRbeV1beCArIGldID09PSBcIm9cIikgcG9zaXRpb24ucHVzaChbeSwgeCArIGldKTtcbiAgICAgIGVsc2UgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKHBvc2l0aW9uLmxlbmd0aCA9PT0gbGVuZ3RoKSB7XG4gICAgICB3aGlsZSAocG9zaXRpb25bMF0pIHtcbiAgICAgICAgY29uc3QgW2EsIGJdID0gcG9zaXRpb24ucG9wKCk7XG4gICAgICAgIGJvYXJkW2FdW2JdID0gc2hpcC5nZXROYW1lKCk7XG4gICAgICB9XG4gICAgICBmbGVldC5wdXNoKHNoaXApO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBsYWNlU2hpcFkoc2hpcCwgeSwgeCkge1xuICAgIC8vIGNvbnNvbGUubG9nKGBwc1k6ICR7c2hpcC5nZXROYW1lKCl9OyAke3l9LCAke3h9YCk7XG4gICAgY29uc3QgbGVuZ3RoID0gc2hpcC5nZXRMZW5ndGgoKTtcbiAgICBjb25zdCBwb3NpdGlvbiA9IFtdO1xuXG4gICAgaWYgKGJvYXJkW3kgKyBsZW5ndGhdID09PSB1bmRlZmluZWQpIHJldHVybjtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChib2FyZFt5ICsgaV1beF0gPT09IFwib1wiKSB7XG4gICAgICAgIHBvc2l0aW9uLnB1c2goW3kgKyBpLCB4XSk7XG4gICAgICB9IGVsc2UgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKHBvc2l0aW9uLmxlbmd0aCA9PT0gbGVuZ3RoKSB7XG4gICAgICB3aGlsZSAocG9zaXRpb25bMF0pIHtcbiAgICAgICAgY29uc3QgW2EsIGJdID0gcG9zaXRpb24ucG9wKCk7XG4gICAgICAgIGJvYXJkW2FdW2JdID0gc2hpcC5nZXROYW1lKCk7XG4gICAgICB9XG4gICAgICBmbGVldC5wdXNoKHNoaXApO1xuICAgIH1cbiAgfVxuXG4gIChmdW5jdGlvbiBwbGFjZVNoaXBzKCkge1xuICAgIGxldCBmbGVldENvdW50ID0gMDtcbiAgICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICAvLyAgIGNvbnNvbGUubG9nKGJvYXJkKTtcbiAgICAgIHdoaWxlIChmbGVldC5sZW5ndGggIT09IGZsZWV0Q291bnQgKyAxKSB7XG4gICAgICAgIGlmIChyYW5kb21OdW1iZXIoMikgPT09IDEpIHtcbiAgICAgICAgICBwbGFjZVNoaXBYKHNoaXAsIHJhbmRvbU51bWJlcigxMCksIHJhbmRvbU51bWJlcigxMCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBsYWNlU2hpcFkoc2hpcCwgcmFuZG9tTnVtYmVyKDEwKSwgcmFuZG9tTnVtYmVyKDEwKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZsZWV0Q291bnQgKz0gMTtcbiAgICB9KTtcbiAgfSkoKTtcblxuICBsZXQgd2FzQXR0YWNrU3VjY2VzZnVsID0gZmFsc2U7XG4gIGNvbnN0IGdldFdhc0F0dGFja1N1Y2Nlc2Z1bCA9ICgpID0+IHdhc0F0dGFja1N1Y2Nlc2Z1bDtcblxuICBmdW5jdGlvbiByZWNlaXZlQXR0YWNrKHksIHgpIHtcbiAgICBjb25zdCB2YWx1ZSA9IGJvYXJkW3ldW3hdO1xuICAgIGxldCByZXN1bHQ7XG5cbiAgICBpZiAodmFsdWUgPT09IFwib1wiKSB7XG4gICAgICBib2FyZFt5XVt4XSA9IFwieFwiO1xuICAgICAgd2FzQXR0YWNrU3VjY2VzZnVsID0gdHJ1ZTtcbiAgICAgIHJlc3VsdCA9IFwiTWlzc2VkLi4uXCI7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBpZiAodmFsdWUgPT09IFwieFwiIHx8IHZhbHVlLmVuZHNXaXRoKFwiU2hvdFwiKSkge1xuICAgICAgd2FzQXR0YWNrU3VjY2VzZnVsID0gZmFsc2U7XG4gICAgICByZXN1bHQgPSBcIllvdSBzaG90IGhlcmUgYmVmb3JlIVwiO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgY29uc3Qgc2hpcCA9IGZsZWV0LmZpbHRlcigodGhpc1NoaXApID0+IHRoaXNTaGlwLmdldE5hbWUoKSA9PT0gdmFsdWUpWzBdO1xuICAgIHNoaXAuaGl0KCk7XG4gICAgYm9hcmRbeV1beF0gPSBgJHt2YWx1ZX1TaG90YDtcblxuICAgIGlmIChzaGlwLmdldFN1bmsoKSA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3QgaW5kZXggPSBmbGVldC5pbmRleE9mKHNoaXApO1xuICAgICAgZmxlZXQuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIHJlc3VsdCA9IGAke3NoaXAuZ2V0TmFtZSgpfSBoYXMgc3VuayFgO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICB3YXNBdHRhY2tTdWNjZXNmdWwgPSB0cnVlO1xuICAgIHJlc3VsdCA9IGBBIHNoaXAgd2FzIGhpdCFgO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBhbGxTdW5rKCkge1xuICAgIGlmIChmbGVldC5sZW5ndGggPT09IDApIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB7IGJvYXJkLCByZWNlaXZlQXR0YWNrLCBhbGxTdW5rLCBnZXRXYXNBdHRhY2tTdWNjZXNmdWwsIHJhbmRvbU51bWJlciB9O1xufVxuIiwiY29uc3QgQk9BUkRfU0laRSA9IDEwO1xuXG5mdW5jdGlvbiByZW1vdmVQYWdlRWxlbWVudHMoKSB7XG4gIGNvbnN0IEJPRFkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcblxuICB3aGlsZSAoQk9EWS5sYXN0Q2hpbGQpIEJPRFkubGFzdENoaWxkLnJlbW92ZSgpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMZXR0ZXJzU2VjdGlvbigpIHtcbiAgY29uc3QgbGV0dGVyQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbGV0dGVyQ29udGFpbmVyLmNsYXNzTGlzdCA9IFwibGV0dGVyLWNvbnRhaW5lclwiO1xuICBjb25zdCBsZXR0ZXJzID0gW1wiQVwiLCBcIkJcIiwgXCJDXCIsIFwiRFwiLCBcIkVcIiwgXCJGXCIsIFwiR1wiLCBcIkhcIiwgXCJJXCIsIFwiSlwiXTtcblxuICBsZXR0ZXJzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICBjb25zdCBsZXR0ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGxldHRlci5jbGFzc05hbWUgPSBcImxldHRlclwiO1xuICAgIGxldHRlci50ZXh0Q29udGVudCA9IGVsZW1lbnQ7XG4gICAgbGV0dGVyQ29udGFpbmVyLmFwcGVuZENoaWxkKGxldHRlcik7XG4gIH0pO1xuXG4gIHJldHVybiBsZXR0ZXJDb250YWluZXI7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU51bWJlcnNTZWN0aW9uKCkge1xuICBjb25zdCBudW1iZXJDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBudW1iZXJDb250YWluZXIuaWQgPSBcIm51bWJlci1jb250YWluZXJcIjtcbiAgbnVtYmVyQ29udGFpbmVyLmNsYXNzTGlzdCA9IFwibnVtYmVyLWNvbnRhaW5lclwiO1xuICBjb25zdCBudW1iZXJzID0gWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwXTtcblxuICBudW1iZXJzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICBjb25zdCBudW1iZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIG51bWJlci5jbGFzc0xpc3QgPSBcIm51bWJlclwiO1xuICAgIG51bWJlci50ZXh0Q29udGVudCA9IGVsZW1lbnQ7XG4gICAgbnVtYmVyQ29udGFpbmVyLmFwcGVuZENoaWxkKG51bWJlcik7XG4gIH0pO1xuXG4gIHJldHVybiBudW1iZXJDb250YWluZXI7XG59XG5cbmZ1bmN0aW9uIGNsZWFyQ2VsbHMoZ3JpZCkge1xuICB3aGlsZSAoZ3JpZC5sYXN0Q2hpbGQpIGdyaWQubGFzdENoaWxkLnJlbW92ZSgpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDZWxscyhncmlkLCBnYW1lQm9hcmQsIGJvYXJkVHlwZSkge1xuICBjbGVhckNlbGxzKGdyaWQpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgQk9BUkRfU0laRTsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBCT0FSRF9TSVpFOyBqKyspIHtcbiAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgY2VsbC5jbGFzc05hbWUgPSBcImNlbGxcIjtcbiAgICAgIGNlbGwuZGF0YXNldC55ID0gaTtcbiAgICAgIGNlbGwuZGF0YXNldC54ID0gajtcbiAgICAgIGNvbnN0IGNlbGxWYWx1ZSA9ICgoKSA9PiB7XG4gICAgICAgIGlmIChnYW1lQm9hcmRbaV1bal0gPT09IFwib1wiKSByZXR1cm4gXCJcIjtcbiAgICAgICAgaWYgKGdhbWVCb2FyZFtpXVtqXSA9PT0gXCJ4XCIpIHJldHVybiBcIlhcIjtcbiAgICAgICAgaWYgKGdhbWVCb2FyZFtpXVtqXS5lbmRzV2l0aChcIlNob3RcIikpIHJldHVybiBcIuKYoFwiO1xuICAgICAgICBpZiAoYm9hcmRUeXBlID09PSBcImJvdFwiKSByZXR1cm4gXCJcIjtcbiAgICAgICAgcmV0dXJuIFwi8J+aolwiO1xuICAgICAgfSkoKTtcbiAgICAgIGNlbGwuaW5uZXJUZXh0ID0gY2VsbFZhbHVlO1xuICAgICAgZ3JpZC5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlR3JpZChkZXNjcmlwdGlvbiwgZ2FtZUJvYXJkLCBib2FyZFR5cGUpIHtcbiAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGdyaWQuaWQgPSBgY2VsbC1jb250YWluZXItJHtkZXNjcmlwdGlvbn1gO1xuICBncmlkLmNsYXNzTmFtZSA9IGBjZWxsLWNvbnRhaW5lcmA7XG5cbiAgY3JlYXRlQ2VsbHMoZ3JpZCwgZ2FtZUJvYXJkLCBib2FyZFR5cGUpO1xuXG4gIHJldHVybiBncmlkO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVUaXRsZShkZXNjcmlwdGlvbikge1xuICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHRpdGxlLmNsYXNzTGlzdC5hZGQoXCJtYXAtdGl0bGVcIik7XG4gIHRpdGxlLmlubmVyVGV4dCA9IGRlc2NyaXB0aW9uO1xuICByZXR1cm4gdGl0bGU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUluZm8oKSB7XG4gIGNvbnN0IGluZm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBpbmZvLmNsYXNzTGlzdC5hZGQoXCJtYXAtaW5mb1wiKTtcbiAgcmV0dXJuIGluZm87XG59XG5cbmZ1bmN0aW9uIHNldE1hcEluZm9Db250ZW50KGJvYXJkLCBtZXNzYWdlKSB7XG4gIGNvbnN0IGluZm8gPSBib2FyZC5xdWVyeVNlbGVjdG9yKFwiLm1hcC1pbmZvXCIpO1xuICBpbmZvLmlubmVyVGV4dCA9IG1lc3NhZ2U7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU1hcChkZXNjcmlwdGlvbiwgZ2FtZUJvYXJkLCBib2FyZFR5cGUpIHtcbiAgY29uc3QgbWFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbWFwLmlkID0gYGJvYXJkLSR7ZGVzY3JpcHRpb259YDtcbiAgbWFwLmNsYXNzTGlzdC5hZGQoXCJib2FyZFwiLCBkZXNjcmlwdGlvbik7XG5cbiAgbWFwLmFwcGVuZENoaWxkKGNyZWF0ZUxldHRlcnNTZWN0aW9uKCkpO1xuICBtYXAuYXBwZW5kQ2hpbGQoY3JlYXRlTnVtYmVyc1NlY3Rpb24oKSk7XG4gIG1hcC5hcHBlbmRDaGlsZChjcmVhdGVHcmlkKGRlc2NyaXB0aW9uLCBnYW1lQm9hcmQsIGJvYXJkVHlwZSkpO1xuICBtYXAuYXBwZW5kQ2hpbGQoY3JlYXRlVGl0bGUoZGVzY3JpcHRpb24pKTtcbiAgbWFwLmFwcGVuZENoaWxkKGNyZWF0ZUluZm8oKSk7XG5cbiAgcmV0dXJuIG1hcDtcbn1cblxuZXhwb3J0IHsgY3JlYXRlQ2VsbHMsIGNyZWF0ZU1hcCwgcmVtb3ZlUGFnZUVsZW1lbnRzLCBzZXRNYXBJbmZvQ29udGVudCB9O1xuIiwiaW1wb3J0IEdhbWVCb2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUGxheWVyKHBsYXllck5hbWUsIHBsYXllclR5cGUpIHtcbiAgY29uc3QgbmFtZSA9IHBsYXllck5hbWU7XG4gIGNvbnN0IHR5cGUgPSBwbGF5ZXJUeXBlO1xuXG4gIGNvbnN0IGdhbWVCb2FyZCA9IEdhbWVCb2FyZCgpO1xuXG4gIGNvbnN0IGdldE5hbWUgPSAoKSA9PiBuYW1lO1xuICBjb25zdCBnZXRUeXBlID0gKCkgPT4gdHlwZTtcblxuICBmdW5jdGlvbiBwbGF5VHVybihlbmVteUJvYXJkLCB5LCB4KSB7XG4gICAgbGV0IHJlc3VsdDtcblxuICAgIGlmIChnZXRUeXBlKCkgPT09IFwiYm90XCIpIHtcbiAgICAgIGNvbnN0IHJhbmRvbU51bWJlciA9IChudW1iZXIpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG51bWJlcik7XG5cbiAgICAgIHJlc3VsdCA9IGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayhyYW5kb21OdW1iZXIoMTApLCByYW5kb21OdW1iZXIoMTApKTtcbiAgICAgIGlmIChlbmVteUJvYXJkLmdldFdhc0F0dGFja1N1Y2Nlc2Z1bCgpID09PSBmYWxzZSkge1xuICAgICAgICByZXN1bHQgPSBwbGF5VHVybihlbmVteUJvYXJkKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcmVzdWx0ID0gZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKHksIHgpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICByZXR1cm4geyBnYW1lQm9hcmQsIGdldE5hbWUsIGdldFR5cGUsIHBsYXlUdXJuIH07XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTaGlwKHNoaXBOYW1lLCBzaGlwTGVuZ3RoKSB7XG4gIGNvbnN0IG5hbWUgPSBzaGlwTmFtZTtcbiAgY29uc3QgbGVuZ3RoID0gc2hpcExlbmd0aDtcbiAgbGV0IG51bWJlck9mSGl0cyA9IDA7XG4gIGxldCBpc1N1bmsgPSBmYWxzZTtcbiAgY29uc3QgY29vcmRpbmF0ZXMgPSBbXTtcblxuICBjb25zdCBnZXROYW1lID0gKCkgPT4gbmFtZTtcbiAgY29uc3QgZ2V0TGVuZ3RoID0gKCkgPT4gbGVuZ3RoO1xuICBjb25zdCBnZXRIaXRzID0gKCkgPT4gbnVtYmVyT2ZIaXRzO1xuICBjb25zdCBnZXRTdW5rID0gKCkgPT4gaXNTdW5rO1xuXG4gIGZ1bmN0aW9uIHNpbmtTaGlwKCkge1xuICAgIGlzU3VuayA9IHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiBoaXQoKSB7XG4gICAgbnVtYmVyT2ZIaXRzICs9IDE7XG4gICAgaWYgKG51bWJlck9mSGl0cyA9PT0gbGVuZ3RoKSBzaW5rU2hpcCgpO1xuICB9XG5cbiAgcmV0dXJuIHsgY29vcmRpbmF0ZXMsIGdldExlbmd0aCwgZ2V0TmFtZSwgZ2V0U3VuaywgZ2V0SGl0cywgaGl0IH07XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQge1xuICBjcmVhdGVDZWxscyxcbiAgY3JlYXRlTWFwLFxuICByZW1vdmVQYWdlRWxlbWVudHMsXG4gIHNldE1hcEluZm9Db250ZW50LFxufSBmcm9tIFwiLi9oZWxwZXJcIjtcblxuZnVuY3Rpb24gZ2FtZUxvb3AocGxheWVyLCBib3QsIHBsYXllckRpc3BsYXlUYWJsZSwgYm90RGlzcGxheVRhYmxlKSB7XG4gIGNvbnN0IHBsYXllckdyaWQgPSBwbGF5ZXJEaXNwbGF5VGFibGUucXVlcnlTZWxlY3RvcihcIi5jZWxsLWNvbnRhaW5lclwiKTtcbiAgY29uc3QgYm90R3JpZCA9IGJvdERpc3BsYXlUYWJsZS5xdWVyeVNlbGVjdG9yKFwiLmNlbGwtY29udGFpbmVyXCIpO1xuXG4gIGNvbnN0IGJvdENlbGxzID0gYm90RGlzcGxheVRhYmxlLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY2VsbFwiKTtcbiAgYm90Q2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IHsgeCB9ID0gY2VsbC5kYXRhc2V0O1xuICAgICAgY29uc3QgeyB5IH0gPSBjZWxsLmRhdGFzZXQ7XG5cbiAgICAgIGxldCByZXN1bHQgPSBwbGF5ZXIucGxheVR1cm4oYm90LmdhbWVCb2FyZCwgeSwgeCk7XG4gICAgICBjcmVhdGVDZWxscyhib3RHcmlkLCBib3QuZ2FtZUJvYXJkLmJvYXJkLCBib3QuZ2V0VHlwZSgpKTtcbiAgICAgIHNldE1hcEluZm9Db250ZW50KGJvdERpc3BsYXlUYWJsZSwgcmVzdWx0KTtcbiAgICAgIGlmIChib3QuZ2FtZUJvYXJkLmdldFdhc0F0dGFja1N1Y2Nlc2Z1bCgpKSB7XG4gICAgICAgIGlmIChib3QuZ2FtZUJvYXJkLmFsbFN1bmsoKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHNldE1hcEluZm9Db250ZW50KFxuICAgICAgICAgICAgYm90RGlzcGxheVRhYmxlLFxuICAgICAgICAgICAgXCJHRywgeW91IGRlZmVhdGVkIGFuIGV4dHJlbWVseSBkdW1iIEFJLi4uXCIsXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXN1bHQgPSBib3QucGxheVR1cm4ocGxheWVyLmdhbWVCb2FyZCwgeSwgeCk7XG4gICAgICAgICAgY3JlYXRlQ2VsbHMocGxheWVyR3JpZCwgcGxheWVyLmdhbWVCb2FyZC5ib2FyZCwgcGxheWVyLmdldFR5cGUoKSk7XG4gICAgICAgICAgc2V0TWFwSW5mb0NvbnRlbnQocGxheWVyRGlzcGxheVRhYmxlLCByZXN1bHQpO1xuICAgICAgICAgIGlmIChwbGF5ZXIuZ2FtZUJvYXJkLmdldFdhc0F0dGFja1N1Y2Nlc2Z1bCgpKSB7XG4gICAgICAgICAgICBpZiAocGxheWVyLmdhbWVCb2FyZC5hbGxTdW5rKCkpIHtcbiAgICAgICAgICAgICAgc2V0TWFwSW5mb0NvbnRlbnQoXG4gICAgICAgICAgICAgICAgcGxheWVyRGlzcGxheVRhYmxlLFxuICAgICAgICAgICAgICAgIFwiRGFtbiwgeW91IGdvdCBiZWF0ZW4gYnkgYW4gZXh0cmVtZWx5IGR1bWIgQUkuLi5cIixcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGdhbWVMb29wKHBsYXllciwgYm90LCBwbGF5ZXJEaXNwbGF5VGFibGUsIGJvdERpc3BsYXlUYWJsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBnYW1lTG9vcChwbGF5ZXIsIGJvdCwgcGxheWVyRGlzcGxheVRhYmxlLCBib3REaXNwbGF5VGFibGUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gbG9hZFNlY29uZFBhZ2UobmV3UGxheWVyKSB7XG4gIGNvbnN0IGJvdCA9IFBsYXllcihcIkFJXCIsIFwiYm90XCIpO1xuICBjb25zdCBwbGF5ZXIgPSBuZXdQbGF5ZXI7XG5cbiAgY29uc3QgQk9EWSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xuXG4gIGNvbnN0IHBsYXllckRpc3BsYXlUYWJsZSA9IGNyZWF0ZU1hcChcbiAgICBcIkZyaWVuZGx5LVdhdGVyc1wiLFxuICAgIHBsYXllci5nYW1lQm9hcmQuYm9hcmQsXG4gICAgXCJwbGF5ZXJcIixcbiAgKTtcbiAgY29uc3QgYm90RGlzcGxheVRhYmxlID0gY3JlYXRlTWFwKFwiRW5lbXktV2F0ZXJzXCIsIGJvdC5nYW1lQm9hcmQuYm9hcmQsIFwiYm90XCIpO1xuXG4gIEJPRFkuYXBwZW5kQ2hpbGQocGxheWVyRGlzcGxheVRhYmxlKTtcbiAgQk9EWS5hcHBlbmRDaGlsZChib3REaXNwbGF5VGFibGUpO1xuXG4gIGdhbWVMb29wKHBsYXllciwgYm90LCBwbGF5ZXJEaXNwbGF5VGFibGUsIGJvdERpc3BsYXlUYWJsZSk7XG59XG5cbmZ1bmN0aW9uIGxvYWRGaXJzdFBhZ2UoKSB7XG4gIGNvbnN0IEJPRFkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcblxuICBjb25zdCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIik7XG4gIGZvcm0uY2xhc3NMaXN0LmFkZChcImZpcnN0LWZvcm1cIik7XG4gIEJPRFkuYXBwZW5kQ2hpbGQoZm9ybSk7XG5cbiAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gIGlucHV0LnZhbHVlID0gXCJQbGF5ZXJcIjtcbiAgZm9ybS5hcHBlbmRDaGlsZChpbnB1dCk7XG5cbiAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJmaXJzdC1idXR0b25cIik7XG4gIGJ1dHRvbi5pbm5lclRleHQgPSBcIkNyZWF0ZSBQbGF5ZXJcIjtcbiAgZm9ybS5hcHBlbmRDaGlsZChidXR0b24pO1xuXG4gIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBpZiAoIWlucHV0LnZhbHVlKSByZXR1cm47XG5cbiAgICBjb25zdCBwbGF5ZXIgPSBQbGF5ZXIoaW5wdXQudmFsdWUsIFwiaHVtYW5cIik7XG5cbiAgICByZW1vdmVQYWdlRWxlbWVudHMoKTtcblxuICAgIGxvYWRTZWNvbmRQYWdlKHBsYXllcik7XG4gIH0pO1xufVxuXG5sb2FkRmlyc3RQYWdlKCk7XG4iXSwibmFtZXMiOlsiU2hpcCIsIkdhbWVCb2FyZCIsInJhbmRvbU51bWJlciIsIm51bWJlciIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImJvYXJkIiwiQXJyYXkiLCJmaWxsIiwibWFwIiwiY2FycmllciIsImJhdHRsZXNoaXAiLCJjcnVpc2VyIiwic3VibWFyaW5lIiwiZGVzdHJveWVyIiwic2hpcHMiLCJmbGVldCIsInBsYWNlU2hpcFgiLCJzaGlwIiwieSIsIngiLCJsZW5ndGgiLCJnZXRMZW5ndGgiLCJwb3NpdGlvbiIsInVuZGVmaW5lZCIsImkiLCJwdXNoIiwiYSIsImIiLCJwb3AiLCJnZXROYW1lIiwicGxhY2VTaGlwWSIsInBsYWNlU2hpcHMiLCJmbGVldENvdW50IiwiZm9yRWFjaCIsIndhc0F0dGFja1N1Y2Nlc2Z1bCIsImdldFdhc0F0dGFja1N1Y2Nlc2Z1bCIsInJlY2VpdmVBdHRhY2siLCJ2YWx1ZSIsInJlc3VsdCIsImVuZHNXaXRoIiwiZmlsdGVyIiwidGhpc1NoaXAiLCJoaXQiLCJnZXRTdW5rIiwiaW5kZXgiLCJpbmRleE9mIiwic3BsaWNlIiwiYWxsU3VuayIsIkJPQVJEX1NJWkUiLCJyZW1vdmVQYWdlRWxlbWVudHMiLCJCT0RZIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwibGFzdENoaWxkIiwicmVtb3ZlIiwiY3JlYXRlTGV0dGVyc1NlY3Rpb24iLCJsZXR0ZXJDb250YWluZXIiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwibGV0dGVycyIsImVsZW1lbnQiLCJsZXR0ZXIiLCJjbGFzc05hbWUiLCJ0ZXh0Q29udGVudCIsImFwcGVuZENoaWxkIiwiY3JlYXRlTnVtYmVyc1NlY3Rpb24iLCJudW1iZXJDb250YWluZXIiLCJpZCIsIm51bWJlcnMiLCJjbGVhckNlbGxzIiwiZ3JpZCIsImNyZWF0ZUNlbGxzIiwiZ2FtZUJvYXJkIiwiYm9hcmRUeXBlIiwiaiIsImNlbGwiLCJkYXRhc2V0IiwiY2VsbFZhbHVlIiwiaW5uZXJUZXh0IiwiY3JlYXRlR3JpZCIsImRlc2NyaXB0aW9uIiwiY3JlYXRlVGl0bGUiLCJ0aXRsZSIsImFkZCIsImNyZWF0ZUluZm8iLCJpbmZvIiwic2V0TWFwSW5mb0NvbnRlbnQiLCJtZXNzYWdlIiwiY3JlYXRlTWFwIiwiUGxheWVyIiwicGxheWVyTmFtZSIsInBsYXllclR5cGUiLCJuYW1lIiwidHlwZSIsImdldFR5cGUiLCJwbGF5VHVybiIsImVuZW15Qm9hcmQiLCJzaGlwTmFtZSIsInNoaXBMZW5ndGgiLCJudW1iZXJPZkhpdHMiLCJpc1N1bmsiLCJjb29yZGluYXRlcyIsImdldEhpdHMiLCJzaW5rU2hpcCIsImdhbWVMb29wIiwicGxheWVyIiwiYm90IiwicGxheWVyRGlzcGxheVRhYmxlIiwiYm90RGlzcGxheVRhYmxlIiwicGxheWVyR3JpZCIsImJvdEdyaWQiLCJib3RDZWxscyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJhZGRFdmVudExpc3RlbmVyIiwibG9hZFNlY29uZFBhZ2UiLCJuZXdQbGF5ZXIiLCJsb2FkRmlyc3RQYWdlIiwiZm9ybSIsImlucHV0IiwiYnV0dG9uIiwiZSIsInByZXZlbnREZWZhdWx0Il0sInNvdXJjZVJvb3QiOiIifQ==