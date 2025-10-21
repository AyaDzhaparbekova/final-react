import React, { useState } from 'react';

const API = 'http://localhost:4000';

export default function AddDestination({ onAdd }) {
  const [title, setTitle] = useState('');
  const [country, setCountry] = useState('');
  const [duration, setDuration] = useState('');
  const [budget, setBudget] = useState('');
  const [weather, setWeather] = useState('');
  const [type, setType] = useState('city');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const newTrip = {
      title,
      country,
      duration: Number(duration),
      budget: Number(budget),
      weather,
      type,
      image: image || '/images/default.jpg',
      description,
    };

    try {
      const res = await fetch(`${API}/trips`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTrip),
      });

      if (!res.ok) throw new Error('Failed to add destination');
      const data = await res.json();

      onAdd(data);
      alert('Destination added successfully!');

    
      setTitle('');
      setCountry('');
      setDuration('');
      setBudget('');
      setWeather('');
      setType('city');
      setImage('');
      setDescription('');
    } catch (err) {
      alert('Error ' + err.message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: '#f5f5f5',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
      }}
    >
      <h2>Add New Destination</h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        <input
          placeholder='Title'
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <input
          placeholder='Country'
          value={country}
          onChange={e => setCountry(e.target.value)}
          required
        />
        <input
          placeholder='Duration (days)'
          value={duration}
          onChange={e => setDuration(e.target.value)}
          required
        />
        <input
          placeholder='Budget ($)'
          value={budget}
          onChange={e => setBudget(e.target.value)}
          required
        />
        <input
          placeholder='Weather'
          value={weather}
          onChange={e => setWeather(e.target.value)}
        />
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value='city'>City</option>
          <option value='beach'>Beach</option>
          <option value='adventure'>Adventure</option>
          <option value='nature'>Nature</option>
        </select>
        <input
          placeholder='Image URL (optional)'
          value={image}
          onChange={e => setImage(e.target.value)}
        />
      </div>

      <textarea
        placeholder='Description'
        value={description}
        onChange={e => setDescription(e.target.value)}
        rows={3}
        style={{ width: '100%', marginTop: 10 }}
      />

      <button type='submit' style={{ marginTop: 10 }}>
        ➕ Add Destination
      </button>
    </form>
  );
}
