import { gameState } from "../gameState";
import { updateScore } from "./updateScore";
import { endGame } from "./endGame";

export function checkWin(): void {
  if (gameState.currentRowIndex === 0 && !gameState.isGameOver) {
    updateScore();
    gameState.isGameOver = true;
    clearInterval(gameState.gameInterval);
    endGame(true);
  }
}
