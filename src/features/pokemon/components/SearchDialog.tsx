import { useState } from 'react';
import pokedexJson from '../assets/pokedex.json';
import { Combobox, Dialog } from '@headlessui/react';
import { FaCheck } from 'react-icons/fa6';
const pokemonList = pokedexJson.map((p) => ({
    value: p.name.english.toLocaleLowerCase(),
    label: p.name.english,
    sprite: p.image.hires,
}));

export function SearchDialog({
    open,
    onClose,
    onChange,
    initialValue,
}: {
    open: boolean;
    initialValue: string;
    onClose: () => void;
    onChange: (value: string) => void;
}) {
    const [query, setQuery] = useState('');
    const [selected, setSelected] = useState(initialValue);

    const filteredResults = (
        query === ''
            ? pokemonList
            : pokemonList.filter((p) =>
                  p.value.toLowerCase().includes(query.toLowerCase())
              )
    ).slice(0, 10);

    return (
        <Dialog
            open={open}
            onClose={() => {
                onClose();
                setQuery('');
                setSelected(initialValue);
                console.log('Dialog closed');
            }}
            className="relative z-50 text-xl">
            <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
            <div className="fixed inset-0 flex h-full w-full items-start justify-center p-12 pt-48 decoration-primary-500">
                <Dialog.Panel className="flex w-full max-w-sm flex-col items-center justify-center gap-6 rounded-xl bg-light p-6 font-sans text-base drop-shadow dark:bg-dark">
                    <Dialog.Title className="text-xl font-bold">
                        Search Pokemon
                    </Dialog.Title>
                    <Combobox
                        value={selected}
                        onChange={(v) => {
                            setSelected(v);
                        }}>
                        <div className="flex h-[1.5lh] w-full flex-row text-light">
                            <Combobox.Input
                                className="grow rounded-l-xl border-none bg-primary-500 capitalize outline-none transition-all placeholder:text-light focus:ring-light/10"
                                placeholder={initialValue}
                                onChange={(event) =>
                                    setQuery(event.target.value)
                                }
                            />
                            <button
                                className="flex aspect-square h-full items-center justify-center rounded-r-xl border-l   border-primary-600 bg-primary-500 text-light"
                                onClick={() => {
                                    if (selected !== '') {
                                        onChange(selected);
                                        onClose();
                                    }
                                }}>
                                <FaCheck />
                            </button>
                        </div>
                        <Combobox.Options className="flex max-h-96 w-full flex-col gap-1">
                            {filteredResults.map(({ value, label }) => (
                                <Combobox.Option
                                    className="rounded-xl px-3 py-1 transition-all hover:cursor-pointer hover:bg-primary-500 hover:text-light"
                                    key={value}
                                    value={value}>
                                    {label}
                                </Combobox.Option>
                            ))}
                        </Combobox.Options>
                    </Combobox>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}
