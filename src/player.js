import GameBoard from "./gameboard";

export default function Player(playerName, playerType) {
  const name = playerName;
  const type = playerType;

  const gameBoard = GameBoard();

  const getName = () => name;
  const getType = () => type;

  function playTurn(enemyBoard, y, x) {
    let result;

    if (getType() === "bot") {
      const randomNumber = (number) => Math.floor(Math.random() * number);

      result = enemyBoard.receiveAttack(randomNumber(10), randomNumber(10));
      if (enemyBoard.getWasAttackSuccesful() === false) {
        result = playTurn(enemyBoard);
      }
      return result;
    }

    result = enemyBoard.receiveAttack(y, x);
    return result;
  }

  return { gameBoard, getName, getType, playTurn };
}
