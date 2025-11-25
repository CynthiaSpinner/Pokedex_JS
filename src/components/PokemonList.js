import React from 'react';
import PokemonCard from './PokemonCard';

function PokemonList({ pokemon, totalPokemon, currentPage, totalPages, onNextPage, onPreviousPage }) {
    if (totalPokemon === 0) {
        return (
            <div className="no-results">
                <p>No Pokemon found matching your criteria. Try adjusting the filters!</p>
            </div>
        );
    }

    return (
        <div className="pokemon-list">
            <p className="results-count">
                Showing {pokemon.length} of {totalPokemon} Pokemon (Page {currentPage} of {totalPages})
            </p>
            <div className="pokemon-grid">
                {pokemon.map(p => (
                    <PokemonCard key={p.id} pokemon={p} />
                ))}
            </div>
            
            {totalPages > 1 && (
                <div className="pagination">
                    <button 
                        onClick={onPreviousPage} 
                        disabled={currentPage === 1}
                        className="pagination-btn"
                    >
                        Previous
                    </button>
                    <span className="page-info">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button 
                        onClick={onNextPage} 
                        disabled={currentPage === totalPages}
                        className="pagination-btn"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}

export default PokemonList;