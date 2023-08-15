export function PokemonMonotypeIcon({ isMonotype }: { isMonotype: boolean }) {
    return (
        <div
            className="flex h-full w-full items-center justify-center text-3xl font-bold"
            title={`${isMonotype ? 'Monotype' : 'Dual Type'} Icon`}>
            {isMonotype ? 'Mono' : 'Dual'}
        </div>
    );
}
