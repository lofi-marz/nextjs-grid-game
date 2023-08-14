import { PokemonConstraint } from '../pokemon/types';
import { GameState } from './types';
const MAX_GUESSES = 9;
export function countGuesses(grid: any[][]) {
    return grid.flatMap((row) => row.filter((cell) => cell != null)).length;
}

export function checkWinState(state: GameState): 'win' | 'lose' | null {
    const hasWon = state.stateGrid.every((row) =>
        row.every((cell) => cell === 'correct')
    );
    if (hasWon) return 'win';
    return state.guessCount <= MAX_GUESSES ? 'lose' : null;
}

export function getConstraintsByIndex(
    constraints: PokemonConstraint[],
    x: number,
    y: number
) {
    return [constraints[2 - y], constraints[x + 3]];
}
