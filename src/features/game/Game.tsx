import clsx from 'clsx';
import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';

import { SearchDialog } from '@/features/pokemon/components/SearchDialog';
import { PokemonSprite } from '@/features/pokemon/components/PokemonSprite';
import { PokemonConstraint } from '@/features/pokemon/types';
import { ConstraintIcon } from '@/features/pokemon/components';
import { CellState } from './types';
import { getConstraintsByIndex } from './utils';
import { useGameReducer } from './reducers';
import { PokemonClient } from 'pokenode-ts';
import { fetchPokemonConstraints } from '../pokemon/api';

const stateMap = {
    correct: 'bg-green-500',
    incorrect: 'bg-red-500',
} satisfies Record<NonNullable<CellState>, string>;
function GridCell({
    children,
    onClick,
    state,
}: PropsWithChildren<{ onClick: () => void; state: CellState }>) {
    return (
        <button
            className={clsx(
                'flex h-full w-full items-center justify-center transition-all hover:brightness-50',
                state ? stateMap[state] : 'bg-grey-800'
            )}
            data-testid="grid-button"
            onClick={onClick}>
            {children}
        </button>
    );
}

export function InnerGrid({
    cells,
    onClick,
    cellStates,
}: {
    cells: (string | null)[][];
    cellStates: CellState[][];
    onClick: (x: number, y: number) => void;
}) {
    return (
        <div
            className={clsx(
                'relative col-start-2 col-end-5 row-start-2 row-end-5 grid aspect-square h-full w-full grid-cols-3 grid-rows-3 items-center justify-center gap-1 overflow-clip rounded-xl'
            )}>
            {cells.map((row, rowI) => (
                <React.Fragment key={`row-${rowI}`}>
                    {row.map((cell, cellI) => (
                        <GridCell
                            key={`cell-${rowI}-${cellI}`}
                            onClick={() => onClick(cellI, rowI)}
                            state={cellStates[rowI][cellI]}>
                            {cell && <PokemonSprite pokemon={cell} />}
                        </GridCell>
                    ))}
                </React.Fragment>
            ))}
        </div>
    );
}

/*type GameState<T> = {
    cells: T[][];
};

type GridAction<T> = {
    {type: 'add', payload: }
}*/

const constraints: PokemonConstraint[] = [
    { type: 'type', value: 'fire' },
    { type: 'legendary', value: true },
    { type: 'type', value: 'grass' },
    { type: 'type', value: 'poison' },
    { type: 'monotype', value: true },
    { type: 'gen', value: 1 },
];

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
    const [{ grid, stateGrid, guessCount }, dispatch] = useGameReducer();
    const [open, setOpen] = useState(false);

    const [currentCell, setCurrentCell] = useState<[number, number] | null>();

    useEffect(() => {
        console.log(grid);
    }, [grid]);

    const onClick = (x: number, y: number) => {
        setCurrentCell([x, y]);
        setOpen(true);
    };

    return (
        <div className="flex h-full w-full flex-row items-center justify-center">
            <div className="flex aspect-square h-full max-h-[100vw] items-center justify-center p-6">
                <div className="grid aspect-square h-full w-full grid-cols-4 grid-rows-4 items-center justify-center gap-1 overflow-clip rounded-xl">
                    {constraints.map((c, i) => (
                        <div
                            key={`icon-${c.type}-${c.value}`}
                            className={clsx(
                                'relative flex h-full w-full items-center justify-center',
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
                    <SearchDialog
                        open={open}
                        onClose={() => setOpen(false)}
                        initialValue={''}
                        onChange={(v) => {
                            if (!currentCell) return;
                            const [x, y] = currentCell;
                            dispatch({
                                type: 'guess',
                                cell: { x, y, pokemon: v },
                            });
                            const cs = getConstraintsByIndex(constraints, x, y);
                            fetchPokemonConstraints(p, v, cs).then(
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
                        }}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-4 text-4xl font-bold">
                <div>Shots</div>
                <div className="text-center">{guessCount}</div>
            </div>
        </div>
    );
}
