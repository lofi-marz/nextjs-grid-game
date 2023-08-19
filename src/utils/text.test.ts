import { capitalize } from './text';
import { describe, test, expect } from 'vitest';
describe('Text Utils', () => {
    test('Capitalize function', () => {
        const word = 'test';
        expect(capitalize(word)).toBe('Test');
    });
});
