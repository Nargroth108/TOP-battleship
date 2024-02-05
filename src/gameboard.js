import Ship from "./ship";

export default function GameBoard() {
  const randomNumber = (number) => Math.floor(Math.random() * number);

  const board = new Array(10).fill("o").map(() => new Array(10).fill("o"));

  const carrier = Ship("carrier", 5);
  const battleship = Ship("battleship", 4);
  const cruiser = Ship("cruiser", 3);
  const submarine = Ship("submarine", 3);
  const destroyer = Ship("destroyer", 2);

  const ships = [carrier, battleship, cruiser, submarine, destroyer];
  const fleet = [];

  function placeShipX(ship, y, x) {
    // console.log(`psX: ${ship.getName()}; ${y}, ${x}`);
    const length = ship.getLength();
    const position = [];

    if (board[y][x + length] === undefined) return;

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
    ships.forEach((ship) => {
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

  return { board, placeShipX, placeShipY, fleet };
}
