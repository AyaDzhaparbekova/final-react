export async function fetchWeather(city) {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Weather not found');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Weather API error:', err);
    return null;
  }
}
