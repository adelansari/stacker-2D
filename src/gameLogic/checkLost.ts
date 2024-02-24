import { gameState } from "../gameState";
import { endGame } from "./endGame";

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
        clearInterval(gameState.gameInterval);
        endGame(false);
      }
    }
  }
}
