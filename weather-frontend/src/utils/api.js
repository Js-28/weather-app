export const fetchWeather = async ({ city, lat, lon, type = 'current' }) => {
  const params = new URLSearchParams();
  if (city) params.append('city', city);
  if (lat && lon) {
    params.append('lat', lat);
    params.append('lon', lon);
  }

  const res = await fetch(`/api/weather/${type}?${params.toString()}`, {
    credentials: 'include'
  });
  if (!res.ok) throw new Error('Failed to fetch weather');
  return await res.json();
};