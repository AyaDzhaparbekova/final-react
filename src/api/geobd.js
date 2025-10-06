export async function searchCities(query) {
  const apiKey = import.meta.env.VITE_GEODB_API_KEY;

  const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${query}&limit=5`;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
    },
  };

  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error('Failed to fetch cities');
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error('GeoDB API error:', err);
    return [];
  }
}
