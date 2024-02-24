import { gameState } from "../gameState";

export function moveBar(): void {
  const currentRow: number[] = gameState.gridMatrix[gameState.currentRowIndex];

  if (gameState.barDirection === "right") {
    for (let i = 0; i < currentRow.length; i++) {
      if (currentRow[i] === 1 && i === currentRow.length - 1) {
        gameState.barDirection = "left";
        break;
      } else if (currentRow[i] === 1 && currentRow[i + 1] === 0) {
        currentRow[i] = 0;
        currentRow[i + 1] = 1;
        break;
      }
    }
  } else {
    for (let i = currentRow.length - 1; i >= 0; i--) {
      if (currentRow[i] === 1 && i === 0) {
        gameState.barDirection = "right";
        break;
      } else if (currentRow[i] === 1 && currentRow[i - 1] === 0) {
        currentRow[i] = 0;
        currentRow[i - 1] = 1;
        break;
      }
    }
  }
}
