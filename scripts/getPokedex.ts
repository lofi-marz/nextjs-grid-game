import axios, { isAxiosError } from 'axios';
import fs from 'fs';
import { MainClient, PokemonClient } from 'pokenode-ts';
type PokemonResponse = {
    results: { name: string; url: string }[];
};

type PokemonSpecies = {};

const api = new PokemonClient();

type SinglePokemon = {
    name: string;
    sprites: Record<string, string>;
    types: string[];
};

const POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0';
const POKEMON_SPECIES_URL =
    'https://pokeapi.co/api/v2/pokemon-species?limit=10&offset=0';

function fetchAllPokemon(limit = 10000) {
    return api.listPokemons(0, limit).then((res) => res.results);
}

function fetchAllSpecies(limit = 10000) {
    return api.listPokemonSpecies(0, limit).then((res) => res.results);
}

(async () => {
    const species = await fetchAllSpecies().then((ss) => ss.map((s) => s.name));

    const allPokemon = [];
    for (const name of species) {
        console.log(name);
        const p = await api.getPokemonSpeciesByName(name);
        console.log([name, p.name]);
        allPokemon.push([name, p.name]);
    }
    fs.writeFileSync('./pokemonSpeciesNames.json', JSON.stringify(allPokemon));
    /*const promises = species.map(async (name) => {
        const species = await api.getPokemonByName(name);

        return [name, species.name];
    });
    const allPokemon = await Promise.all(promises);*/

    /*for (const name of species) {
        const matchingPokemon = await api
            .getPokemonByName(name)
            .catch(() => console.log(name));
    }*/
    /*const pokedex = [];
    for (const { name, url } of urls) {
        console.log('Fetching:', name, url);
        const pokemon = await api.getPokemonByName().then(
            ({ data }: { data: SinglePokemonResponse }): SinglePokemon => ({
                name: data.name,
                sprites: data.sprites,
                types: data.types.map((t) => t.type.name),
            })
        );
        pokedex.push(pokemon);
    }*/

    //fs.writeFileSync('pokedex.json', JSON.stringify(pokedex));
})();
