import pokedexJson from './assets/pokedex.json';
import { PokemonClient, Pokemon, PokemonSpecies } from 'pokenode-ts';
import { PokemonConstraint, PokemonGen } from './types';
async function getPokemon(pokemon: string) {
    const p = new PokemonClient();
    return p.getPokemonByName(pokemon);
}

async function getPokemonSpecies(pokemon: string) {
    const p = new PokemonClient();
    return p.getPokemonSpeciesByName(pokemon);
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

export async function isType(pokemon: Pokemon, type: string) {
    return pokemon.types.map((t) => t.type.name).includes(type);
}

export async function isMonotype(pokemon: Pokemon) {
    return pokemon.types.length === 1;
}

export async function isGen(pokemonSpecies: PokemonSpecies, gen: number) {
    /* 
        This is a little hacky, but the gen url includes the number, whereas the field is the roman numeral
        Remind me to update this in a year when gen 10 comes out
    */
    return pokemonSpecies.generation.url.includes(gen.toString());
}

export async function isLegendary(pokemonSpecies: PokemonSpecies) {
    return pokemonSpecies.is_legendary || pokemonSpecies.is_mythical;
}

/*const constraintMap = {
    type: isType,
    gen: isGen,
    monotype: isMonotype,
    legendary: isLegendary,
} satisfies Record<
    PokemonConstraint['type'],
    (...params: any[]) => Promise<boolean>
>;*/
export function checkPokemonConstraint(
    { type, value }: PokemonConstraint,
    pokemon: Pokemon,
    pokemonSpecies: PokemonSpecies //Not sure if it's worth figuring out which one I need vs just doing two API calls
) {
    switch (type) {
        case 'gen':
            return isGen(pokemonSpecies, value);
        case 'legendary':
            return isLegendary(pokemonSpecies);
        case 'monotype':
            return isMonotype(pokemon);
        case 'type':
            return isType(pokemon, value);
        default:
            return false;
    }
}
