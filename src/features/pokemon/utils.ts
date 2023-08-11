import pokedexJson from 'pokedex.json';
import { PokemonClient } from 'pokenode-ts';
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

async function isType(pokemon: string, type: string) {
    const p = await getPokemon(pokemon);
    return p.types.map((t) => t.type.name).includes(type);
}

async function isMonotype(pokemon: string) {
    const p = await getPokemon(pokemon);
    return p.types.length === 1;
}

async function isGen(pokemon: string, gen: PokemonGen) {
    const p = await getPokemonSpecies(pokemon);
    /* 
        This is a little hacky, but the gen url includes the number, whereas the field is the roman numeral
        Remind me to update this in a year when gen 10 comes out
    */
    return p.generation.url.includes(gen.toString());
}

async function isLegendary(pokemon: string) {
    const p = await getPokemonSpecies(pokemon);
    return p.is_legendary || p.is_mythical;
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
export async function checkPokemonConstraint(
    { type, value }: PokemonConstraint,
    pokemon: string
) {
    switch (type) {
        case 'gen':
            return isGen(pokemon, value);
        case 'legendary':
            return isLegendary(pokemon);
        case 'monotype':
            return isMonotype(pokemon);
        case 'type':
            return isType(pokemon, value);
        default:
            return false;
    }
}
