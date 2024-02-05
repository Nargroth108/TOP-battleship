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

  //   function receiveAttack(x, y) {
  //     if (board[x][y] === undefined) {
  //       board[x][y] = "missed";
  //     } else {
  //       const ship = board[x][y];
  //       ship.hit();
  //     }
  //     return board[x][y];
  //   }

  return {
    board,
    placeShipX,
    placeShipY,
    fleet
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
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");

const gb = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])();
const {
  board
} = gb;
console.table(board);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q05vQztBQUVwQyxNQUFNQyxFQUFFLEdBQUc3QyxzREFBUyxDQUFDLENBQUM7QUFFdEIsTUFBTTtFQUFFTTtBQUFNLENBQUMsR0FBR3VDLEVBQUU7QUFDcEJDLE9BQU8sQ0FBQ0MsS0FBSyxDQUFDekMsS0FBSyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90ZXN0Ly4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly90ZXN0Ly4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vdGVzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90ZXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90ZXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdGVzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3Rlc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBHYW1lQm9hcmQoKSB7XG4gIGNvbnN0IHJhbmRvbU51bWJlciA9IChudW1iZXIpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG51bWJlcik7XG5cbiAgY29uc3QgYm9hcmQgPSBuZXcgQXJyYXkoMTApLmZpbGwoXCJvXCIpLm1hcCgoKSA9PiBuZXcgQXJyYXkoMTApLmZpbGwoXCJvXCIpKTtcblxuICBjb25zdCBjYXJyaWVyID0gU2hpcChcImNhcnJpZXJcIiwgNSk7XG4gIGNvbnN0IGJhdHRsZXNoaXAgPSBTaGlwKFwiYmF0dGxlc2hpcFwiLCA0KTtcbiAgY29uc3QgY3J1aXNlciA9IFNoaXAoXCJjcnVpc2VyXCIsIDMpO1xuICBjb25zdCBzdWJtYXJpbmUgPSBTaGlwKFwic3VibWFyaW5lXCIsIDMpO1xuICBjb25zdCBkZXN0cm95ZXIgPSBTaGlwKFwiZGVzdHJveWVyXCIsIDIpO1xuXG4gIGNvbnN0IHNoaXBzID0gW2NhcnJpZXIsIGJhdHRsZXNoaXAsIGNydWlzZXIsIHN1Ym1hcmluZSwgZGVzdHJveWVyXTtcbiAgY29uc3QgZmxlZXQgPSBbXTtcblxuICBmdW5jdGlvbiBwbGFjZVNoaXBYKHNoaXAsIHksIHgpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhgcHNYOiAke3NoaXAuZ2V0TmFtZSgpfTsgJHt5fSwgJHt4fWApO1xuICAgIGNvbnN0IGxlbmd0aCA9IHNoaXAuZ2V0TGVuZ3RoKCk7XG4gICAgY29uc3QgcG9zaXRpb24gPSBbXTtcblxuICAgIGlmIChib2FyZFt5XVt4ICsgbGVuZ3RoXSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoYm9hcmRbeV1beCArIGldID09PSBcIm9cIikgcG9zaXRpb24ucHVzaChbeSwgeCArIGldKTtcbiAgICAgIGVsc2UgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKHBvc2l0aW9uLmxlbmd0aCA9PT0gbGVuZ3RoKSB7XG4gICAgICB3aGlsZSAocG9zaXRpb25bMF0pIHtcbiAgICAgICAgY29uc3QgW2EsIGJdID0gcG9zaXRpb24ucG9wKCk7XG4gICAgICAgIGJvYXJkW2FdW2JdID0gc2hpcC5nZXROYW1lKCk7XG4gICAgICB9XG4gICAgICBmbGVldC5wdXNoKHNoaXApO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBsYWNlU2hpcFkoc2hpcCwgeSwgeCkge1xuICAgIC8vIGNvbnNvbGUubG9nKGBwc1k6ICR7c2hpcC5nZXROYW1lKCl9OyAke3l9LCAke3h9YCk7XG4gICAgY29uc3QgbGVuZ3RoID0gc2hpcC5nZXRMZW5ndGgoKTtcbiAgICBjb25zdCBwb3NpdGlvbiA9IFtdO1xuXG4gICAgaWYgKGJvYXJkW3kgKyBsZW5ndGhdID09PSB1bmRlZmluZWQpIHJldHVybjtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChib2FyZFt5ICsgaV1beF0gPT09IFwib1wiKSB7XG4gICAgICAgIHBvc2l0aW9uLnB1c2goW3kgKyBpLCB4XSk7XG4gICAgICB9IGVsc2UgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKHBvc2l0aW9uLmxlbmd0aCA9PT0gbGVuZ3RoKSB7XG4gICAgICB3aGlsZSAocG9zaXRpb25bMF0pIHtcbiAgICAgICAgY29uc3QgW2EsIGJdID0gcG9zaXRpb24ucG9wKCk7XG4gICAgICAgIGJvYXJkW2FdW2JdID0gc2hpcC5nZXROYW1lKCk7XG4gICAgICB9XG4gICAgICBmbGVldC5wdXNoKHNoaXApO1xuICAgIH1cbiAgfVxuXG4gIChmdW5jdGlvbiBwbGFjZVNoaXBzKCkge1xuICAgIGxldCBmbGVldENvdW50ID0gMDtcbiAgICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICAvLyAgIGNvbnNvbGUubG9nKGJvYXJkKTtcbiAgICAgIHdoaWxlIChmbGVldC5sZW5ndGggIT09IGZsZWV0Q291bnQgKyAxKSB7XG4gICAgICAgIGlmIChyYW5kb21OdW1iZXIoMikgPT09IDEpIHtcbiAgICAgICAgICBwbGFjZVNoaXBYKHNoaXAsIHJhbmRvbU51bWJlcigxMCksIHJhbmRvbU51bWJlcigxMCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBsYWNlU2hpcFkoc2hpcCwgcmFuZG9tTnVtYmVyKDEwKSwgcmFuZG9tTnVtYmVyKDEwKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZsZWV0Q291bnQgKz0gMTtcbiAgICB9KTtcbiAgfSkoKTtcblxuICAvLyAgIGZ1bmN0aW9uIHJlY2VpdmVBdHRhY2soeCwgeSkge1xuICAvLyAgICAgaWYgKGJvYXJkW3hdW3ldID09PSB1bmRlZmluZWQpIHtcbiAgLy8gICAgICAgYm9hcmRbeF1beV0gPSBcIm1pc3NlZFwiO1xuICAvLyAgICAgfSBlbHNlIHtcbiAgLy8gICAgICAgY29uc3Qgc2hpcCA9IGJvYXJkW3hdW3ldO1xuICAvLyAgICAgICBzaGlwLmhpdCgpO1xuICAvLyAgICAgfVxuICAvLyAgICAgcmV0dXJuIGJvYXJkW3hdW3ldO1xuICAvLyAgIH1cblxuICByZXR1cm4geyBib2FyZCwgcGxhY2VTaGlwWCwgcGxhY2VTaGlwWSwgZmxlZXQgfTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFNoaXAoc2hpcE5hbWUsIHNoaXBMZW5ndGgpIHtcbiAgY29uc3QgbmFtZSA9IHNoaXBOYW1lO1xuICBjb25zdCBsZW5ndGggPSBzaGlwTGVuZ3RoO1xuICBsZXQgbnVtYmVyT2ZIaXRzID0gMDtcbiAgbGV0IGlzU3VuayA9IGZhbHNlO1xuICBjb25zdCBjb29yZGluYXRlcyA9IFtdO1xuXG4gIGNvbnN0IGdldE5hbWUgPSAoKSA9PiBuYW1lO1xuICBjb25zdCBnZXRMZW5ndGggPSAoKSA9PiBsZW5ndGg7XG4gIGNvbnN0IGdldEhpdHMgPSAoKSA9PiBudW1iZXJPZkhpdHM7XG4gIGNvbnN0IGdldFN1bmsgPSAoKSA9PiBpc1N1bms7XG5cbiAgZnVuY3Rpb24gc2lua1NoaXAoKSB7XG4gICAgaXNTdW5rID0gdHJ1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhpdCgpIHtcbiAgICBudW1iZXJPZkhpdHMgKz0gMTtcbiAgICBpZiAobnVtYmVyT2ZIaXRzID09PSBsZW5ndGgpIHNpbmtTaGlwKCk7XG4gIH1cblxuICByZXR1cm4geyBjb29yZGluYXRlcywgZ2V0TGVuZ3RoLCBnZXROYW1lLCBnZXRTdW5rLCBnZXRIaXRzLCBoaXQgfTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IEdhbWVCb2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcblxuY29uc3QgZ2IgPSBHYW1lQm9hcmQoKTtcblxuY29uc3QgeyBib2FyZCB9ID0gZ2I7XG5jb25zb2xlLnRhYmxlKGJvYXJkKTtcbiJdLCJuYW1lcyI6WyJTaGlwIiwiR2FtZUJvYXJkIiwicmFuZG9tTnVtYmVyIiwibnVtYmVyIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiYm9hcmQiLCJBcnJheSIsImZpbGwiLCJtYXAiLCJjYXJyaWVyIiwiYmF0dGxlc2hpcCIsImNydWlzZXIiLCJzdWJtYXJpbmUiLCJkZXN0cm95ZXIiLCJzaGlwcyIsImZsZWV0IiwicGxhY2VTaGlwWCIsInNoaXAiLCJ5IiwieCIsImxlbmd0aCIsImdldExlbmd0aCIsInBvc2l0aW9uIiwidW5kZWZpbmVkIiwiaSIsInB1c2giLCJhIiwiYiIsInBvcCIsImdldE5hbWUiLCJwbGFjZVNoaXBZIiwicGxhY2VTaGlwcyIsImZsZWV0Q291bnQiLCJmb3JFYWNoIiwic2hpcE5hbWUiLCJzaGlwTGVuZ3RoIiwibmFtZSIsIm51bWJlck9mSGl0cyIsImlzU3VuayIsImNvb3JkaW5hdGVzIiwiZ2V0SGl0cyIsImdldFN1bmsiLCJzaW5rU2hpcCIsImhpdCIsImdiIiwiY29uc29sZSIsInRhYmxlIl0sInNvdXJjZVJvb3QiOiIifQ==