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


// // services/cityService.js
// const axios = require("axios");
// const { getCache, setCache } = require("../utils/cache");

// const API_KEY = process.env.OPENWEATHER_API_KEY;

// function dedupeCities(cities) {
//   const seen = new Set();
//   return cities.filter(c => {
//     const key = `${c.name}-${c.country}-${c.lat.toFixed(3)}-${c.lon.toFixed(3)}`;
//     if (seen.has(key)) return false;
//     seen.add(key);
//     return true;
//   });
// }

// async function getCities(search) {
//   if (!search) return [];

//   const cacheKey = `cities-${search.toLowerCase()}`;
//   const cached = getCache(cacheKey);
//   if (cached) return cached;

//   const response = await axios.get("http://api.openweathermap.org/geo/1.0/direct", {
//     params: { q: search, limit: 10, appid: API_KEY },
//   });

//   let cities = response.data.map(c => ({
//     name: c.name,
//     country: c.country,
//     state: c.state || "",
//     lat: c.lat,
//     lon: c.lon,
//   }));

//   // Remove duplicates
//   cities = dedupeCities(cities);

// //   // Limit to top 5
// //   cities = cities.slice(0, 5);

//   setCache(cacheKey, cities, 60 * 60 * 1000); // cache 1 hour
//   return cities;
// }

// module.exports = { getCities };


const axios = require("axios");
const { getCache, setCache } = require("../utils/cache");

const API_KEY = process.env.OPENWEATHER_API_KEY;

// Deduplicate cities by name+country + nearby coordinates
function dedupeCities(cities) {
  const seen = new Map(); // key = cityName-country

  return cities.filter((c) => {
    const key = `${c.name.toLowerCase()}-${c.country}`;
    const existing = seen.get(key);

    if (!existing) {
      seen.set(key, c);
      return true;
    } else {
      const latDiff = Math.abs(existing.lat - c.lat);
      const lonDiff = Math.abs(existing.lon - c.lon);

      if (latDiff < 0.01 && lonDiff < 0.01) {
        return false; // near duplicate
      } else {
        return true;
      }
    }
  });
}

async function getCities(search) {
  if (!search) return [];

  const cacheKey = `cities-${search.toLowerCase()}`;
  const cached = getCache(cacheKey);
  if (cached) return cached;

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

  // Filter partial match
  cities = cities.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  // Deduplicate near cities
  cities = dedupeCities(cities);

  // Limit for frontend performance
  cities = cities.slice(0, 10);

  setCache(cacheKey, cities, 60 * 60 * 1000); // 1h cache
  return cities;
}

module.exports = { getCities };
