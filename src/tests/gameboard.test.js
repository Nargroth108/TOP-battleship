// /* eslint-disable no-undef */

// import GameBoard from "../gameboard";
// import Ship from "../ship";

// const gameboard = GameBoard();
// const testShipOne = Ship("testShipOne", 1);
// gameboard.placeShipX(testShipOne, 0, 0);

// const testShipTwo = Ship("testShipTwo", 2);
// gameboard.placeShipX(testShipTwo, 1, 1);

// // test("Correctly stores ships coordinates", () => {
// //   expect(testShipOne.coordinates).toStrictEqual([[0, 0]]);
// // });

// // test("Correctly stores ships coordinates when ship is longer", () => {
// //   expect(testShipTwo.coordinates).toStrictEqual([[1, 1], [1, 2]]);
// // });

// test("Correctly stores ships coordinates in board cell", () => {
//   expect(gameboard.board[0][0]).toStrictEqual(testShipOne);
// });

// test("Correctly stores ships coordinates in board cell when ship is longer", () => {
//   expect(gameboard.board[1][1]).toStrictEqual(testShipTwo);
//   expect(gameboard.board[1][2]).toStrictEqual(testShipTwo);
// });

// test("Doesn't store ships coordinates in board cell when cell is taken", () => {
//   const testShipThree = Ship("testShipThree", 2);
//   gameboard.placeShipX(testShipThree, 1, 0);

//   expect(gameboard.board[1][0]).toBe(undefined);
//   expect(gameboard.board[1][1]).toBe(testShipTwo);
// });

// // test("Gameboard's receiveAttack function, that takes 2 coordinates and attacks that cell.", () => {
// //   expect(gameboard.receiveAttack(0, 1)).toBe("missed");
// //   expect(gameboard.receiveAttack(0, 0)).toBe(testShipOne);
// // });
