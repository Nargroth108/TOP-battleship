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
  const randomNumberToNine = Math.floor(Math.random() * 10);
  const randomNumberToOne = Math.floor(Math.random());
  const board = new Array(10).fill("o").map(() => new Array(10).fill("o"));
  const carrier = (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])("carrier", 5);
  const battleship = (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])("battleship", 4);
  const cruiser = (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])("cruiser", 3);
  const submarine = (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])("submarine", 3);
  const destroyer = (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])("destroyer", 2);
  const fleet = [carrier, battleship, cruiser, submarine, destroyer];
  function placeShipX(ship, y, x) {
    const length = ship.getLength();
    const position = [];
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
    const length = ship.getLength();
    const position = [];
    for (let i = 0; i < length; i++) {
      if (board[y + i][x] === "o") position.push([y + i, x]);else break;
    }
    if (position.length === length) {
      while (position[0]) {
        const [a, b] = position.pop();
        board[a][b] = ship.getName();
      }
      fleet.push(ship);
    }
  }

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
console.log(board);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SUFBRWQsU0FBUztJQUFFTyxPQUFPO0lBQUVTLE9BQU87SUFBRUQsT0FBTztJQUFFRztFQUFJLENBQUM7QUFDbkU7Ozs7OztVQ3RCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTm9DO0FBRXBDLE1BQU1DLEVBQUUsR0FBR3hDLHNEQUFTLENBQUMsQ0FBQztBQUV0QixNQUFNO0VBQUVNO0FBQU0sQ0FBQyxHQUFHa0MsRUFBRTtBQUNwQkMsT0FBTyxDQUFDQyxHQUFHLENBQUNwQyxLQUFLLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3Rlc3QvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL3Rlc3QvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly90ZXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Rlc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Rlc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90ZXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdGVzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEdhbWVCb2FyZCgpIHtcbiAgY29uc3QgcmFuZG9tTnVtYmVyVG9OaW5lID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICBjb25zdCByYW5kb21OdW1iZXJUb09uZSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSk7XG5cbiAgY29uc3QgYm9hcmQgPSBuZXcgQXJyYXkoMTApLmZpbGwoXCJvXCIpLm1hcCgoKSA9PiBuZXcgQXJyYXkoMTApLmZpbGwoXCJvXCIpKTtcblxuICBjb25zdCBjYXJyaWVyID0gU2hpcChcImNhcnJpZXJcIiwgNSk7XG4gIGNvbnN0IGJhdHRsZXNoaXAgPSBTaGlwKFwiYmF0dGxlc2hpcFwiLCA0KTtcbiAgY29uc3QgY3J1aXNlciA9IFNoaXAoXCJjcnVpc2VyXCIsIDMpO1xuICBjb25zdCBzdWJtYXJpbmUgPSBTaGlwKFwic3VibWFyaW5lXCIsIDMpO1xuICBjb25zdCBkZXN0cm95ZXIgPSBTaGlwKFwiZGVzdHJveWVyXCIsIDIpO1xuXG4gIGNvbnN0IGZsZWV0ID0gW2NhcnJpZXIsIGJhdHRsZXNoaXAsIGNydWlzZXIsIHN1Ym1hcmluZSwgZGVzdHJveWVyXTtcblxuICBmdW5jdGlvbiBwbGFjZVNoaXBYKHNoaXAsIHksIHgpIHtcbiAgICBjb25zdCBsZW5ndGggPSBzaGlwLmdldExlbmd0aCgpO1xuICAgIGNvbnN0IHBvc2l0aW9uID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoYm9hcmRbeV1beCArIGldID09PSBcIm9cIikgcG9zaXRpb24ucHVzaChbeSwgeCArIGldKTtcbiAgICAgIGVsc2UgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKHBvc2l0aW9uLmxlbmd0aCA9PT0gbGVuZ3RoKSB7XG4gICAgICB3aGlsZSAocG9zaXRpb25bMF0pIHtcbiAgICAgICAgY29uc3QgW2EsIGJdID0gcG9zaXRpb24ucG9wKCk7XG4gICAgICAgIGJvYXJkW2FdW2JdID0gc2hpcC5nZXROYW1lKCk7XG4gICAgICB9XG4gICAgICBmbGVldC5wdXNoKHNoaXApO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBsYWNlU2hpcFkoc2hpcCwgeSwgeCkge1xuICAgIGNvbnN0IGxlbmd0aCA9IHNoaXAuZ2V0TGVuZ3RoKCk7XG4gICAgY29uc3QgcG9zaXRpb24gPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChib2FyZFt5ICsgaV1beF0gPT09IFwib1wiKSBwb3NpdGlvbi5wdXNoKFt5ICsgaSwgeF0pO1xuICAgICAgZWxzZSBicmVhaztcbiAgICB9XG5cbiAgICBpZiAocG9zaXRpb24ubGVuZ3RoID09PSBsZW5ndGgpIHtcbiAgICAgIHdoaWxlIChwb3NpdGlvblswXSkge1xuICAgICAgICBjb25zdCBbYSwgYl0gPSBwb3NpdGlvbi5wb3AoKTtcbiAgICAgICAgYm9hcmRbYV1bYl0gPSBzaGlwLmdldE5hbWUoKTtcbiAgICAgIH1cbiAgICAgIGZsZWV0LnB1c2goc2hpcCk7XG4gICAgfVxuICB9XG5cbiAgLy8gICBmdW5jdGlvbiByZWNlaXZlQXR0YWNrKHgsIHkpIHtcbiAgLy8gICAgIGlmIChib2FyZFt4XVt5XSA9PT0gdW5kZWZpbmVkKSB7XG4gIC8vICAgICAgIGJvYXJkW3hdW3ldID0gXCJtaXNzZWRcIjtcbiAgLy8gICAgIH0gZWxzZSB7XG4gIC8vICAgICAgIGNvbnN0IHNoaXAgPSBib2FyZFt4XVt5XTtcbiAgLy8gICAgICAgc2hpcC5oaXQoKTtcbiAgLy8gICAgIH1cbiAgLy8gICAgIHJldHVybiBib2FyZFt4XVt5XTtcbiAgLy8gICB9XG5cbiAgcmV0dXJuIHsgYm9hcmQsIHBsYWNlU2hpcFgsIHBsYWNlU2hpcFksIGZsZWV0IH07XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTaGlwKHNoaXBOYW1lLCBzaGlwTGVuZ3RoKSB7XG4gIGNvbnN0IG5hbWUgPSBzaGlwTmFtZTtcbiAgY29uc3QgbGVuZ3RoID0gc2hpcExlbmd0aDtcbiAgbGV0IG51bWJlck9mSGl0cyA9IDA7XG4gIGxldCBpc1N1bmsgPSBmYWxzZTtcbiAgY29uc3QgY29vcmRpbmF0ZXMgPSBbXTtcblxuICBjb25zdCBnZXROYW1lID0gKCkgPT4gbmFtZTtcbiAgY29uc3QgZ2V0TGVuZ3RoID0gKCkgPT4gbGVuZ3RoO1xuICBjb25zdCBnZXRIaXRzID0gKCkgPT4gbnVtYmVyT2ZIaXRzO1xuICBjb25zdCBnZXRTdW5rID0gKCkgPT4gaXNTdW5rO1xuXG4gIGZ1bmN0aW9uIHNpbmtTaGlwKCkge1xuICAgIGlzU3VuayA9IHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiBoaXQoKSB7XG4gICAgbnVtYmVyT2ZIaXRzICs9IDE7XG4gICAgaWYgKG51bWJlck9mSGl0cyA9PT0gbGVuZ3RoKSBzaW5rU2hpcCgpO1xuICB9XG5cbiAgcmV0dXJuIHsgY29vcmRpbmF0ZXMsIGdldExlbmd0aCwgZ2V0TmFtZSwgZ2V0U3VuaywgZ2V0SGl0cywgaGl0IH07XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBHYW1lQm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5cbmNvbnN0IGdiID0gR2FtZUJvYXJkKCk7XG5cbmNvbnN0IHsgYm9hcmQgfSA9IGdiO1xuY29uc29sZS5sb2coYm9hcmQpO1xuIl0sIm5hbWVzIjpbIlNoaXAiLCJHYW1lQm9hcmQiLCJyYW5kb21OdW1iZXJUb05pbmUiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJyYW5kb21OdW1iZXJUb09uZSIsImJvYXJkIiwiQXJyYXkiLCJmaWxsIiwibWFwIiwiY2FycmllciIsImJhdHRsZXNoaXAiLCJjcnVpc2VyIiwic3VibWFyaW5lIiwiZGVzdHJveWVyIiwiZmxlZXQiLCJwbGFjZVNoaXBYIiwic2hpcCIsInkiLCJ4IiwibGVuZ3RoIiwiZ2V0TGVuZ3RoIiwicG9zaXRpb24iLCJpIiwicHVzaCIsImEiLCJiIiwicG9wIiwiZ2V0TmFtZSIsInBsYWNlU2hpcFkiLCJzaGlwTmFtZSIsInNoaXBMZW5ndGgiLCJuYW1lIiwibnVtYmVyT2ZIaXRzIiwiaXNTdW5rIiwiY29vcmRpbmF0ZXMiLCJnZXRIaXRzIiwiZ2V0U3VuayIsInNpbmtTaGlwIiwiaGl0IiwiZ2IiLCJjb25zb2xlIiwibG9nIl0sInNvdXJjZVJvb3QiOiIifQ==