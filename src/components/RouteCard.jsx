import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function RouteCard({ route, toggleFavorite, favorites }) {
  const [weather, setWeather] = useState('Loading...');
  const isFavorite = favorites.includes(route.id);

  useEffect(() => {
    async function fetchWeather() {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const cityMap = {
        France: 'Paris',
        Indonesia: 'Bali',
        Japan: 'Tokyo',
        Kenya: 'Nairobi',
        Iceland: 'Reykjavik',
        UAE: 'Dubai',
      };
      const city = route.city || cityMap[route.country] || route.country;

      if (!apiKey) {
        console.error('❌ OpenWeather API key не найден (.env)');
        setWeather('N/A');
        return;
      }

      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        const data = await res.json();

        if (res.ok && data.main) {
          setWeather(
            `${Math.round(data.main.temp)}°C, ${data.weather[0].main}`
          );
        } else {
          console.warn('⚠️ Погода не найдена для:', city);
          setWeather('N/A');
        }
      } catch (err) {
        console.error(err);
        setWeather('N/A');
      }
    }

    fetchWeather();
  }, [route.country, route.city]);

  const photoSrc = route.photos?.[0] || '/src/assets/default.jpg';

  return (
    <div className='route-card'>
      <img src={photoSrc} alt={route.name} className='route-image' />

      <h3 className='route-title'>{route.name}</h3>
      <p className='route-country'>🌍 {route.country}</p>
      <p className='route-duration'>⏱ Duration: {route.duration} days</p>
      <p className='route-budget'>💰 Budget: ${route.budget}</p>
      <p className='route-weather'>☀️ Weather: {weather}</p>

      <button
        className={`favorite-button ${isFavorite ? 'active' : ''}`}
        onClick={() => toggleFavorite(route.id)}
      >
        {isFavorite ? '★ Remove Favorite' : '☆ Add Favorite'}
      </button>

      <Link to={`/route/${route.id}`} className='details-link'>
        View Details →
      </Link>
    </div>
  );
}

export default RouteCard;
