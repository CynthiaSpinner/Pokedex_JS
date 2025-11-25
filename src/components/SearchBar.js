import React from 'react';

function SearchBar({ searchName, setSearchName }) {
    return (
        <div className="search-section">
            <input
                type="text"
                placeholder="search Pokemon by name..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="search-input"
            />
        </div>
    );
}

export default SearchBar;