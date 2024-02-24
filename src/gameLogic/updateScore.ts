import { scoreCounter } from "../elements";
import { gameState } from "../gameState";

export function updateScore(): void {
  gameState.score += gameState.barSize;
  if (scoreCounter) {
    scoreCounter.innerText = gameState.score.toString().padStart(5, "0");
  }
}
