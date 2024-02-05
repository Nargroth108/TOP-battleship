import GameBoard from "./gameboard";

const gb = GameBoard();

const { board } = gb;
console.table(board);

gb.receiveAttack(0, 0);
gb.receiveAttack(1, 0);
gb.receiveAttack(0, 2);
gb.receiveAttack(0, 3);
gb.receiveAttack(1, 3);
gb.receiveAttack(2, 3);
gb.receiveAttack(3, 3);
