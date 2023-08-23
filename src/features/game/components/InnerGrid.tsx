import clsx from 'clsx';
import React from 'react';
import { PokemonSprite } from '@/features/pokemon/components/PokemonSprite';
import { CellState } from '../types';
import { GridCell } from './GridCell';

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
