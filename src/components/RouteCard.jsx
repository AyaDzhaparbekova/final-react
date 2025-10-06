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
          setWeather(`${Math.round(data.main.temp)}°C, ${data.weather[0].main}`);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchWeather();
  }, [route.country]);

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
      <img src={route.photos[0]} alt={route.name} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
      <h3>{route.name}</h3>
      <p>{route.country}</p>
      <p>Duration: {route.duration} days</p>
      <p>Budget: ${route.budget}</p>
      <p>Weather: {weather ? weather : "Loading..."}</p>
      <button onClick={() => toggleFavorite(route.id)}>
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
      <br />
      <Link to={`/route/${route.id}`}>View Details</Link>
    </div>
  );
}

export default RouteCard;