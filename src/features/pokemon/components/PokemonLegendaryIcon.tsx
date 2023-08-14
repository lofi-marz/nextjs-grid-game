import clsx from 'clsx';

export function PokemonLegendaryIcon({
    isLegendary,
}: {
    isLegendary: boolean;
}) {
    return (
        <div
            className={clsx(
                'flex h-1/2 w-1/2 items-center justify-center rounded-full text-4xl font-bold',
                isLegendary ? 'bg-amber-300' : 'bg-green-300'
            )}>
            {isLegendary ? 'L' : 'NL'}
        </div>
    );
}
