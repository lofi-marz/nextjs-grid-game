import axios from 'axios';
import * as path from 'path';
import { SinglePokemonResponse } from './types';
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
