import { DialogBox, useDialogControls } from '@/components/DialogBox';
import { CellState, GameState } from '../types';
import { cellStateColourClasses, checkWinState } from '../utils';
import clsx from 'clsx';
function GameStateDisplay({ gameState }: { gameState: GameState }) {
    return (
        <div className="grid aspect-square w-1/2 grid-cols-3 grid-rows-3 gap-2">
            {gameState.stateGrid.flatMap((row, j) =>
                row.map((cell, i) => (
                    <div
                        key={`game-state-${j}-${i}`}
                        className={clsx(
                            'h-full w-full rounded',
                            cellStateColourClasses[cell ?? 'empty']
                        )}></div>
                ))
            )}
        </div>
    );
}

function gameStateToString(gameState: GameState) {
    const CORRECT = '🟩';
    const INCORRECT = '🟥';
    const EMPTY = '⬛';
    const emojiMap = {
        correct: CORRECT,
        incorrect: INCORRECT,
        empty: EMPTY,
    } satisfies Record<NonNullable<CellState> | 'empty', string>;
    const gridString = gameState.stateGrid
        .map((row) => row.map((cell) => emojiMap[cell ?? 'empty']).join(''))
        .join('\n');
    return gridString;
}
export function GameEndDialog({ gameState }: { gameState: GameState }) {
    const [open, onOpen, onClose] = useDialogControls(true);
    const winState = checkWinState(gameState);
    const title = winState === 'win' ? 'You Win!' : 'Game Over...';
    console.log(gameStateToString(gameState));
    return (
        <DialogBox
            title={title}
            open={open}
            onClose={onClose}
            className="flex w-full flex-col items-center justify-center gap-4">
            <div className="text-3xl font-bold">{gameState.guessCount}/9</div>
            <GameStateDisplay gameState={gameState} />
            <button>Copy</button>
        </DialogBox>
    );
}
