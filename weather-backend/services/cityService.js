// services/cityService.js
const axios = require("axios");
const { getCache, setCache } = require("../utils/cache");

const API_KEY = process.env.OPENWEATHER_API_KEY;

async function getCities(search) {
  if (!search) return [];

  const cacheKey = `cities-${search.toLowerCase()}`;
  const cached = getCache(cacheKey);
  if (cached) return cached;

  const response = await axios.get("http://api.openweathermap.org/geo/1.0/direct", {
    params: {
      q: search,
      limit: 10,
      appid: API_KEY,
    },
  });

  const cities = response.data.map((c) => ({
    name: c.name,
    country: c.country,
    state: c.state || "",
    lat: c.lat,
    lon: c.lon,
  }));

  setCache(cacheKey, cities, 60 * 60 * 1000); // cache 1 hour
  return cities;
}

module.exports = { getCities };
