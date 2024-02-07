const BOARD_SIZE = 10;

function removePageElements() {
  const BODY = document.querySelector("body");

  while (BODY.lastChild) BODY.lastChild.remove();
}

function createLettersSection() {
  const letterContainer = document.createElement("div");
  letterContainer.classList = "letter-container";
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  letters.forEach((element) => {
    const letter = document.createElement("div");
    letter.className = "letter";
    letter.textContent = element;
    letterContainer.appendChild(letter);
  });

  return letterContainer;
}

function createNumbersSection() {
  const numberContainer = document.createElement("div");
  numberContainer.id = "number-container";
  numberContainer.classList = "number-container";
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  numbers.forEach((element) => {
    const number = document.createElement("div");
    number.classList = "number";
    number.textContent = element;
    numberContainer.appendChild(number);
  });

  return numberContainer;
}

function clearCells(grid) {
  while (grid.lastChild) grid.lastChild.remove();
}

function createCells(grid, gameBoard, boardType) {
  clearCells(grid);

  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.y = i;
      cell.dataset.x = j;
      const cellValue = (() => {
        if (gameBoard[i][j] === "o") return "";
        if (gameBoard[i][j] === "x") return "X";
        if (gameBoard[i][j].endsWith("Shot")) return "☠";
        if (boardType === "bot") return "";
        return "🚢";
      })();
      cell.innerText = cellValue;
      grid.appendChild(cell);
    }
  }
}

function createGrid(description, gameBoard, boardType) {
  const grid = document.createElement("div");
  grid.id = `cell-container-${description}`;
  grid.className = `cell-container`;

  createCells(grid, gameBoard, boardType);

  return grid;
}

function createTitle(description) {
  const title = document.createElement("div");
  title.classList.add("map-title");
  title.innerText = description;
  return title;
}

function createMap(description, gameBoard, boardType) {
  const map = document.createElement("div");
  map.id = `board-${description}`;
  map.classList.add("board", description);

  map.appendChild(createLettersSection());
  map.appendChild(createNumbersSection());
  map.appendChild(createGrid(description, gameBoard, boardType));
  map.appendChild(createTitle(description));

  return map;
}

export { createCells, createMap, removePageElements };
