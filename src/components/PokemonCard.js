import React from 'react';

function PokemonCard({ pokemon }) {
    return (
        <div className="pokemon-card">
            <div className="pokemon-image">
                <img src={pokemon.img} alt={pokemon.name} />
            </div>
            <h2 className="pokemon-name">{pokemon.name}</h2>
            <p className="pokemon-num"><strong>#{pokemon.num}</strong></p>
            <div className="pokemon-info">
                <p><strong>Type:</strong></p>
                <div className="type-badges">
                    {pokemon.type.map(type => (
                        <span key={type} className="badge">{type}</span>
                    ))}
                </div>
            </div>
            <div className="pokemon-info">
                <p><strong>Weaknesses:</strong></p>
                <div className="weaknesses">
                    {pokemon.weaknesses.map(weakness => (
                        <span key={weakness} className="weakness">{weakness}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PokemonCard;