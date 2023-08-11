export function PokemonMonotypeIcon({ isMonotype }: { isMonotype: boolean }) {
    return (
        <div className="flex h-full w-full items-center justify-center text-3xl font-bold">
            {isMonotype ? 'Mono' : 'Dual'}
        </div>
    );
}
