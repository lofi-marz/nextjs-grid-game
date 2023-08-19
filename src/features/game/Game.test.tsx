import { cleanup, fireEvent, render } from '@testing-library/react';
import { vi } from 'vitest';
import { InnerGrid } from './Game';
describe('Game', () => {
    it('Clicking a cell opens the dialog menu', async () => {
        // eslint-disable-next-line testing-library/render-result-naming-convention
        const onClick = vi.fn();
        const view = render(
            <InnerGrid
                cells={[
                    [null, null, null],
                    [null, null, null],
                    [null, null, null],
                ]}
                cellStates={[
                    [null, null, null],
                    [null, null, null],
                    [null, null, null],
                ]}
                onClick={onClick}
            />
        );

        // eslint-disable-next-line testing-library/prefer-screen-queries
        const [button] = await view.findAllByTestId('grid-button');
        fireEvent.click(button);
        expect(onClick).toBeCalled();
    });

    it('Winning the game works', () => {});
});
