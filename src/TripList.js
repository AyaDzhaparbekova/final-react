import React, { useState, useEffect } from 'react';
import AddDestination from './components/AddDestination';
const API = 'https://your-api-url.com'; // Replace with my actual API URL

function TripList() {
  const [trips, setTrips] = useState([]);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('All');

  async function loadTrips(page = 1, type = 'All', query = '') {
    try {
      let url = `${API}/trips?_page=${page}&_limit=5`;
      if (type !== 'All') url += `&type=${type}`;
      if (query) url += `&q=${query}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error('Ошибка при загрузке');
      const data = await res.json();
      setTrips(data);
    } catch (err) {
      alert('Error ' + err.message);
    }
  }

  useEffect(() => {
    loadTrips();
  }, []);

                 


<AddDestination onAdd={newTrip => setTrips(prev => [newTrip, ...prev])} />;
return (
  <div>
    <AddDestination onAdd={(newTrip) => setTrips((prev) => [newTrip, ...prev])} />

    <div style={{ marginBottom: 12 }}>
      <
        placeholder="Search city..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginRight: 8 }}
      />
      <select value={filterType} onChange={(e) => setFilterType(e.target.value)} style={{ marginRight: 8 }}>
        <option>All</option>
        <option>city</option>
        <option>beach</option>
        <option>adventure</option>
        <option>nature</option>
      </select>
      <button onClick={() => loadTrips(1, filterType, search)}>Search</button>
    </div>

    {/* список карточек */}
    {trips.map((trip) => (
      <div key={trip.id} style={{ border: '1px solid #ccc', padding: 12, marginBottom: 8 }}>
        <h3>{trip.name}</h3>
        <p>Type: {trip.type}</p>
        <p>Location: {trip.location}</p>
      </div>
    ))}
  </div>
);
}
