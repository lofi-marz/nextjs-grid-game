import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';
import { PokemonCell } from '../pokemon/components/PokemonCell';

function GridRow({ children }: PropsWithChildren) {
    return <div>{children}</div>;
}
function GridCell({ children }: PropsWithChildren) {
    return (
        <button className="flex h-full w-full items-center justify-center">
            {children}
        </button>
    );
}

export function InnerGrid() {
    const data = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
    ];
    return (
        <div
            className={clsx(
                'col-start-2 col-end-5 row-start-2 row-end-5 grid aspect-square h-full w-full grid-cols-3 grid-rows-3 items-center justify-center gap-1 overflow-clip rounded-xl'
            )}>
            {data.map((row, rowI) => (
                <React.Fragment key={`row-${rowI}`}>
                    {row.map((cell, cellI) => (
                        <GridCell key={`cell-${rowI}-${cellI}`}>
                            <PokemonCell />
                        </GridCell>
                    ))}
                </React.Fragment>
            ))}
        </div>
    );
}
export function Grid() {
    return (
        <div className="grid aspect-square h-full w-full grid-cols-4 grid-rows-4 items-center justify-center gap-1 overflow-clip rounded-xl">
            <InnerGrid />
        </div>
    );
}
