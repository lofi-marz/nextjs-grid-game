import fs from 'fs';
import { PokemonClient } from 'pokenode-ts';
async function main() {
    const api = new PokemonClient();
    const pokedex = JSON.parse(
        fs.readFileSync('../pokedex.json').toString()
    ) as string[];
    const species = await api
        .listPokemonSpecies(0, 10000)
        .then((res) => res.results)
        .then((results) => results.map((p) => p.name));

    const popularities = fs
        .readFileSync('popularity.txt')
        .toString()
        .toLocaleLowerCase()
        .split('\n');

    const notInPokedex = popularities.filter((p) => !pokedex.includes(p));
    const notInPopularities = pokedex.filter((p) => !popularities.includes(p));
    const notInSpecies = popularities.filter((p) => !species.includes(p));
    const speciesNotInPopularities = species.filter(
        (p) => !popularities.includes(p)
    );
    console.log(notInPokedex);
    console.log(notInPopularities);
    console.log(notInSpecies);
    console.log(speciesNotInPopularities);
}

main();
