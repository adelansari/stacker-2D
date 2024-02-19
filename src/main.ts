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

const grid = document.querySelector(".grid") as HTMLElement;
const stackBtn = document.querySelector(".stack") as HTMLButtonElement;
const scoreCounter = document.querySelector(".score-counter") as HTMLElement;
const endGameScreen = document.querySelector(".end-game-screen") as HTMLElement;
const playAgainButton = document.querySelector(".play-again") as HTMLButtonElement;

if (!grid || !stackBtn || !scoreCounter || !endGameScreen || !playAgainButton) {
  throw new Error("One or more required elements are missing in the HTML.");
}

function drawGrid() {
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

function performStackAction() {
  if (currentRowIndex === 0) {
    // If already at the top row, check for win condition
    endGame(true); // Win condition if the stack reaches the top
    return;
  }

  const currentRow = gridMatrix[currentRowIndex];
  const rowBelow = gridMatrix[currentRowIndex - 1]; // Get the row below

  let isStackAligned = false;
  for (let i = 0; i < currentRow.length; i++) {
    if (currentRow[i] === 1) {
      if (rowBelow[i] === 1) {
        isStackAligned = true;
      } else {
        currentRow[i] = 0; // Remove misaligned part of the stack
      }
    }
  }

  if (!isStackAligned) {
    endGame(false); // Lose condition if no alignment
    return;
  }

  currentRowIndex--; // Move to the next row
  drawGrid();
}

function customPadStart(str: string, targetLength: number, padString: string = " "): string {
  if (str.length >= targetLength) {
    return str;
  }

  const padding = padString.repeat(targetLength - str.length);
  return padding.substring(0, targetLength - str.length) + str;
}

function updateScore(newScore: number) {
  score = newScore;
  if (scoreCounter) {
    scoreCounter.innerText = customPadStart(score.toString(), 5, "0");
  }
}

function endGame(isWin: boolean) {
  isGameOver = true;
  endGameScreen.classList.remove("hidden");
  endGameScreen.innerHTML = isWin ? "You Won!" : "Game Over";
}

stackBtn.addEventListener("click", () => {
  if (isGameOver) return;
  performStackAction();
});

playAgainButton.addEventListener("click", () => {
  console.log("Play again button clicked.");
});

// Initial call to draw the grid when the page loads
drawGrid();

// Start the game movement
setInterval(moveBar, 600);
