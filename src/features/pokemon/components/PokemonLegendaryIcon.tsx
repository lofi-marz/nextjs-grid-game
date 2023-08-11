export function PokemonLegendaryIcon({
    isLegendary,
}: {
    isLegendary: boolean;
}) {
    return (
        <div className="flex h-full w-full items-center justify-center text-3xl font-bold">
            {isLegendary ? 'L' : 'NL'}
        </div>
    );
}
