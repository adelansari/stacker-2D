import { stackBtn, playAgainButton } from "./elements";
import { onStack } from "./gameLogic/onStack";
import { onPlayAgain } from "./gameLogic/onPlayAgain";

if (stackBtn) {
  stackBtn.addEventListener("click", onStack);
}
if (playAgainButton) {
  playAgainButton.addEventListener("click", onPlayAgain);
}
