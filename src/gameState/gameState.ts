import { GameState } from "../types/GameState";

const gridMatrix: number[][] = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 0],
];

export const gameState: GameState = {
  gridMatrix,
  currentRowIndex: gridMatrix.length - 1,
  barDirection: "right",
  barSize: 3,
  isGameOver: false,
  score: 0,
  gameInterval: null,
};
