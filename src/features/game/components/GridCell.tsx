import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';
import { CellState } from '../types';
import { cellStateColourClasses } from '../utils';

export function GridCell({
    children,
    onClick,
    state,
}: PropsWithChildren<{ onClick: () => void; state: CellState }>) {
    return (
        <button
            className={clsx(
                'flex h-full w-full items-center justify-center rounded-sm border-primary-500 drop-shadow transition-all hover:border-4',
                cellStateColourClasses[state ?? 'empty']
            )}
            data-testid="grid-button"
            onClick={onClick}>
            {children}
        </button>
    );
}
