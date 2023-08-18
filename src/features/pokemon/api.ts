import axios from 'axios';
import * as path from 'path';
import { PokemonConstraint, SinglePokemonResponse } from './types';
import { PokemonClient } from 'pokenode-ts';
import { checkPokemonConstraint } from './utils';
export function getPokemon(idOrName: string) {
    return axios
        .get<SinglePokemonResponse>(
            'https://pokeapi.co/api/v2/pokemon/' + idOrName
        )
        .then(({ data }) => {
            return {
                name: data.name,
                sprite: data.sprites.front_default,
                types: data.types,
            };
        });
}

export async function fetchPokemonConstraints(
    p: PokemonClient,
    pokemonName: string,
    cs: PokemonConstraint[]
) {
    const pokemon = await p.getPokemonByName(pokemonName);
    const pokemonSpecies = await p.getPokemonSpeciesByName(pokemonName);
    const results = await Promise.all(
        cs.map((c) => checkPokemonConstraint(c, pokemon, pokemonSpecies))
    );
    return results.every((v) => v);
}

