import React, { useEffect, useState } from 'react';
import { fetchWeather } from '../api/weather';

function WeatherCard({ city }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    async function loadWeather() {
      const data = await fetchWeather(city.name);
      setWeather(data);
    }
    if (city) loadWeather();
  }, [city]);

  if (!city) return null;
  if (!weather) return <p>Loading weather...</p>;

  return (
    <div className='weather-card'>
      <h2>
        {city.name}, {city.country}
      </h2>
      <p>🌡 {Math.round(weather.main.temp)}°C</p>
      <p>{weather.weather[0].description}</p>
    </div>
  );
}

export default WeatherCard;
