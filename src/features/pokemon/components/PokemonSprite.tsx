import { pokedex } from '../utils';
import Image from 'next/image';
export function PokemonSprite({ pokemon }: { pokemon: string }) {
    const src = pokedex.find((p) => p.value === pokemon)?.sprite!;
    return (
        <Image
            className="object-cover"
            src={src}
            alt={`Sprite for ${pokemon}`}
            fill
        />
    );
}
