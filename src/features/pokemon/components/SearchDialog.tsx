import { useState } from 'react';

import { Combobox } from '@headlessui/react';
import { FaCheck } from 'react-icons/fa6';
import { DialogBox } from '@/components/DialogBox';
import { motion } from 'framer-motion';

type SearchDialogProps = {
    pokemonList: { value: string; label: string }[];
    open: boolean;
    initialValue: string;
    onClose: () => void;
    onChange: (value: string) => void;
};

export function SearchDialog({
    pokemonList,
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
                setQuery('');
                setSelected(initialValue);
                console.log('Dialog closed');
                onClose();
            }}
            title="Search Pokemon"
            className="gap-8">
            <Combobox
                value={selected}
                onChange={(v) => {
                    setSelected(v);
                }}>
                <motion.div className="flex h-[1.5lh] w-full flex-row text-light">
                    <Combobox.Input
                        className="border-1 grow rounded-l-xl border-r-0 border-primary-400 bg-light/10 capitalize outline-none transition-all placeholder:text-light focus:ring-light/10"
                        placeholder={initialValue}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                    <button
                        className="flex aspect-square h-full items-center justify-center rounded-r-xl border  border-l-0 border-primary-400 bg-light/10 text-light"
                        onClick={() => {
                            if (selected !== '') {
                                onChange(selected);
                                onClose();
                            }
                        }}>
                        <FaCheck />
                    </button>
                </motion.div>
                <Combobox.Options
                    className="flex max-h-96 w-full flex-col gap-1 overflow-clip"
                    as={motion.ul}>
                    {filteredResults.map(({ value, label }) => (
                        <Combobox.Option
                            className="rounded-xl px-3 py-1 capitalize transition-all hover:cursor-pointer hover:bg-light hover:text-dark"
                            key={value}
                            value={value}
                            as={motion.li}>
                            {label}
                        </Combobox.Option>
                    ))}
                </Combobox.Options>
            </Combobox>
        </DialogBox>
    );
}
