import Ship from "./ship";

export default function GameBoard() {
  const randomNumberToNine = Math.floor(Math.random() * 10);
  const randomNumberToOne = Math.floor(Math.random());

  const board = new Array(10).fill("o").map(() => new Array(10).fill("o"));

  const carrier = Ship("carrier", 5);
  const battleship = Ship("battleship", 4);
  const cruiser = Ship("cruiser", 3);
  const submarine = Ship("submarine", 3);
  const destroyer = Ship("destroyer", 2);

  const fleet = [carrier, battleship, cruiser, submarine, destroyer];

  function placeShipX(ship, y, x) {
    const length = ship.getLength();
    const position = [];

    for (let i = 0; i < length; i++) {
      if (board[y][x + i] === "o") position.push([y, x + i]);
      else break;
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
      if (board[y + i][x] === "o") position.push([y + i, x]);
      else break;
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

  return { board, placeShipX, placeShipY, fleet };
}
