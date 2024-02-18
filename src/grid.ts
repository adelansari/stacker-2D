import { GridCell, GridMatrix } from "./types/grid";

const gridContainer = document.querySelector(".grid") as HTMLDivElement;

const drawGrid = (gridMatrix: GridMatrix) => {
  gridContainer.innerHTML = ""; // Clear old grid

  gridMatrix.forEach((row: GridCell[]) => {
    row.forEach((cell: GridCell) => {
      const cellElement = document.createElement("div");
      cellElement.classList.add("cell");

      if (!cell.isEmpty) {
        cellElement.classList.add("bar");
      }

      gridContainer.appendChild(cellElement);
    });
  });
};

export { drawGrid }; // Export our draw function
