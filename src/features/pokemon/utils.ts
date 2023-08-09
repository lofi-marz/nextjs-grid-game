import pokedexJson from 'pokedex.json';
export function isPokemon(pokemon: string) {
    //TODO: Finish this
    return true;
}

export const pokedex = pokedexJson.map((p) => ({
    value: p.name.english.toLocaleLowerCase(),
    label: p.name.english,
    sprite: p.image.sprite,
}));
