import React, { useState } from 'react';
import { searchCities } from '../api/geobd';

function SearchBar({ onSelectCity }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  async function handleSearch(e) {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      const cities = await searchCities(value);
      setResults(cities);
    } else {
      setResults([]);
    }
  }

  return (
    <div className='search-bar'>
      <input
        type='text'
        placeholder='Search city...'
        value={query}
        onChange={handleSearch}
      />
      {results.length > 0 && (
        <ul className='search-results'>
          {results.map(city => (
            <li
              key={city.id}
              onClick={() => {
                onSelectCity(city);
                setQuery(city.name);
                setResults([]);
              }}
            >
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
