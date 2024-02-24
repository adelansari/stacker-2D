export interface GameState {
  gridMatrix: number[][];
  currentRowIndex: number;
  barDirection: string;
  barSize: number;
  isGameOver: boolean;
  score: number;
  gameInterval: number | null;
}
