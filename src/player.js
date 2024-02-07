import GameBoard from "./gameboard";

export default function Player(playerName, playerType) {
  const name = playerName;
  const type = playerType;

  const gameBoard = GameBoard();

  const getName = () => name;
  const getType = () => type;

  function playBotTurn(enemyBoard) {
    const randomNumber = (number) => Math.floor(Math.random() * number);

    enemyBoard.receiveAttack(randomNumber(10), randomNumber(10));
  }

  return { gameBoard, getName, getType, playBotTurn };
}
