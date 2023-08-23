import { Stat } from 'pokenode-ts';
import { PokemonStatName } from '../types';
import { cn } from 'lib/utils';
import { capitalize } from '@/utils/text';

const names = {
    attack: 'atk',
    defense: 'def',
    'special-attack': 'sp. atk',
    'special-defense': 'sp. def',
    speed: 'spd',
    hp: 'hp',
} satisfies Record<PokemonStatName, string>;

const colours = {
    defense: 'bg-red-500',
    attack: 'bg-red-500',
    'special-attack': 'bg-red-500',
    'special-defense': 'bg-red-500',
    speed: 'bg-red-500',
    hp: 'bg-red-500',
} satisfies Record<PokemonStatName, string>;

export function PokemonMaxStatIcon({ stat }: { stat: PokemonStatName }) {
    return (
        <div
            className={cn(
                'flex h-1/2 w-1/2 items-center justify-center rounded-full text-2xl font-bold capitalize',
                colours[stat]
            )}
            title={`${capitalize(stat.replace('-', ' '))} Icon`}>
            {names[stat]}
        </div>
    );
}
