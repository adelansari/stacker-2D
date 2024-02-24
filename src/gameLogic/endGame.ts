import { endGameText, endGameScreen } from "../elements";

export function endGame(isVictory: boolean): void {
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
