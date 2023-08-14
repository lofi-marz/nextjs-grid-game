export type CellState = null | 'correct' | 'incorrect';

export type GameState = {
    grid: (string | null)[][];
    stateGrid: CellState[][];
    guessCount: number;
};

export type GridAction =
    | {
          type: 'guess';
          cell: { x: number; y: number; pokemon: string };
      }
    | {
          type: 'updateCellState';
          cell: { x: number; y: number; state: CellState };
      };
