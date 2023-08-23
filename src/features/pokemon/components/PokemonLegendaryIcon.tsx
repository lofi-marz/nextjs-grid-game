import clsx from 'clsx';
import { FaDog, FaDragon } from 'react-icons/fa6';

export function PokemonLegendaryIcon({
    isLegendary,
}: {
    isLegendary: boolean;
}) {
    return (
        <div
            className={clsx(
                'flex h-1/2 w-1/2 items-center justify-center rounded-full text-4xl font-bold',
                isLegendary ? 'bg-amber-500' : 'bg-green-500'
            )}
            title={`${isLegendary ? 'Legendary' : 'Non-Legendary'} Icon`}>
            {isLegendary ? <FaDragon /> : <FaDog />}
        </div>
    );
}
