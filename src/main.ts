type CellState = 0 | 1; // 0 for empty, 1 for filled
type GridMatrix = CellState[][];

function createGridMatrix(rows: number, cols: number, initialBarPosition: number): GridMatrix {
  const grid = Array.from({ length: rows }, () => Array(cols).fill(0) as CellState[]);
  grid[grid.length - 1] = Array(cols)
    .fill(0)
    .map((_, index) => (index < initialBarPosition ? 1 : 0)) as CellState[];
  return grid;
}

const gridMatrix: GridMatrix = createGridMatrix(8, 6, 3);
let currentRowIndex = gridMatrix.length - 1;
let barDirection: "left" | "right" = "right";
let isGameOver = false;
let score = 0;

const grid: HTMLElement | null = document.querySelector(".grid");
const stackBtn: HTMLButtonElement | null = document.querySelector(".stack") as HTMLButtonElement | null;
const scoreCounter: HTMLElement | null = document.querySelector(".score-counter");
const endGameScreen: HTMLElement | null = document.querySelector(".end-game-screen");
const playAgainButton: HTMLButtonElement | null = document.querySelector(".play-again") as HTMLButtonElement | null;

if (!grid || !stackBtn || !scoreCounter || !endGameScreen || !playAgainButton) {
  throw new Error("One or more required elements are missing in the HTML.");
}

function drawGrid() {
  if (!grid) return;

  grid.innerHTML = "";
  gridMatrix.forEach((row) => {
    row.forEach((cell) => {
      const cellElement = document.createElement("div");
      cellElement.classList.add("cell");
      if (cell === 1) {
        cellElement.classList.add("bar");
      }
      grid.appendChild(cellElement);
    });
  });
}

function moveBar() {
  const currentRow = gridMatrix[currentRowIndex];
  if (barDirection === "right") {
    if (currentRow[currentRow.length - 1] === 1) {
      barDirection = "left";
    } else {
      currentRow.push(currentRow.shift()!);
    }
  } else {
    if (currentRow[0] === 1) {
      barDirection = "right";
    } else {
      currentRow.unshift(currentRow.pop()!);
    }
  }
  drawGrid();
}

stackBtn.addEventListener("click", () => {
  if (isGameOver) return;

  // Logic for when the stack button is clicked
  console.log("Stack action performed");
  // Update game state and UI based on the stack action
  // This might include checking for win/lose conditions, updating the score, etc.

  // Placeholder logic
  score += 10;
  if (scoreCounter) scoreCounter.innerText = score.toString();

  currentRowIndex--;
  if (currentRowIndex < 0) {
    // Handle game over or win
    console.log("Game over or win");
    isGameOver = true;
    if (endGameScreen) endGameScreen.classList.remove("hidden");
  }
});

playAgainButton.addEventListener("click", () => {
  console.log("Play again button clicked.");
});
