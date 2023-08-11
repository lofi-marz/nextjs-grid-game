import { useEffect, useState } from 'react';
import pokedexJson from '../assets/pokedex.json';
import { Combobox, Dialog, Popover } from '@headlessui/react';
import Image from 'next/image';
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
    onClose: () => void;
    initialValue: string;
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
        <Dialog open={open} onClose={onClose} className="relative z-50 text-xl">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex h-full w-full items-start justify-center p-12 pt-48 decoration-primary-500">
                <Dialog.Panel className="flex w-full max-w-sm flex-col items-center justify-center gap-6 rounded-xl border-2 border-neutral-800 bg-dark p-6 font-sans drop-shadow">
                    <Dialog.Title className="font-bold">
                        Search Pokemon
                    </Dialog.Title>
                    <Combobox
                        value={selected}
                        onChange={(v) => {
                            setSelected(v);
                            onChange(v);
                        }}>
                        <Combobox.Input
                            className="w-full rounded-xl border-none bg-neutral-950 outline-none"
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <Combobox.Options className="max-h-96 w-full text-sm">
                            {filteredResults.map(({ value, label }) => (
                                <Combobox.Option
                                    className="hover:cursor-pointer"
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
