import { PokemonConstraint } from '../types';
import { PokemonTypeIcon } from './PokemonTypeIcon';
import { PokemonGenIcon } from './PokemonGenIcon';
export function ConstraintIcon({
    constraint,
}: {
    constraint: PokemonConstraint;
}) {
    if (constraint.type === 'type')
        return <PokemonTypeIcon type={constraint.value} />;
    if (constraint.type === 'gen')
        return <PokemonGenIcon gen={constraint.value} />;
}
