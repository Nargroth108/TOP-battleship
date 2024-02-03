export default function Ship(length) {
  let hitCount = 0;
  let sunk = false;

  function hit() {
    hitCount += 1;
    return hitCount;
  }

  function isSunk() {
    if (length === hitCount) {
      sunk = true;
    }
  }

  return { length, hitCount, sunk, hit, isSunk };
}
