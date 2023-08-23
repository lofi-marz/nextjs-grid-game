import { PokemonClient } from 'pokenode-ts';
import fs from 'fs';

const api = new PokemonClient();

function difference<T>(arr1: T[], arr2: T[]) {
    const left = arr1.filter((item) => !arr2.includes(item));
    const right = arr2.filter((item) => !arr1.includes(item));
    return [left, right];
}
async function main() {
    const allPokemonNames = await api
        .listPokemons(0, 10000)
        .then((ps) => ps.results.map((p) => p.name));
    const allPokemonSpeciesNames = await api
        .listPokemonSpecies(0, 10000)
        .then((ps) => ps.results.map((p) => p.name));
    /*
    const [left, right] = difference(
        allPokemonNames.filter((p) => !isUselessVariant(p)),
        allPokemonSpeciesNames
    );

    console.dir(
        allPokemonNames
            .filter((p) => !isUselessVariant(p))
            .map((p) => parseName(p, allPokemonSpeciesNames)),
        { maxArrayLength: null }
    );*/
    const entries = [];

    for (const pokemon of allPokemonNames) {
        const data = await api.getPokemonByName(pokemon);
        const entry = [pokemon, data.species.name];
        console.log(entry);
        entries.push(entry);
    }
    fs.writeFileSync(
        './pokemonToSpecies.json',
        JSON.stringify(Object.fromEntries(entries))
    );
    //console.dir(right.map(toPrettyName), { maxArrayLength: null });
}

main();
