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
  function receiveAttack(y, x) {
    const value = board[y][x];
    if (value === "o") {
      board[y][x] = "missed";
      return true;
    }
    if (value === "missed" || value.endsWith("Shot")) {
      console.log("dupe shot");
      return false;
    }
    const ship = fleet.filter(thisShip => thisShip.getName() === value)[0];
    board[y][x] = `${value}Shot`;
    if (ship.getSunk()) {
      const index = fleet.indexOf(ship);
      fleet.splice(index, 1);
    }
    return true;
  }
  function allSunk() {
    if (fleet.length === 0) return true;
    return false;
  }
  return {
    board,
    receiveAttack,
    allSunk
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
gb.receiveAttack(0, 0);
gb.receiveAttack(1, 1);
gb.receiveAttack(2, 2);
gb.receiveAttack(3, 3);
gb.receiveAttack(4, 4);
gb.receiveAttack(5, 5);
gb.receiveAttack(6, 6);
gb.receiveAttack(6, 6);
console.table(board);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUN0QnFCLEVBQUUsQ0FBQ3JCLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3RCcUIsRUFBRSxDQUFDckIsYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDdEJxQixFQUFFLENBQUNyQixhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUN0QnFCLEVBQUUsQ0FBQ3JCLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3RCcUIsRUFBRSxDQUFDckIsYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDdEJxQixFQUFFLENBQUNyQixhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUN0QnFCLEVBQUUsQ0FBQ3JCLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBRXRCRyxPQUFPLENBQUNtQixLQUFLLENBQUNuRCxLQUFLLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3Rlc3QvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL3Rlc3QvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly90ZXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Rlc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Rlc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90ZXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdGVzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEdhbWVCb2FyZCgpIHtcbiAgY29uc3QgcmFuZG9tTnVtYmVyID0gKG51bWJlcikgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbnVtYmVyKTtcblxuICBjb25zdCBib2FyZCA9IG5ldyBBcnJheSgxMCkuZmlsbChcIm9cIikubWFwKCgpID0+IG5ldyBBcnJheSgxMCkuZmlsbChcIm9cIikpO1xuXG4gIGNvbnN0IGNhcnJpZXIgPSBTaGlwKFwiY2FycmllclwiLCA1KTtcbiAgY29uc3QgYmF0dGxlc2hpcCA9IFNoaXAoXCJiYXR0bGVzaGlwXCIsIDQpO1xuICBjb25zdCBjcnVpc2VyID0gU2hpcChcImNydWlzZXJcIiwgMyk7XG4gIGNvbnN0IHN1Ym1hcmluZSA9IFNoaXAoXCJzdWJtYXJpbmVcIiwgMyk7XG4gIGNvbnN0IGRlc3Ryb3llciA9IFNoaXAoXCJkZXN0cm95ZXJcIiwgMik7XG5cbiAgY29uc3Qgc2hpcHMgPSBbY2FycmllciwgYmF0dGxlc2hpcCwgY3J1aXNlciwgc3VibWFyaW5lLCBkZXN0cm95ZXJdO1xuICBjb25zdCBmbGVldCA9IFtdO1xuXG4gIGZ1bmN0aW9uIHBsYWNlU2hpcFgoc2hpcCwgeSwgeCkge1xuICAgIC8vIGNvbnNvbGUubG9nKGBwc1g6ICR7c2hpcC5nZXROYW1lKCl9OyAke3l9LCAke3h9YCk7XG4gICAgY29uc3QgbGVuZ3RoID0gc2hpcC5nZXRMZW5ndGgoKTtcbiAgICBjb25zdCBwb3NpdGlvbiA9IFtdO1xuXG4gICAgaWYgKGJvYXJkW3ldW3ggKyBsZW5ndGhdID09PSB1bmRlZmluZWQpIHJldHVybjtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChib2FyZFt5XVt4ICsgaV0gPT09IFwib1wiKSBwb3NpdGlvbi5wdXNoKFt5LCB4ICsgaV0pO1xuICAgICAgZWxzZSBicmVhaztcbiAgICB9XG5cbiAgICBpZiAocG9zaXRpb24ubGVuZ3RoID09PSBsZW5ndGgpIHtcbiAgICAgIHdoaWxlIChwb3NpdGlvblswXSkge1xuICAgICAgICBjb25zdCBbYSwgYl0gPSBwb3NpdGlvbi5wb3AoKTtcbiAgICAgICAgYm9hcmRbYV1bYl0gPSBzaGlwLmdldE5hbWUoKTtcbiAgICAgIH1cbiAgICAgIGZsZWV0LnB1c2goc2hpcCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcGxhY2VTaGlwWShzaGlwLCB5LCB4KSB7XG4gICAgLy8gY29uc29sZS5sb2coYHBzWTogJHtzaGlwLmdldE5hbWUoKX07ICR7eX0sICR7eH1gKTtcbiAgICBjb25zdCBsZW5ndGggPSBzaGlwLmdldExlbmd0aCgpO1xuICAgIGNvbnN0IHBvc2l0aW9uID0gW107XG5cbiAgICBpZiAoYm9hcmRbeSArIGxlbmd0aF0gPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGJvYXJkW3kgKyBpXVt4XSA9PT0gXCJvXCIpIHtcbiAgICAgICAgcG9zaXRpb24ucHVzaChbeSArIGksIHhdKTtcbiAgICAgIH0gZWxzZSBicmVhaztcbiAgICB9XG5cbiAgICBpZiAocG9zaXRpb24ubGVuZ3RoID09PSBsZW5ndGgpIHtcbiAgICAgIHdoaWxlIChwb3NpdGlvblswXSkge1xuICAgICAgICBjb25zdCBbYSwgYl0gPSBwb3NpdGlvbi5wb3AoKTtcbiAgICAgICAgYm9hcmRbYV1bYl0gPSBzaGlwLmdldE5hbWUoKTtcbiAgICAgIH1cbiAgICAgIGZsZWV0LnB1c2goc2hpcCk7XG4gICAgfVxuICB9XG5cbiAgKGZ1bmN0aW9uIHBsYWNlU2hpcHMoKSB7XG4gICAgbGV0IGZsZWV0Q291bnQgPSAwO1xuICAgIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgIC8vICAgY29uc29sZS5sb2coYm9hcmQpO1xuICAgICAgd2hpbGUgKGZsZWV0Lmxlbmd0aCAhPT0gZmxlZXRDb3VudCArIDEpIHtcbiAgICAgICAgaWYgKHJhbmRvbU51bWJlcigyKSA9PT0gMSkge1xuICAgICAgICAgIHBsYWNlU2hpcFgoc2hpcCwgcmFuZG9tTnVtYmVyKDEwKSwgcmFuZG9tTnVtYmVyKDEwKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGxhY2VTaGlwWShzaGlwLCByYW5kb21OdW1iZXIoMTApLCByYW5kb21OdW1iZXIoMTApKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZmxlZXRDb3VudCArPSAxO1xuICAgIH0pO1xuICB9KSgpO1xuXG4gIGZ1bmN0aW9uIHJlY2VpdmVBdHRhY2soeSwgeCkge1xuICAgIGNvbnN0IHZhbHVlID0gYm9hcmRbeV1beF07XG4gICAgaWYgKHZhbHVlID09PSBcIm9cIikge1xuICAgICAgYm9hcmRbeV1beF0gPSBcIm1pc3NlZFwiO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmICh2YWx1ZSA9PT0gXCJtaXNzZWRcIiB8fCB2YWx1ZS5lbmRzV2l0aChcIlNob3RcIikpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiZHVwZSBzaG90XCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHNoaXAgPSBmbGVldC5maWx0ZXIoKHRoaXNTaGlwKSA9PiB0aGlzU2hpcC5nZXROYW1lKCkgPT09IHZhbHVlKVswXTtcbiAgICBib2FyZFt5XVt4XSA9IGAke3ZhbHVlfVNob3RgO1xuXG4gICAgaWYgKHNoaXAuZ2V0U3VuaygpKSB7XG4gICAgICBjb25zdCBpbmRleCA9IGZsZWV0LmluZGV4T2Yoc2hpcCk7XG4gICAgICBmbGVldC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gYWxsU3VuaygpIHtcbiAgICBpZiAoZmxlZXQubGVuZ3RoID09PSAwKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4geyBib2FyZCwgcmVjZWl2ZUF0dGFjaywgYWxsU3VuayB9O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU2hpcChzaGlwTmFtZSwgc2hpcExlbmd0aCkge1xuICBjb25zdCBuYW1lID0gc2hpcE5hbWU7XG4gIGNvbnN0IGxlbmd0aCA9IHNoaXBMZW5ndGg7XG4gIGxldCBudW1iZXJPZkhpdHMgPSAwO1xuICBsZXQgaXNTdW5rID0gZmFsc2U7XG4gIGNvbnN0IGNvb3JkaW5hdGVzID0gW107XG5cbiAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IG5hbWU7XG4gIGNvbnN0IGdldExlbmd0aCA9ICgpID0+IGxlbmd0aDtcbiAgY29uc3QgZ2V0SGl0cyA9ICgpID0+IG51bWJlck9mSGl0cztcbiAgY29uc3QgZ2V0U3VuayA9ICgpID0+IGlzU3VuaztcblxuICBmdW5jdGlvbiBzaW5rU2hpcCgpIHtcbiAgICBpc1N1bmsgPSB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gaGl0KCkge1xuICAgIG51bWJlck9mSGl0cyArPSAxO1xuICAgIGlmIChudW1iZXJPZkhpdHMgPT09IGxlbmd0aCkgc2lua1NoaXAoKTtcbiAgfVxuXG4gIHJldHVybiB7IGNvb3JkaW5hdGVzLCBnZXRMZW5ndGgsIGdldE5hbWUsIGdldFN1bmssIGdldEhpdHMsIGhpdCB9O1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgR2FtZUJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiO1xuXG5jb25zdCBnYiA9IEdhbWVCb2FyZCgpO1xuXG5jb25zdCB7IGJvYXJkIH0gPSBnYjtcbmNvbnNvbGUudGFibGUoYm9hcmQpO1xuXG5nYi5yZWNlaXZlQXR0YWNrKDAsIDApO1xuZ2IucmVjZWl2ZUF0dGFjaygxLCAxKTtcbmdiLnJlY2VpdmVBdHRhY2soMiwgMik7XG5nYi5yZWNlaXZlQXR0YWNrKDMsIDMpO1xuZ2IucmVjZWl2ZUF0dGFjayg0LCA0KTtcbmdiLnJlY2VpdmVBdHRhY2soNSwgNSk7XG5nYi5yZWNlaXZlQXR0YWNrKDYsIDYpO1xuZ2IucmVjZWl2ZUF0dGFjayg2LCA2KTtcblxuY29uc29sZS50YWJsZShib2FyZCk7XG4iXSwibmFtZXMiOlsiU2hpcCIsIkdhbWVCb2FyZCIsInJhbmRvbU51bWJlciIsIm51bWJlciIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImJvYXJkIiwiQXJyYXkiLCJmaWxsIiwibWFwIiwiY2FycmllciIsImJhdHRsZXNoaXAiLCJjcnVpc2VyIiwic3VibWFyaW5lIiwiZGVzdHJveWVyIiwic2hpcHMiLCJmbGVldCIsInBsYWNlU2hpcFgiLCJzaGlwIiwieSIsIngiLCJsZW5ndGgiLCJnZXRMZW5ndGgiLCJwb3NpdGlvbiIsInVuZGVmaW5lZCIsImkiLCJwdXNoIiwiYSIsImIiLCJwb3AiLCJnZXROYW1lIiwicGxhY2VTaGlwWSIsInBsYWNlU2hpcHMiLCJmbGVldENvdW50IiwiZm9yRWFjaCIsInJlY2VpdmVBdHRhY2siLCJ2YWx1ZSIsImVuZHNXaXRoIiwiY29uc29sZSIsImxvZyIsImZpbHRlciIsInRoaXNTaGlwIiwiZ2V0U3VuayIsImluZGV4IiwiaW5kZXhPZiIsInNwbGljZSIsImFsbFN1bmsiLCJzaGlwTmFtZSIsInNoaXBMZW5ndGgiLCJuYW1lIiwibnVtYmVyT2ZIaXRzIiwiaXNTdW5rIiwiY29vcmRpbmF0ZXMiLCJnZXRIaXRzIiwic2lua1NoaXAiLCJoaXQiLCJnYiIsInRhYmxlIl0sInNvdXJjZVJvb3QiOiIifQ==