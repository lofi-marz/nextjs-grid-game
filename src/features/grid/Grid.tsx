import clsx from 'clsx';
import React, { PropsWithChildren, useEffect, useState } from 'react';

import { PokemonTypeIcon } from 'features/pokemon/components/PokemonTypeIcon';
import { SearchDialog } from 'features/pokemon/components/SearchDialog';
import { PokemonSprite } from 'features/pokemon/components/PokemonSprite';
import { PokemonConstraint, TypeConstraint } from 'features/pokemon/types';
import { ConstraintIcon } from 'features/pokemon/components';
import { CellState } from './types';
import { checkPokemonConstraint } from 'features/pokemon/utils';

function GridRow({ children }: PropsWithChildren) {
    return <div>{children}</div>;
}
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
                'flex h-full w-full items-center justify-center bg-grey-800 p-4 transition-all hover:brightness-50',
                state && stateMap[state]
            )}
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
                            state={cellStates[cellI][rowI]}>
                            {cell && <PokemonSprite pokemon={cell} />}
                        </GridCell>
                    ))}
                </React.Fragment>
            ))}
        </div>
    );
}

/*type GridState<T> = {
    cells: T[][];
};

type GridAction<T> = {
    {type: 'add', payload: }
}*/

const constraints: PokemonConstraint[] = [
    { type: 'type', value: 'fire' },
    { type: 'type', value: 'water' },
    { type: 'type', value: 'grass' },
    { type: 'type', value: 'poison' },
    { type: 'type', value: 'fairy' },
    { type: 'gen', value: 9 },
];

export function Grid() {
    const [open, setOpen] = useState(false);
    const [grid, setGrid] = useState<(string | null)[][]>([
        ['bulbasaur', 'charmander', 'squirtle'],
        ['pikachu', 'jigglypuff', 'meowth'],
        ['psyduck', 'geodude', null],
    ]);
    const [stateGrid, setStateGrid] = useState<CellState[][]>([
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ]);
    const [currentCell, setCurrentCell] = useState<[number, number] | null>();

    useEffect(() => {
        console.log(grid);
    }, [grid]);
    const constraintClasses = [
        'col-start-1 row-start-4',
        'col-start-1 row-start-3',
        'col-start-1 row-start-2',
        'col-start-2 row-start-1',
        'col-start-3 row-start-1',
        'col-start-4 row-start-1',
    ];

    const setCell = (x: number, y: number, item: string) =>
        setGrid((oldGrid) =>
            oldGrid.map((row, i) => {
                if (i === y) {
                    return row.map((oldCell, j) => (j === x ? item : oldCell));
                }
                return row.slice(); // Copy the row as is
            })
        );

    const setCellState = (x: number, y: number, state: CellState) =>
        setStateGrid((oldGrid) =>
            oldGrid.map((row, i) => {
                if (i === y) {
                    return row.map((oldCell, j) => (j === x ? state : oldCell));
                }
                return row.slice(); // Copy the row as is
            })
        );
    const onClick = (x: number, y: number) => {
        setCurrentCell([x, y]);
        setOpen(true);
    };

    useEffect(() => {
        //TODO: Refactor this to just check 1 cell when it changes
        const indexToConstraints = (x: number, y: number) => {
            return [constraints[2 - y], constraints[x + 3]];
        };
        const promises = grid.flatMap((row, y) =>
            row.map(
                (cell, x) =>
                    Boolean(cell) &&
                    Promise.all(
                        indexToConstraints(x, y).map(
                            async (c) => await checkPokemonConstraint(c, cell)
                        )
                    )
                        .then((cs) => cs.every((v) => v))
                        .then((allConstraintsTrue) => {
                            setCellState(
                                x,
                                y,
                                allConstraintsTrue ? 'correct' : 'incorrect'
                            );
                            return allConstraintsTrue;
                        })
            )
        );
        console.log('Promises:', promises);
        (async () => console.log(await Promise.all(promises)))();
    }, [grid]);

    useEffect(() => {
        console.log(stateGrid);
    }, [stateGrid]);

    return (
        <div className="grid aspect-square h-full w-full grid-cols-4 grid-rows-4 items-center justify-center gap-1 overflow-clip rounded-xl">
            {constraints.map((c, i) => (
                <div
                    key={c.value}
                    className={clsx(
                        'relative flex h-full w-full items-center justify-center',
                        constraintClasses[i]
                    )}>
                    <ConstraintIcon constraint={c} />
                </div>
            ))}
            <InnerGrid onClick={onClick} cells={grid} cellStates={stateGrid} />
            <SearchDialog
                open={open}
                onClose={() => setOpen(false)}
                initialValue={''}
                onChange={(v) =>
                    currentCell && setCell(currentCell[0], currentCell[1], v)
                }
            />
        </div>
    );
}
