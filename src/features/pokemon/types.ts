import pokedexJson from './assets/pokedex.json';

export type PokemonType =
    | 'normal'
    | 'fire'
    | 'water'
    | 'electric'
    | 'grass'
    | 'ice'
    | 'fighting'
    | 'poison'
    | 'ground'
    | 'flying'
    | 'psychic'
    | 'bug'
    | 'rock'
    | 'ghost'
    | 'dragon'
    | 'dark'
    | 'steel'
    | 'fairy';

export type PokemonGen = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

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

type Constraint<T extends string, U> = { type: T; value: U };

export type TypeConstraint = Constraint<'type', PokemonType>;

export type GenConstraint = Constraint<'gen', PokemonGen>;

export type LegendaryConstraint = Constraint<'legendary', boolean>;

export type MonotypeConstraint = Constraint<'monotype', boolean>;

export type PokemonConstraint =
    | TypeConstraint
    | GenConstraint
    | LegendaryConstraint
    | MonotypeConstraint;
