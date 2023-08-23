import { DialogBox, useDialogControls } from './DialogBox';
import { ThemeToggle } from './ThemeToggle';

export function Nav() {
    const [open, onOpen, onClose] = useDialogControls();
    return (
        <nav className="flex h-20 w-full flex-row items-center justify-between bg-theme px-12 text-theme-invert">
            <div className="font-bold">Pokedoku</div>
            <div className="flex flex-row gap-8">
                <button onClick={onOpen}>How to Play</button>
                <ThemeToggle />
            </div>
            <DialogBox open={open} onClose={onClose} title="How to Play">
                <div className="prose prose-sm prose-invert prose-gray">
                    <ul>
                        <li>
                            Data courtesy of{' '}
                            <a href="https://pokeapi.co/" target="_blank">
                                PokeAPI
                            </a>
                        </li>
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
