import clsx from 'clsx';
import React, {
    PropsWithChildren,
    useEffect,
    useReducer,
    useState,
} from 'react';

import { PokemonTypeIcon } from 'features/pokemon/components/PokemonTypeIcon';
import { SearchDialog } from 'features/pokemon/components/SearchDialog';

function GridRow({ children }: PropsWithChildren) {
    return <div>{children}</div>;
}
function GridCell({
    children,
    onClick,
}: PropsWithChildren<{ onClick: () => void }>) {
    return (
        <button
            className="flex h-full w-full items-center justify-center bg-grey-800 p-4 transition-all hover:brightness-50"
            onClick={onClick}>
            {children}
        </button>
    );
}

export function InnerGrid({
    cells,
    onClick,
}: {
    cells: any[][];
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
                            onClick={() => onClick(cellI, rowI)}></GridCell>
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
export function Grid() {
    const [open, setOpen] = useState(false);
    const [grid, setGrid] = useState<string[][]>([
        ['bulbasaur', 'charmander', 'squirtle'],
        ['pikachu', 'jigglypuff', 'meowth'],
        ['psyduck', 'geodude', 'abra'],
    ]);
    const [currentCell, setCurrentCell] = useState<[number, number] | null>();
    const [value, setValue] = useState('bulbasaur');
    useEffect(() => {
        console.log(grid);
    }, [grid]);

    const setCell = (x: number, y: number, item: string) =>
        setGrid((oldGrid) =>
            oldGrid.map((row, i) => {
                if (i === y) {
                    return row.map((oldCell, j) => (j === x ? item : oldCell));
                }
                return row.slice(); // Copy the row as is
            })
        );
    const onClick = (x: number, y: number) => {
        setCurrentCell([x, y]);
        setOpen(true);
    };

    return (
        <div className="grid aspect-square h-full w-full grid-cols-4 grid-rows-4 items-center justify-center gap-1 overflow-clip rounded-xl">
            <div className="relative col-start-2 row-start-1 h-full w-full">
                <PokemonTypeIcon type="fire" />
            </div>
            <InnerGrid onClick={onClick} cells={grid} cellComponent={Pokemon/>
            <SearchDialog
                open={open}
                onClose={() => setOpen(false)}
                value={currentCell ? grid[currentCell[1]][currentCell[0]] : ''}
                onChange={(v) =>
                    currentCell && setCell(currentCell[0], currentCell[1], v)
                }
            />
        </div>
    );
}
