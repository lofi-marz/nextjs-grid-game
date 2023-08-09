import { useEffect, useState } from 'react';
import pokedexJson from 'pokedex.json';
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
    value,
    onChange,
}: {
    open: boolean;
    onClose: () => void;
    value: string;
    onChange: (value: string) => void;
}) {
    const [query, setQuery] = useState('');
    const filteredResults =
        query === ''
            ? pokemonList
            : pokemonList.filter((p) =>
                  p.value.toLowerCase().includes(value.toLowerCase())
              );
    useEffect(() => {
        console.log(value);
    }, [value]);
    return (
        <Dialog open={open} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex h-full w-full items-center justify-center p-12">
                <Dialog.Panel className="flex max-w-md flex-col items-center justify-center gap-6 rounded-3xl bg-dark p-6 font-sans">
                    <Dialog.Title>Search</Dialog.Title>
                    <Combobox value={value} onChange={onChange}>
                        <Combobox.Input
                            className="bg-dark"
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <Combobox.Options className="absolute max-h-96 overflow-y-hidden rounded-3xl bg-dark p-4">
                            {filteredResults.map(({ value, label }) => (
                                <Combobox.Option key={value} value={value}>
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
