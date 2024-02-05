import GameBoard from "./gameboard";

const gb = GameBoard();

const { board } = gb;
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
