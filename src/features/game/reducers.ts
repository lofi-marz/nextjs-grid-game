import { useReducer } from 'react';
import { CellState, GridAction, GameState } from './types';
const allCharmander = [
    ['charmander', 'charmander', 'charmander'],
    ['charmander', 'charmander', 'charmander'],
    ['charmander', 'charmander', 'charmander'],
];

const randomPokemon = [
    ['bulbasaur', 'charmander', 'squirtle'],
    ['pikachu', 'jigglypuff', 'meowth'],
    ['psyduck', 'geodude', null],
];

function gameReducer(state: GameState, action: GridAction): GameState {
    switch (action.type) {
        case 'guess':
            return {
                ...state,
                grid: setCell(
                    state.grid,
                    action.cell.x,
                    action.cell.y,
                    action.cell.pokemon
                ),
                guessCount: state.guessCount - 1,
            };
        case 'updateCellState':
            return {
                ...state,
                stateGrid: setCellState(
                    state.stateGrid,
                    action.cell.x,
                    action.cell.y,
                    action.cell.state
                ),
            };
        default:
            return state;
    }
}

const emptyGameState: GameState = {
    grid: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ],
    stateGrid: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ],
    guessCount: 9,
};

const testGameState: GameState = {
    grid: allCharmander,
    stateGrid: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ],
    guessCount: 9,
};
export function useGameReducer() {
    return useReducer(gameReducer, testGameState);
}

function setCell<T>(grid: T[][], x: number, y: number, item: T) {
    return grid.map((row, i) => {
        if (i === y) {
            return row.map((oldCell, j) => (j === x ? item : oldCell));
        }
        return row.slice(); // Copy the row as is
    });
}

const setCellState = setCell<CellState>;
