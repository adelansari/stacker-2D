import { gameState } from "../gameState/gameState";
import { elements } from "../domElements";

export function draw(): void {
  // First, reset the grid
  if (elements.grid) {
    elements.grid.innerHTML = "";
  }

  gameState.gridMatrix.forEach(function (rowContent: number[]) {
    rowContent.forEach(function (cellContent: number) {
      // Create a cell
      const cell: HTMLElement = document.createElement("div");
      cell.classList.add("cell");

      // The cells that the bar occupies
      if (cellContent === 1) {
        cell.classList.add("bar");
      }

      // Put the cell in the grid
      if (elements.grid) {
        elements.grid.appendChild(cell);
      }
    });
  });
}

export function moveRight(row: number[]): void {
  row.pop();
  row.unshift(0);
}

export function moveLeft(row: number[]): void {
  row.shift();
  row.push(0);
}

export function isRightEdge(row: number[]): boolean {
  const lastElement: number = row[row.length - 1];
  return lastElement === 1;
}

export function isLeftEdge(row: number[]): boolean {
  const firstElement: number = row[0];
  return firstElement === 1;
}

export function moveBar(): void {
  const currentRow: number[] = gameState.gridMatrix[gameState.currentRowIndex];

  if (gameState.barDirection === "right") {
    moveRight(currentRow);

    if (isRightEdge(currentRow)) {
      gameState.barDirection = "left";
    }
  } else if (gameState.barDirection === "left") {
    moveLeft(currentRow);

    if (isLeftEdge(currentRow)) {
      gameState.barDirection = "right";
    }
  }
}

export function endGame(isVictory: boolean): void {
  if (isVictory) {
    if (elements.endGameText) {
      elements.endGameText.innerHTML = "YOU<br>WON";
    }
    if (elements.endGameScreen) {
      elements.endGameScreen.classList.add("win");
    }
  }

  if (elements.endGameScreen) {
    elements.endGameScreen.classList.remove("hidden");
  }
}

export function onPlayAgain(): void {
  location.reload();
}

export function checkWin(): void {
  if (gameState.currentRowIndex === 0 && !gameState.isGameOver) {
    updateScore();
    gameState.isGameOver = true;
    clearInterval(gameState.gameInterval as number);
    endGame(true);
  }
}

export function checkLost(): void {
  const currentRow: number[] = gameState.gridMatrix[gameState.currentRowIndex];
  const prevRow: number[] = gameState.gridMatrix[gameState.currentRowIndex + 1];

  if (!prevRow) return;

  for (let i = 0; i < currentRow.length; i++) {
    if (currentRow[i] === 1 && prevRow[i] === 0) {
      currentRow[i] = 0;
      gameState.barSize--;

      if (gameState.barSize === 0) {
        gameState.isGameOver = true;
        clearInterval(gameState.gameInterval as number);
        endGame(false);
      }
    }
  }
}

export function updateScore(): void {
  gameState.score += gameState.barSize;
  if (elements.scoreCounter) {
    elements.scoreCounter.innerText = gameState.score.toString().padStart(5, "0");
  }
}

export function onStack(): void {
  checkLost();
  checkWin();

  if (gameState.isGameOver) return;

  updateScore();

  gameState.currentRowIndex = gameState.currentRowIndex - 1;
  gameState.barDirection = "right";

  for (let i = 0; i < gameState.barSize; i++) {
    gameState.gridMatrix[gameState.currentRowIndex][i] = 1;
  }

  draw();
}
