const grid: HTMLElement | null = document.querySelector(".grid");
const stackBtn: HTMLButtonElement | null = document.querySelector(".stack");
const scoreCounter: HTMLElement | null = document.querySelector(".score-counter");
const endGameScreen: HTMLElement | null = document.querySelector(".end-game-screen");
const playAgainButton: HTMLButtonElement | null = document.querySelector(".play-again");

if (!grid || !stackBtn || !scoreCounter || !endGameScreen || !playAgainButton) {
  throw new Error("One or more required elements are missing in the HTML.");
}

console.log("Stacker game elements initialized.");

stackBtn.addEventListener("click", () => {
  console.log("Stack button clicked.");
});

playAgainButton.addEventListener("click", () => {
  console.log("Play again button clicked.");
});
