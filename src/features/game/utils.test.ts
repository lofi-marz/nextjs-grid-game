import { PokemonConstraint } from '../pokemon/types';
import { countGuesses, getConstraintsByIndex } from './utils';
const emptyGrid = () => [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];
describe('Grid Utils', () => {
    it('countGuesses correctly counts guesses', () => {
        const testGrid = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, null],
        ];
        expect(countGuesses(testGrid)).toBe(8);
    });

    it('getConstraintsByIndex', () => {
        const testConstraints: PokemonConstraint[] = [
            { type: 'gen', value: 1 },
            { type: 'gen', value: 2 },
            { type: 'gen', value: 3 },
            { type: 'gen', value: 4 },
            { type: 'gen', value: 5 },
            { type: 'gen', value: 6 },
        ];

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                console.log(i, j, getConstraintsByIndex(testConstraints, i, j));
            }
        }
    });
});
