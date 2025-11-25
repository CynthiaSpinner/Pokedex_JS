import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import FilterSection from './components/FilterSection';
import PokemonList from './components/PokemonList';


function App() {
  //using state for all pokemon data
  const [pokemon, setPokemon] = useState([]);

  //using state for filtered pokemon
  const [filteredPokemon, setFilteredPokemon] = useState([]);

  //using state for search and filters
  const [searchName, setSearchName] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedWeaknessess, setSelectedWeaknessess] = useState([]);

  //setting state for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 12; // 3 rows at 4 columns (desktop)

  //setting state for loading
  const [loading, setLoading] =useState(true);

  //fetching pokemon data on component mount
  useEffect(() => {
    console.log('fetching pokemon data...');
    fetch('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json')
    .then(response => response.json())
    .then(data => {
      console.log('data fetched:', data.pokemon.length, 'pokemon');
      setPokemon(data.pokemon);
      setFilteredPokemon(data.pokemon);
      setLoading(false);    
    })
    .catch(error => {
      console.error('error fetching:', error);
      setLoading(false);
    });
  }, []);

  //filtering pokemon when the search criteria is new
  useEffect(() => {
    let filter = pokemon;

    //filtering by name (search box)
    if (searchName.trim() !== '') {
      filter = filter.filter(p => p.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    //filtering by type (checkbox)
    if (selectedTypes.length > 0) {
      filter = filter.filter(p => selectedTypes.every(type => p.type.includes(type))
      );
    }

    //filtering by weakness (checkbox)
    if (selectedWeaknessess.length > 0) {
      filter = filter.filter(p =>
        selectedWeaknessess.every(weakness => p.weaknesses.includes(weakness))
      );
    }

    setFilteredPokemon(filter);
    setCurrentPage(1); // Reset to page 1 when filters change
  }, [searchName, selectedTypes, selectedWeaknessess, pokemon]);

  //getting unique types and weaknesses for filter options
  const allTypes = [...new Set(pokemon.flatMap(p => p.type))].sort();
  const allWeaknesses = [...new Set(pokemon.flatMap(p => p.weaknesses))].sort();

  //clearing all filters
  const clearFilters = () => {
    setSearchName('');
    setSelectedTypes([]);
    setSelectedWeaknessess([]);
  };

  //pagination calculations
  const totalPages = Math.ceil(filteredPokemon.length / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentPokemon = filteredPokemon.slice(indexOfFirstCard, indexOfLastCard);

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  if (loading) {
    return (
      <div className="App">
        <div className="loading">Loading Pokemon...</div>
      </div>
    );
  }
  
  return (
    <div className="App">
      <header className="app-header">
        <h1>Pokemon Index</h1>
        <p className="subtitle">Search and filter through {pokemon.length} Pokemon</p>
      </header>

      <div className="controls">
        <SearchBar
          searchName={searchName}
          setSearchName={setSearchName}
        />

        <div className="filters-container">
          <FilterSection
            title="Filter by Type"
            options={allTypes}
            selected={selectedTypes}
            setSelected={setSelectedTypes}
          />

          <FilterSection
            title="Filter by Weakness"
            options={allWeaknesses}
            selected={selectedWeaknessess}
            setSelected={setSelectedWeaknessess}
          />
        </div>

        {(searchName || selectedTypes.length > 0 || selectedWeaknessess.length > 0) && (
          <button onClick={clearFilters} className="clear-filters-btn">
            Clear All Filters
          </button>
        )}
      </div>

      <PokemonList 
        pokemon={currentPokemon}
        totalPokemon={filteredPokemon.length}
        currentPage={currentPage}
        totalPages={totalPages}
        onNextPage={goToNextPage}
        onPreviousPage={goToPreviousPage}
      />
    </div>
  );
}

export default App;
