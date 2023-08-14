import {
    GenConstraint,
    LegendaryConstraint,
    MonotypeConstraint,
    TypeConstraint,
} from './types';
import {
    isType,
    isMonotype,
    isGen,
    isLegendary,
    checkPokemonConstraint,
    pokedex,
} from './utils';
//TODO: Refactor these
describe('Pokémon Functions', () => {
    it('should correctly identify if a Pokémon is of a certain type', async () => {
        const result = await isType('pikachu', 'electric');
        expect(result).toBe(true);
    });

    it('should correctly identify if a Pokémon is monotype', async () => {
        const result = await isMonotype('charmander');
        expect(result).toBe(true);
    });

    it('should correctly identify if a Pokémon belongs to a specific generation', async () => {
        const result = await isGen('bulbasaur', 1); // Assuming 1 is the generation for Bulbasaur
        expect(result).toBe(true);
    });

    it('should correctly identify if a Pokémon is legendary or mythical', async () => {
        const result = await isLegendary('mew');
        expect(result).toBe(true);
    });
});

describe('Pokemon Constraint Checker', () => {
    it('should correctly check a gen constraint', async () => {
        const constraint: GenConstraint = { type: 'gen', value: 1 }; // Assuming 1 is the generation for Bulbasaur
        const result = await checkPokemonConstraint(constraint, 'bulbasaur');
        expect(result).toBe(true);
    });

    it('should correctly check a legendary constraint', async () => {
        const constraint: LegendaryConstraint = {
            type: 'legendary',
            value: true,
        };
        const result = await checkPokemonConstraint(constraint, 'mew');
        expect(result).toBe(true);
    });

    it('should correctly check a monotype constraint', async () => {
        const constraint: MonotypeConstraint = {
            type: 'monotype',
            value: true,
        };
        const result = await checkPokemonConstraint(constraint, 'charmander');
        expect(result).toBe(true);
    });

    it('should correctly check a type constraint', async () => {
        const constraint: TypeConstraint = { type: 'type', value: 'fire' };
        const result = await checkPokemonConstraint(constraint, 'charmander');
        expect(result).toBe(true);
    });
});

/*describe('Pokedex', () => {
    it('should contain lowercase English names', () => {
        const lowercaseNames = pokedex.every(
            (pokemon) => pokemon.value === pokemon.value.toLowerCase()
        );
        expect(lowercaseNames).toBe(true);
    });

    it('should contain sprite information for each Pokémon', () => {
        const allHaveSprites = pokedex.every((pokemon) => pokemon.sprite);
        expect(allHaveSprites).toBe(true);
    });
});*/
