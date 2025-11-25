import React from 'react';

function FilterSection({ title, options, selected, setSelected }) {
    const handleToggle = (option) => {
        setSelected(prev => 
            prev.includes(option)
            ? prev.filter(item => item !== option)
            : [...prev, option]
        );
    };

    return (
        <div className="filter-section">
            <h3>{title}</h3>
            <div className="filter-options">
                {options.map(option => (
                    <label key={option} className="filter-label">
                        <input
                            type="checkbox"
                            checked={selected.includes(option)}
                            onChange={() => handleToggle(option)}
                        />
                        <span>{option}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default FilterSection;