import React from 'react';

function Filters({ filters, setFilters }) {
  return (
    <div className="input">
      <label>
        Type:
        <select
          value={filters.type}
          onChange={e => setFilters({ ...filters, type: e.target.value })}
        >
          <option value=''>All</option>
          <option value='city'>City</option>
          <option value='beach'>Beach</option>
          <option value='mountain'>Mountain</option>
        </select>
      </label>
      <label style={{ }}>
        Max Budget:
        <input
          type='number'
          value={filters.budget || ''}
          onChange={e =>
            setFilters({
              ...filters,
              budget: e.target.value ? parseInt(e.target.value) : null,
            })
          }
        />
      </label>
    </div>
  );
}

export default Filters;
