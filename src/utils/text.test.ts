import { capitalize } from './text';

describe('Text Utils', () => {
    test('Capitalize function', () => {
        const word = 'test';
        expect(capitalize(word)).toBe('Test');
    });
});
