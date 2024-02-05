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
    } else {
      const ship = fleet.filter(thisShip => thisShip.getName() === value)[0];
      if (ship.getSunk()) {
        const index = fleet.indexOf(ship);
        fleet.splice(index, 1);
      }
    }
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
gb.receiveAttack(1, 0);
gb.receiveAttack(0, 2);
gb.receiveAttack(0, 3);
gb.receiveAttack(1, 3);
gb.receiveAttack(2, 3);
gb.receiveAttack(3, 3);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEVBQUUsQ0FBQyxDQUFDO0FBQ3RCa0IsRUFBRSxDQUFDbEIsYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDdEJrQixFQUFFLENBQUNsQixhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdGVzdC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vdGVzdC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL3Rlc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdGVzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdGVzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Rlc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90ZXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXBcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gR2FtZUJvYXJkKCkge1xuICBjb25zdCByYW5kb21OdW1iZXIgPSAobnVtYmVyKSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBudW1iZXIpO1xuXG4gIGNvbnN0IGJvYXJkID0gbmV3IEFycmF5KDEwKS5maWxsKFwib1wiKS5tYXAoKCkgPT4gbmV3IEFycmF5KDEwKS5maWxsKFwib1wiKSk7XG5cbiAgY29uc3QgY2FycmllciA9IFNoaXAoXCJjYXJyaWVyXCIsIDUpO1xuICBjb25zdCBiYXR0bGVzaGlwID0gU2hpcChcImJhdHRsZXNoaXBcIiwgNCk7XG4gIGNvbnN0IGNydWlzZXIgPSBTaGlwKFwiY3J1aXNlclwiLCAzKTtcbiAgY29uc3Qgc3VibWFyaW5lID0gU2hpcChcInN1Ym1hcmluZVwiLCAzKTtcbiAgY29uc3QgZGVzdHJveWVyID0gU2hpcChcImRlc3Ryb3llclwiLCAyKTtcblxuICBjb25zdCBzaGlwcyA9IFtjYXJyaWVyLCBiYXR0bGVzaGlwLCBjcnVpc2VyLCBzdWJtYXJpbmUsIGRlc3Ryb3llcl07XG4gIGNvbnN0IGZsZWV0ID0gW107XG5cbiAgZnVuY3Rpb24gcGxhY2VTaGlwWChzaGlwLCB5LCB4KSB7XG4gICAgLy8gY29uc29sZS5sb2coYHBzWDogJHtzaGlwLmdldE5hbWUoKX07ICR7eX0sICR7eH1gKTtcbiAgICBjb25zdCBsZW5ndGggPSBzaGlwLmdldExlbmd0aCgpO1xuICAgIGNvbnN0IHBvc2l0aW9uID0gW107XG5cbiAgICBpZiAoYm9hcmRbeV1beCArIGxlbmd0aF0gPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGJvYXJkW3ldW3ggKyBpXSA9PT0gXCJvXCIpIHBvc2l0aW9uLnB1c2goW3ksIHggKyBpXSk7XG4gICAgICBlbHNlIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChwb3NpdGlvbi5sZW5ndGggPT09IGxlbmd0aCkge1xuICAgICAgd2hpbGUgKHBvc2l0aW9uWzBdKSB7XG4gICAgICAgIGNvbnN0IFthLCBiXSA9IHBvc2l0aW9uLnBvcCgpO1xuICAgICAgICBib2FyZFthXVtiXSA9IHNoaXAuZ2V0TmFtZSgpO1xuICAgICAgfVxuICAgICAgZmxlZXQucHVzaChzaGlwKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwbGFjZVNoaXBZKHNoaXAsIHksIHgpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhgcHNZOiAke3NoaXAuZ2V0TmFtZSgpfTsgJHt5fSwgJHt4fWApO1xuICAgIGNvbnN0IGxlbmd0aCA9IHNoaXAuZ2V0TGVuZ3RoKCk7XG4gICAgY29uc3QgcG9zaXRpb24gPSBbXTtcblxuICAgIGlmIChib2FyZFt5ICsgbGVuZ3RoXSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoYm9hcmRbeSArIGldW3hdID09PSBcIm9cIikge1xuICAgICAgICBwb3NpdGlvbi5wdXNoKFt5ICsgaSwgeF0pO1xuICAgICAgfSBlbHNlIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChwb3NpdGlvbi5sZW5ndGggPT09IGxlbmd0aCkge1xuICAgICAgd2hpbGUgKHBvc2l0aW9uWzBdKSB7XG4gICAgICAgIGNvbnN0IFthLCBiXSA9IHBvc2l0aW9uLnBvcCgpO1xuICAgICAgICBib2FyZFthXVtiXSA9IHNoaXAuZ2V0TmFtZSgpO1xuICAgICAgfVxuICAgICAgZmxlZXQucHVzaChzaGlwKTtcbiAgICB9XG4gIH1cblxuICAoZnVuY3Rpb24gcGxhY2VTaGlwcygpIHtcbiAgICBsZXQgZmxlZXRDb3VudCA9IDA7XG4gICAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgLy8gICBjb25zb2xlLmxvZyhib2FyZCk7XG4gICAgICB3aGlsZSAoZmxlZXQubGVuZ3RoICE9PSBmbGVldENvdW50ICsgMSkge1xuICAgICAgICBpZiAocmFuZG9tTnVtYmVyKDIpID09PSAxKSB7XG4gICAgICAgICAgcGxhY2VTaGlwWChzaGlwLCByYW5kb21OdW1iZXIoMTApLCByYW5kb21OdW1iZXIoMTApKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwbGFjZVNoaXBZKHNoaXAsIHJhbmRvbU51bWJlcigxMCksIHJhbmRvbU51bWJlcigxMCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmbGVldENvdW50ICs9IDE7XG4gICAgfSk7XG4gIH0pKCk7XG5cbiAgZnVuY3Rpb24gcmVjZWl2ZUF0dGFjayh5LCB4KSB7XG4gICAgY29uc3QgdmFsdWUgPSBib2FyZFt5XVt4XTtcbiAgICBpZiAodmFsdWUgPT09IFwib1wiKSB7XG4gICAgICBib2FyZFt5XVt4XSA9IFwibWlzc2VkXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHNoaXAgPSBmbGVldC5maWx0ZXIoKHRoaXNTaGlwKSA9PiB0aGlzU2hpcC5nZXROYW1lKCkgPT09IHZhbHVlKVswXTtcbiAgICAgIGlmIChzaGlwLmdldFN1bmsoKSkge1xuICAgICAgICBjb25zdCBpbmRleCA9IGZsZWV0LmluZGV4T2Yoc2hpcCk7XG4gICAgICAgIGZsZWV0LnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYWxsU3VuaygpIHtcbiAgICBpZiAoZmxlZXQubGVuZ3RoID09PSAwKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4geyBib2FyZCwgcmVjZWl2ZUF0dGFjaywgYWxsU3VuayB9O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU2hpcChzaGlwTmFtZSwgc2hpcExlbmd0aCkge1xuICBjb25zdCBuYW1lID0gc2hpcE5hbWU7XG4gIGNvbnN0IGxlbmd0aCA9IHNoaXBMZW5ndGg7XG4gIGxldCBudW1iZXJPZkhpdHMgPSAwO1xuICBsZXQgaXNTdW5rID0gZmFsc2U7XG4gIGNvbnN0IGNvb3JkaW5hdGVzID0gW107XG5cbiAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IG5hbWU7XG4gIGNvbnN0IGdldExlbmd0aCA9ICgpID0+IGxlbmd0aDtcbiAgY29uc3QgZ2V0SGl0cyA9ICgpID0+IG51bWJlck9mSGl0cztcbiAgY29uc3QgZ2V0U3VuayA9ICgpID0+IGlzU3VuaztcblxuICBmdW5jdGlvbiBzaW5rU2hpcCgpIHtcbiAgICBpc1N1bmsgPSB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gaGl0KCkge1xuICAgIG51bWJlck9mSGl0cyArPSAxO1xuICAgIGlmIChudW1iZXJPZkhpdHMgPT09IGxlbmd0aCkgc2lua1NoaXAoKTtcbiAgfVxuXG4gIHJldHVybiB7IGNvb3JkaW5hdGVzLCBnZXRMZW5ndGgsIGdldE5hbWUsIGdldFN1bmssIGdldEhpdHMsIGhpdCB9O1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgR2FtZUJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiO1xuXG5jb25zdCBnYiA9IEdhbWVCb2FyZCgpO1xuXG5jb25zdCB7IGJvYXJkIH0gPSBnYjtcbmNvbnNvbGUudGFibGUoYm9hcmQpO1xuXG5nYi5yZWNlaXZlQXR0YWNrKDAsIDApO1xuZ2IucmVjZWl2ZUF0dGFjaygxLCAwKTtcbmdiLnJlY2VpdmVBdHRhY2soMCwgMik7XG5nYi5yZWNlaXZlQXR0YWNrKDAsIDMpO1xuZ2IucmVjZWl2ZUF0dGFjaygxLCAzKTtcbmdiLnJlY2VpdmVBdHRhY2soMiwgMyk7XG5nYi5yZWNlaXZlQXR0YWNrKDMsIDMpO1xuIl0sIm5hbWVzIjpbIlNoaXAiLCJHYW1lQm9hcmQiLCJyYW5kb21OdW1iZXIiLCJudW1iZXIiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJib2FyZCIsIkFycmF5IiwiZmlsbCIsIm1hcCIsImNhcnJpZXIiLCJiYXR0bGVzaGlwIiwiY3J1aXNlciIsInN1Ym1hcmluZSIsImRlc3Ryb3llciIsInNoaXBzIiwiZmxlZXQiLCJwbGFjZVNoaXBYIiwic2hpcCIsInkiLCJ4IiwibGVuZ3RoIiwiZ2V0TGVuZ3RoIiwicG9zaXRpb24iLCJ1bmRlZmluZWQiLCJpIiwicHVzaCIsImEiLCJiIiwicG9wIiwiZ2V0TmFtZSIsInBsYWNlU2hpcFkiLCJwbGFjZVNoaXBzIiwiZmxlZXRDb3VudCIsImZvckVhY2giLCJyZWNlaXZlQXR0YWNrIiwidmFsdWUiLCJmaWx0ZXIiLCJ0aGlzU2hpcCIsImdldFN1bmsiLCJpbmRleCIsImluZGV4T2YiLCJzcGxpY2UiLCJhbGxTdW5rIiwic2hpcE5hbWUiLCJzaGlwTGVuZ3RoIiwibmFtZSIsIm51bWJlck9mSGl0cyIsImlzU3VuayIsImNvb3JkaW5hdGVzIiwiZ2V0SGl0cyIsInNpbmtTaGlwIiwiaGl0IiwiZ2IiLCJjb25zb2xlIiwidGFibGUiXSwic291cmNlUm9vdCI6IiJ9