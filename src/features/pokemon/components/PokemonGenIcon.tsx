import { PokemonGen } from '../types';

const genMap = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];
export function PokemonGenIcon({ gen }: { gen: PokemonGen }) {
    const hueDeg = ((gen - 1) / 7) * 360;
    return (
        <div
            title={`Gen ${genMap[gen - 1]} Icon`}
            className="relative flex h-1/2 w-1/2 items-center justify-center rounded-full bg-red-500 text-5xl font-bold "
            style={{ filter: `hue-rotate(${hueDeg}deg)` }}>
            {genMap[gen - 1]}
        </div>
    );
}
