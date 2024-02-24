import { draw } from "./utils/draw";
import { moveBar } from "./utils/moveBar";
import "./events";

function main(): void {
  moveBar();
  draw();
}

const gameInterval: number = setInterval(main, 600);
