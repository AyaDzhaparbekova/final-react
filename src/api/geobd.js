const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities';
const GEO_API_OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '0f66535a49msh3d28d837cae2c0cp1bb5fajsn40fd2c916f03',
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
  },
};

export async function searchCities(query) {
  try {
    const response = await fetch(
      `${GEO_API_URL}?namePrefix=${query}`,
      GEO_API_OPTIONS
    );
    if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('GeoDB API error:', error);
    return [];
  }
}
