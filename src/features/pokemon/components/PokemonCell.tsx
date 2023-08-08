'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from 'lib/utils';
import { Button } from 'components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { getPokemon } from '../api';
import pokedexJson from 'pokedex.json';
const pokemon = pokedexJson.map((p) => ({
    value: p.name.english.toLocaleLowerCase(),
    label: p.name.english,
    sprite: p.image.sprite,
}));

export function PokemonCell() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="h-full w-full justify-between">
                    {value ? (
                        <img
                            src={pokemon.find((p) => p.value === value)?.sprite}
                            alt="Pokemon"
                            style={{ imageRendering: 'pixelated' }}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        ''
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search pokemon..." />
                    <CommandEmpty>No pokemon found.</CommandEmpty>
                    <CommandGroup>
                        {pokemon.map((p) => (
                            <CommandItem
                                key={p.value}
                                onSelect={(currentValue) => {
                                    setValue(
                                        currentValue === value
                                            ? ''
                                            : currentValue
                                    );
                                    setOpen(false);
                                }}>
                                <Check
                                    className={cn(
                                        'mr-2 h-4 w-4',
                                        value === p.value
                                            ? 'opacity-100'
                                            : 'opacity-0'
                                    )}
                                />
                                {p.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
