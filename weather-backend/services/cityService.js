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


// services/cityService.js
const axios = require("axios");
const { getCache, setCache } = require("../utils/cache");

const API_KEY = process.env.OPENWEATHER_API_KEY;

function dedupeCities(cities) {
  const seen = new Set();
  return cities.filter(c => {
    const key = `${c.name}-${c.country}-${c.lat.toFixed(3)}-${c.lon.toFixed(3)}`;
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

  const response = await axios.get("http://api.openweathermap.org/geo/1.0/direct", {
    params: { q: search, limit: 10, appid: API_KEY },
  });

  let cities = response.data.map(c => ({
    name: c.name,
    country: c.country,
    state: c.state || "",
    lat: c.lat,
    lon: c.lon,
  }));

  // Remove duplicates
  cities = dedupeCities(cities);

//   // Limit to top 5
//   cities = cities.slice(0, 5);

  setCache(cacheKey, cities, 60 * 60 * 1000); // cache 1 hour
  return cities;
}

module.exports = { getCities };
