import axios from 'axios';
import fs from 'fs';
import { MainClient, PokemonClient } from 'pokenode-ts';
type PokemonResponse = {
    results: { name: string; url: string }[];
};

type PokemonSpecies = {};

const api = new PokemonClient();

type SinglePokemonResponse = {
    name: string;
    sprites: {
        front_default: string;
    };
    types: { slot: number; type: { name: string } }[];
};

type SinglePokemon = {
    name: string;
    sprites: Record<string, string>;
    types: string[];
};

const POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0';
const POKEMON_SPECIES_URL =
    'https://pokeapi.co/api/v2/pokemon-species?limit=10&offset=0';

function fetchAllPokemon(limit = 10) {
    return api.listPokemons(0, limit).then((res) => res.results);
}

function fetchAllSpecies(limit = 10) {
    return api.listPokemonShapes(0, limit).then((res) => res.results);
}

(async () => {
    const urls = await fetchAllPokemon();
    const pokedex = [];
    for (const { name, url } of urls) {
        console.log('Fetching:', name, url);
        const pokemon = await axios.get(url).then(
            ({ data }: { data: SinglePokemonResponse }): SinglePokemon => ({
                name: data.name,
                sprites: data.sprites,
                types: data.types.map((t) => t.type.name),
            })
        );
        pokedex.push(pokemon);
    }

    fs.writeFileSync('pokedex.json', JSON.stringify(pokedex));
})();
