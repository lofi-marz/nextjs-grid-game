import { PokemonGen } from '../types';

const genMap = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];
export function PokemonGenIcon({ gen }: { gen: PokemonGen }) {
    return (
        <div className="flex h-full w-full items-center justify-center text-5xl font-bold">
            {genMap[gen - 1]}
        </div>
    );
}
