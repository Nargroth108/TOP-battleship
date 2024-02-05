export default function Ship(shipName, shipLength) {
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

  return { coordinates, getLength, getName, getSunk, getHits, hit };
}
