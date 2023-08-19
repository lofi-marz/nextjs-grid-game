import { useState } from 'react';

import { Combobox, Dialog } from '@headlessui/react';
import { FaCheck } from 'react-icons/fa6';
import { DialogBox } from '@/components/DialogBox';

type SearchDialogProps =  {
    pokemonList: {name: string, value: string},
    open: boolean;
    initialValue: string;
    onClose: () => void;
    onChange: (value: string) => void;
}

export function SearchDialog({
    pokemonList: pokedex,
    open,
    onClose,
    onChange,
    initialValue,
}: SearchDialogProps) {
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
        <DialogBox
            open={open}
            onClose={() => {
                onClose();
                setQuery('');
                setSelected(initialValue);
                console.log('Dialog closed');
            }}
            title="Search Pokemon">
            <Combobox
                value={selected}
                onChange={(v) => {
                    setSelected(v);
                }}>
                <div className="flex h-[1.5lh] w-full flex-row text-light">
                    <Combobox.Input
                        className="grow rounded-l-xl border-none bg-primary-500 capitalize outline-none transition-all placeholder:text-light focus:ring-light/10"
                        placeholder={initialValue}
                        onChange={(event) => setQuery(event.target.value)}
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
        </DialogBox>
    );
}
