import { gameState } from "../gameState";
import { checkLost } from "./checkLost";
import { checkWin } from "./checkWin";
import { updateScore } from "./updateScore";
import { draw } from "../utils/draw";

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
