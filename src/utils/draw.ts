import { grid } from "../elements";
import { gameState } from "../gameState";

export function draw(): void {
  if (grid) {
    grid.innerHTML = "";
  }

  gameState.gridMatrix.forEach(function (rowContent: number[]) {
    rowContent.forEach(function (cellContent: number) {
      const cell: HTMLElement = document.createElement("div");
      cell.classList.add("cell");

      if (cellContent === 1) {
        cell.classList.add("bar");
      }

      if (grid) {
        grid.appendChild(cell);
      }
    });
  });
}
