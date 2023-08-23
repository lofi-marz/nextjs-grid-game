export function PokemonMonotypeIcon({ isMonotype }: { isMonotype: boolean }) {
    return (
        <div
            className="flex h-1/2 w-1/2 items-center justify-center rounded-full bg-theme-invert text-2xl font-bold"
            title={`${isMonotype ? 'Monotype' : 'Dual Type'} Icon`}>
            {isMonotype ? 'Mono' : 'Dual'}
        </div>
    );
}
