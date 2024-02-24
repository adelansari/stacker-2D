import { elements } from "../domElements";
import { onStack, onPlayAgain } from "../gameFunctions/gameFunctions";

if (elements.stackBtn) {
  elements.stackBtn.addEventListener("click", onStack);
}

if (elements.playAgainButton) {
  elements.playAgainButton.addEventListener("click", onPlayAgain);
}
