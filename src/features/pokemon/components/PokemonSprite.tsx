import { PokemonClient } from 'pokenode-ts';
import { pokedex } from '../utils/constraintUtils';
import Image from 'next/image';
import { useQuery } from 'react-query';
export function PokemonSprite({ pokemon }: { pokemon: string }) {
    //const src = pokedex.find((p) => p.value === pokemon)?.sprite!;
    const p = new PokemonClient(); //TODO: Context
    const { data } = useQuery({
        queryKey: 'pokemon-' + pokemon,
        queryFn: () => p.getPokemonByName(pokemon),
    });
    const sprite = data?.sprites.front_default;

    return (
        <div className="relative h-full w-full">
            {sprite && (
                <Image
                    className="object-cover drop-shadow-2xl"
                    src={sprite}
                    alt={`Sprite for ${pokemon}`}
                    fill
                    style={{ imageRendering: 'pixelated' }}
                    quality="100"
                />
            )}
        </div>
    );
}
