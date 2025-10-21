import React, { useState, useEffect, useRef } from 'react';

function SearchBar({ onSelectCity, cities }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!query) {
      setResults([]);
      setHighlightIndex(-1);
      return;
    }

    const lower = query.toLowerCase();
    const filtered = cities.filter(city =>
      city.name.toLowerCase().includes(lower)
    );
    setResults(filtered);
    setHighlightIndex(-1);
  }, [query, cities]);


  useEffect(() => {
    const handleClickOutside = event => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setResults([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = e => {
    setQuery(e.target.value);
  };

  const handleKeyDown = e => {
    if (results.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightIndex >= 0 && highlightIndex < results.length) {
        const city = results[highlightIndex];
        onSelectCity(city);
        setQuery(city.name);
        setResults([]);
      }
    } else if (e.key === 'Escape') {
      setResults([]);
    }
  };

  return (
    <div
      ref={containerRef}
      className='search-bar'>
      <input
        type='text'
        placeholder='Search...'
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />

      {results.length > 0 && (
        <ul
          className='search-results'>
          {results.map((city, idx) => (
            <li
              key={city.id || city.name}
              onClick={() => {
                onSelectCity(city);
                setQuery(city.name);
                setResults([]);
              }}
              onMouseEnter={() => setHighlightIndex(idx)}
              style={{
                padding: '8px',
                background: idx === highlightIndex ? '#eee' : 'transparent',
                cursor: 'pointer',
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
