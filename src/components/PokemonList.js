import React from 'react';
import PokemonCard from './PokemonCard';

function PokemonList({ pokemon }) {
    if (pokemon.length === 0) {
        return (
            <div className="no-results">
                <p>No Pokemon found matching your criteria. Try adjusting the filters!</p>
            </div>
        );
    }

    return (
        <div className="pokemon-list">
            <p className="results-count">Showing {pokemon.length} Pokemon</p>
            <div className="pokemon-grid">
                {pokemon.map(p => (
                    <PokemonCard key={p.id} pokemon={p} />
                ))}
            </div>
        </div>
    );
}

export default PokemonList;