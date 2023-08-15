import { DialogBox, useDialogControls } from './DialogBox';

export function Nav() {
    const [open, onOpen, onClose] = useDialogControls();
    return (
        <nav className="flex h-20 w-full flex-row items-center justify-between px-12">
            <div>Pokedoku</div>
            <button onClick={onOpen}>How to Play</button>
            <DialogBox open={open} onClose={onClose} title="How to Play">
                <div className="prose prose-sm prose-gray dark:prose-invert">
                    <ul>
                        <li>
                            Choose a pokemon for each cell that matches the
                            criteria for that cell&apos;s row and column
                        </li>
                        <li>
                            Every guess counts as a shot, regardless of its
                            correctness
                        </li>
                    </ul>
                </div>
            </DialogBox>
        </nav>
    );
}
