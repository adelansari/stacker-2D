import { draw, moveBar } from "./gameFunctions/gameFunctions";
import { gameState } from "./gameState/gameState";

draw();

function main(): void {
  moveBar();
  draw();
}

gameState.gameInterval = setInterval(main, 600);

if (gameState.isGameOver) {
  clearInterval(gameState.gameInterval as number);
}
