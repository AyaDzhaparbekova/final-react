import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function RouteCard({ route, toggleFavorite, favorites }) {
  const [weather, setWeather] = useState(null);
  const isFavorite = favorites.includes(route.id);

  useEffect(() => {
    async function fetchWeather() {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const city = route.country; 
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        const data = await res.json();
        if (data.main) {
          setWeather(
            `${Math.round(data.main.temp)}°C, ${data.weather[0].main}`
          );
        } else {
          setWeather('N/A');
        }
      } catch (err) {
        console.error('Weather fetch error:', err);
        setWeather('N/A');
      }
    }

    if (route.country) fetchWeather();
  }, [route.country]);

  const photoSrc = route.photos?.[0] || '/src/assets/default.jpg';

  return (
    <div
      style={{
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
        maxWidth: '500px',
      }}
    >
      <img
        src={photoSrc}
        alt={route.name}
        style={{
        }}
      />

      <h3 style={{ marginBottom: '6px', color: '#333' }}>{route.name}</h3>
      <p style={{  }}>🌍 {route.country}</p>
      <p style={{ }}>
        ⏱ Duration: {route.duration} days
      </p>
      <p style={{  }}>
        💰 Budget: ${route.budget}
      </p>
      <p style={{ margin: '4px 0', color: '#555' }}>
        ☀️ Weather: {weather ? weather : 'Loading...'}
      </p>

      <button
        onClick={() => toggleFavorite(route.id)}
        style={{
          
    }}
      >
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>

      <Link
        to={`/route/${route.id}`}
        style={{
          textDecoration: 'none',
          color: '#2563eb',
          fontWeight: 'bold',
        }}
      >
        View Details →
      </Link>
    </div>
  );
}

export default RouteCard;
