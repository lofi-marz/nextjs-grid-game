import pokedexJson from 'pokedex.json';

export type PokemonType =
    | 'Normal'
    | 'Fire'
    | 'Water'
    | 'Electric'
    | 'Grass'
    | 'Ice'
    | 'Fighting'
    | 'Poison'
    | 'Ground'
    | 'Flying'
    | 'Psychic'
    | 'Bug'
    | 'Rock'
    | 'Ghost'
    | 'Dragon'
    | 'Dark'
    | 'Steel'
    | 'Fairy';

type Gen = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type PokemonResponse = {
    results: { name: string }[];
};

export type SinglePokemonResponse = {
    name: string;
    sprites: {
        front_default: string;
    };
    types: { slot: number; type: { name: string } }[];
};

type Pokemon = {
    name: string;
    sprite: string;
    types: { slot: number; type: { name: string } }[];
};
