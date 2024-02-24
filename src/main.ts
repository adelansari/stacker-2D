//* -----------------------
//* PREPARATION PHASE
//* -----------------------

// Select the relevant elements from the page
const grid: HTMLElement | null = document.querySelector(".grid");
const stackBtn: HTMLElement | null = document.querySelector(".stack");
const scoreCounter: HTMLElement | null = document.querySelector(".score-counter");
const endGameScreen: HTMLElement | null = document.querySelector(".end-game-screen");
const endGameText: HTMLElement | null = document.querySelector(".end-game-text");
const playAgainButton: HTMLElement | null = document.querySelector(".play-again");

// Create the matrix for the grid
// 0 = empty cell
// 1 = bar
const gridMatrix: number[][] = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 0], // This is our starting currentRowIndex (see below)
];

// Initialise the variables needed for the game setup
let currentRowIndex: number = gridMatrix.length - 1;
let barDirection: string = "right";
let barSize: number = 3;
let isGameOver: boolean = false;
let score: number = 0;

// *---------------------------
// * FUNCTIONS
// *---------------------------

function draw(): void {
  // First, reset the grid
  if (grid) {
    grid.innerHTML = "";
  }

  gridMatrix.forEach(function (rowContent: number[]) {
    rowContent.forEach(function (cellContent: number) {
      // Create a cell
      const cell: HTMLElement = document.createElement("div");
      cell.classList.add("cell");

      // The cells that the bar occupies
      if (cellContent === 1) {
        cell.classList.add("bar");
      }

      // Put the cell in the grid
      if (grid) {
        grid.appendChild(cell);
      }
    });
  });
}

function moveRight(row: number[]): void {
  row.pop();
  row.unshift(0);
}

function moveLeft(row: number[]): void {
  row.shift();
  row.push(0);
}

function isRightEdge(row: number[]): boolean {
  const lastElement: number = row[row.length - 1];
  return lastElement === 1;
}

function isLeftEdge(row: number[]): boolean {
  const firstElement: number = row[0];
  return firstElement === 1;
}

function moveBar(): void {
  const currentRow: number[] = gridMatrix[currentRowIndex];

  if (barDirection === "right") {
    moveRight(currentRow);

    if (isRightEdge(currentRow)) {
      barDirection = "left";
    }
  } else if (barDirection === "left") {
    moveLeft(currentRow);

    if (isLeftEdge(currentRow)) {
      barDirection = "right";
    }
  }
}

// *---------------------------
// * GAME LOGIC / CONTROLS
// *---------------------------
function endGame(isVictory: boolean): void {
  if (isVictory) {
    if (endGameText) {
      endGameText.innerHTML = "YOU<br>WON";
    }
    if (endGameScreen) {
      endGameScreen.classList.add("win");
    }
  }

  if (endGameScreen) {
    endGameScreen.classList.remove("hidden");
  }
}

function onPlayAgain(): void {
  location.reload();
}

function checkWin(): void {
  if (currentRowIndex === 0 && !isGameOver) {
    updateScore();
    isGameOver = true;
    clearInterval(gameInterval);
    endGame(true);
  }
}

function checkLost(): void {
  const currentRow: number[] = gridMatrix[currentRowIndex];
  const prevRow: number[] = gridMatrix[currentRowIndex + 1];

  if (!prevRow) return;

  for (let i = 0; i < currentRow.length; i++) {
    if (currentRow[i] === 1 && prevRow[i] === 0) {
      currentRow[i] = 0;
      barSize--;

      if (barSize === 0) {
        isGameOver = true;
        clearInterval(gameInterval);
        endGame(false);
      }
    }
  }
}

function updateScore(): void {
  score += barSize;
  if (scoreCounter) {
    scoreCounter.innerText = score.toString().padStart(5, "0");
  }
}

function onStack(): void {
  checkLost();
  checkWin();

  if (isGameOver) return;

  updateScore();

  currentRowIndex = currentRowIndex - 1;
  barDirection = "right";

  for (let i = 0; i < barSize; i++) {
    gridMatrix[currentRowIndex][i] = 1;
  }

  draw();
}

// *---------------------------
// * EVENTS
// *---------------------------
if (stackBtn) {
  stackBtn.addEventListener("click", onStack);
}
if (playAgainButton) {
  playAgainButton.addEventListener("click", onPlayAgain);
}

// *---------------------------
// * START GAME
// *---------------------------
draw();

function main(): void {
  moveBar();
  draw();
}

const gameInterval: number = setInterval(main, 600);
