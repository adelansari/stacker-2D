import { draw } from "./utils/draw";
import { moveBar } from "./utils/moveBar";
import "./events.js";

function main() {
  moveBar();
  draw();
}

const gameInterval = setInterval(main, 600);
