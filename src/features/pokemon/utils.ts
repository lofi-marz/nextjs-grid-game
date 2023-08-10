import pokedexJson from 'pokedex.json';
import { PokemonClient } from 'pokenode-ts';
import { PokemonConstraint } from './types';
async function getPokemon(pokemon: string) {
    const p = new PokemonClient();
    return p.getPokemonByName(pokemon);
}
export function isPokemon(pokemon: string) {
    //TODO: Finish this
    return true;
}

export const pokedex = pokedexJson.map((p) => ({
    value: p.name.english.toLocaleLowerCase(),
    label: p.name.english,
    sprite: p.image.sprite,
}));

export async function isType(pokemon: string, type: string) {
    const p = await getPokemon(pokemon);
    return p.types.map((t) => t.type.name).includes(type);
}

export async function checkPokemonConstraint(
    { type, value }: PokemonConstraint,
    pokemon: string
) {
    if (type === 'type') return isType(pokemon, value);
    return false;
}
