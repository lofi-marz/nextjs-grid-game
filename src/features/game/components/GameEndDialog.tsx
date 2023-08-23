import { DialogBox, useDialogControls } from '@/components/DialogBox';
import { CellState, GameState } from '../types';
import { cellStateColourClasses, checkWinState } from '../utils';
import clsx from 'clsx';

function getGameRound(): number {
    const today = new Date();
    const july17 = new Date(2023, 6, 17); // 2023-07-17

    const timeDifference = today.getTime() - july17.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference;
}

function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
}

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

function createShareMessage(gameState: GameState) {
    const title = 'Pokedoku ' + getGameRound();
    const board = gameStateToString(gameState);
    const link = window.location.origin;

    return [title, board, link].join('\n\n');
}
export function GameEndDialog({ gameState }: { gameState: GameState }) {
    console.log(gameState);
    const [open, onOpen, onClose] = useDialogControls(true);
    const winState = checkWinState(gameState);
    const title = winState === 'win' ? 'You Win!' : 'Game Over...';
    const message = createShareMessage(gameState);
    console.log(gameStateToString(gameState));
    return (
        <DialogBox
            title={title}
            open={open}
            onClose={onClose}
            className="flex w-full flex-col items-center justify-center gap-4">
            <div className="text-3xl font-bold">{gameState.guessCount}/9</div>
            <GameStateDisplay gameState={gameState} />
            <button
                onClick={() => copyToClipboard(message)}
                className="rounded-xl bg-primary-500 px-6 py-2 text-light transition-all hover:brightness-110 hover:saturate-[0.9] active:brightness-75">
                Copy
            </button>
        </DialogBox>
    );
}
