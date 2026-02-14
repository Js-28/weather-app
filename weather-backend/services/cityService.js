// // services/cityService.js
// const axios = require("axios");
// const { getCache, setCache } = require("../utils/cache");

// const API_KEY = process.env.OPENWEATHER_API_KEY;

// async function getCities(search) {
//   if (!search) return [];

//   const cacheKey = `cities-${search.toLowerCase()}`;
//   const cached = getCache(cacheKey);
//   if (cached) return cached;

//   const response = await axios.get("http://api.openweathermap.org/geo/1.0/direct", {
//     params: {
//       q: search,
//       limit: 10,
//       appid: API_KEY,
//     },
//   });

//   const cities = response.data.map((c) => ({
//     name: c.name,
//     country: c.country,
//     state: c.state || "",
//     lat: c.lat,
//     lon: c.lon,
//   }));

//   setCache(cacheKey, cities, 60 * 60 * 1000); // cache 1 hour
//   return cities;
// }

// module.exports = { getCities };


const axios = require("axios");
const { getCache, setCache } = require("../utils/cache");

const API_KEY = process.env.OPENWEATHER_API_KEY;

// Deduplicate cities strictly
function dedupeCities(cities) {
  const seen = new Set();
  return cities.filter((c) => {
    // Round to 2 decimals for coordinates comparison
    const key = `${c.name.toLowerCase()}-${c.country}-${c.lat.toFixed(2)}-${c.lon.toFixed(2)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function getCities(search) {
  if (!search) return [];

  const cacheKey = `cities-${search.toLowerCase()}`;
  const cached = getCache(cacheKey);
  if (cached) return cached;

  // Increase limit to 50 for better results
  const response = await axios.get("http://api.openweathermap.org/geo/1.0/direct", {
    params: { q: search, limit: 50, appid: API_KEY },
  });

  let cities = response.data.map((c) => ({
    name: c.name,
    country: c.country,
    state: c.state || "",
    lat: c.lat,
    lon: c.lon,
  }));

  // Filter by partial match (case-insensitive)
  cities = cities.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  // Remove duplicates
  cities = dedupeCities(cities);

  // Optional: Limit to top 10 suggestions for frontend performance
  cities = cities.slice(0, 10);

  setCache(cacheKey, cities, 60 * 60 * 1000); // 1-hour cache
  return cities;
}

module.exports = { getCities };

