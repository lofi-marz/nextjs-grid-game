import { PokemonConstraint } from '../pokemon/types';
import { CellState, GameState } from './types';
const MAX_GUESSES = 9;
export function countGuesses(grid: any[][]) {
    return grid.flatMap((row) => row.filter((cell) => cell != null)).length;
}

export function checkWinState(state: GameState): 'win' | 'lose' | null {
    const hasWon = state.stateGrid.every((row) =>
        row.every((cell) => cell === 'correct')
    );
    if (hasWon) return 'win';
    return state.guessCount <= 0 ? 'lose' : null;
}

export function getConstraintsByIndex(
    constraints: PokemonConstraint[],
    x: number,
    y: number
) {
    return [constraints[2 - y], constraints[x + 3]];
}

export const cellStateColourClasses = {
    correct: 'bg-green-500',
    incorrect: 'bg-red-500',
    empty: 'bg-grey-200 dark:bg-grey-800',
} satisfies Record<NonNullable<CellState> | 'empty', string>;
