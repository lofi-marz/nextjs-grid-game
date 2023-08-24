import clsx from 'clsx';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { SearchDialog } from '@/features/pokemon/components/SearchDialog';
import { PokemonConstraint } from '@/features/pokemon/types';
import { ConstraintIcon } from '@/features/pokemon/components';
import { checkWinState, getConstraintsByIndex } from './utils';
import { useGameReducer } from './reducers';
import { PokemonClient } from 'pokenode-ts';
import { fetchPokemonConstraints } from '../pokemon/api';
import { GameEndDialog } from './components';
import pokemonJson from 'features/pokemon/assets/pokemonNames.json';
import { InnerGrid } from './components/InnerGrid';
import {
    isUselessVariant,
    parsePokemonName,
    regionToAdjective,
} from '../pokemon/utils';
const pokemonNames = pokemonJson
    .filter(([name]) => !isUselessVariant(name))
    .map(([kebabName, _]) => {
        const { name, region, variant } = parsePokemonName(kebabName);
        let label = name;
        if (region) label = `${regionToAdjective(region)} ${name}`;
        if (variant) label += ` (${variant})`;
        return { value: kebabName, label };
    });
const testConstraints: PokemonConstraint[] = [
    { type: 'type', value: 'fire' },
    { type: 'legendary', value: true },
    { type: 'legendary', value: false },
    { type: 'type', value: 'poison' },
    { type: 'monotype', value: true },
    { type: 'gen', value: 1 },
];

const genConstraints: PokemonConstraint[] = [
    { type: 'gen', value: 4 },
    { type: 'gen', value: 5 },
    { type: 'gen', value: 6 },
    { type: 'gen', value: 7 },
    { type: 'gen', value: 8 },
    { type: 'gen', value: 9 },
];

const sameConstraints: PokemonConstraint[] = [
    { type: 'type', value: 'fire' },
    { type: 'type', value: 'water' },
    { type: 'type', value: 'fire' },
    { type: 'type', value: 'fire' },
    { type: 'type', value: 'fire' },
    { type: 'type', value: 'fire' },
];

const constraints = testConstraints;

const constraintClasses = [
    'col-start-1 row-start-4',
    'col-start-1 row-start-3',
    'col-start-1 row-start-2',
    'col-start-2 row-start-1',
    'col-start-3 row-start-1',
    'col-start-4 row-start-1',
];

export function Game() {
    const p = useMemo(() => new PokemonClient(), []); //TODO: Best way to do this?
    const [gameState, dispatch] = useGameReducer();
    const { grid, stateGrid, guessCount } = gameState;
    const [open, setOpen] = useState(false);

    const [currentCell, setCurrentCell] = useState<[number, number] | null>();

    useEffect(() => {
        updateCellState();
    }, []);
    const updateCellState = useCallback(() => {
        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 3; x++) {
                const cs = getConstraintsByIndex(constraints, x, y);
                const pokemonName = grid[y][x];
                if (!pokemonName) continue;
                fetchPokemonConstraints(p, pokemonName, cs).then(
                    (allConstraintsTrue) =>
                        dispatch({
                            type: 'updateCellState',
                            cell: {
                                x,
                                y,
                                state: allConstraintsTrue
                                    ? 'correct'
                                    : 'incorrect',
                            },
                        })
                );
            }
        }
    }, [dispatch, grid, p]);
    const onSearchChange = (v: string) => {
        if (!currentCell) return;
        const [x, y] = currentCell;
        dispatch({
            type: 'guess',
            cell: { x, y, pokemon: v },
        });
        const cs = getConstraintsByIndex(constraints, x, y);
        fetchPokemonConstraints(p, v, cs).then((allConstraintsTrue) =>
            dispatch({
                type: 'updateCellState',
                cell: {
                    x,
                    y,
                    state: allConstraintsTrue ? 'correct' : 'incorrect',
                },
            })
        );
    };
    const gamefinished = checkWinState({ grid, stateGrid, guessCount });

    const onClick = (x: number, y: number) => {
        if (gamefinished) return;
        setCurrentCell([x, y]);
        setOpen(true);
    };

    return (
        <div className="flex h-full w-full flex-row flex-wrap content-center items-center justify-center gap-8">
            <div className="flex aspect-square h-full max-h-[100vw] items-center justify-center p-6 pb-12 pt-0">
                <div className="grid aspect-square h-full w-full grid-cols-4 grid-rows-4 items-center justify-center gap-1 overflow-clip rounded-xl text-theme">
                    {constraints.map((c, i) => (
                        <div
                            key={`icon-${c.type}-${c.value}-${i}`}
                            className={clsx(
                                'bg-radial-fade-out dark:bg-radial-fade-out-dark relative flex h-full w-full items-center justify-center',
                                constraintClasses[i]
                            )}>
                            <ConstraintIcon constraint={c} />
                        </div>
                    ))}
                    <InnerGrid
                        onClick={onClick}
                        cells={grid}
                        cellStates={stateGrid}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-4 text-4xl font-bold">
                <div>Shots</div>
                <div className="text-center">{guessCount}</div>
            </div>
            <SearchDialog
                open={open}
                onClose={() => setOpen(false)}
                initialValue={
                    currentCell
                        ? grid[currentCell[0]][currentCell[1]] ?? ''
                        : ''
                }
                onChange={onSearchChange}
                pokemonList={pokemonNames}
            />
            {gamefinished && <GameEndDialog gameState={gameState} />}
        </div>
    );
}
