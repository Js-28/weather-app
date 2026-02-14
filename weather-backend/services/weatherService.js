// const axios = require('axios');
// const { getCache, setCache } = require('../utils/cache');

// const API_KEY = process.env.OPENWEATHER_API_KEY;

// async function getWeather({ city, lat, lon }) {
//   const cacheKey = city || `${lat},${lon}`;
//   const cached = getCache(cacheKey);
//   if (cached) return cached;

//   let url = '';
//   if (lat && lon) {
//     url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
//   } else if (city) {
//     url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
//   } else {
//     throw new Error('City or coordinates required');
//   }

//   const response = await axios.get(url);

//   // Cache for 5 minutes
//   setCache(cacheKey, response.data, 5 * 60 * 1000);

//   return response.data;
// }

// async function getHourlyForecast({ city, lat, lon }) {
//   const cacheKey = `hourly-${city || `${lat},${lon}`}`;
// //   const cached = getCache(cacheKey);
// //   if (cached) return cached;

// console.log("called");

//   let url = '';
//   if (lat && lon) {
//     url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
//   } else if (city) {
//     url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;
//   } else {
//     throw new Error('City or coordinates required');
//   }

//   const response = await axios.get(url);
//   setCache(cacheKey, response.data, 5 * 60 * 1000);

//   return response.data;
// }

// module.exports = { getWeather, getHourlyForecast };


const axios = require('axios');
const { getCache, setCache } = require('../utils/cache');

const API_KEY = process.env.OPENWEATHER_API_KEY;

async function getWeather({ city, lat, lon }) {
  const cacheKey = city || `${lat},${lon}`;
  const cached = getCache(cacheKey);
  if (cached) return cached;

  let url = '';
  if (lat != null && lon != null) {
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${Number(lat)}&lon=${Number(lon)}&units=metric&appid=${API_KEY}`;
  } else if (city) {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
  } else {
    throw new Error('City or coordinates required');
  }

  const response = await axios.get(url);
  setCache(cacheKey, response.data, 5 * 60 * 1000);
  return response.data;
}

// async function getHourlyForecast({ city, lat, lon }) {
//   const cacheKey = `hourly-${city || `${lat},${lon}`}`;
//   const cached = getCache(cacheKey);
//   if (cached) return cached;

//   let url = '';
//   if (lat != null && lon != null) {
//     url = `https://api.openweathermap.org/data/2.5/forecast?lat=${Number(lat)}&lon=${Number(lon)}&units=metric&appid=${API_KEY}`;
//   } else if (city) {
//     url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;
//   } else {
//     throw new Error('City or coordinates required');
//   }

//   const response = await axios.get(url);
//   setCache(cacheKey, response.data, 5 * 60 * 1000);
//   return response.data;
// }

async function getHourlyForecast({ city, lat, lon, hours = 1 }) {
  const cacheKey = `hourly-${city || `${lat},${lon}`}-${hours}`;
  const cached = getCache(cacheKey);
  if (cached) return cached;

  try {
    let coordinates = { lat, lon };

    // If city is provided, fetch coordinates
    if (city && (!lat || !lon)) {
      const geoRes = await axios.get('http://api.openweathermap.org/geo/1.0/direct', {
        params: { q: city, limit: 1, appid: API_KEY }
      });
      if (!geoRes.data || geoRes.data.length === 0) {
        console.warn(`City "${city}" not found`);
        return []; // return empty array instead of throwing
      }
      coordinates = { lat: geoRes.data[0].lat, lon: geoRes.data[0].lon };
    }

    const { lat: latitude, lon: longitude } = coordinates;
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,daily,alerts,current&units=metric&appid=${API_KEY}`;

    const response = await axios.get(url);

    const hourlyData = Array.isArray(response.data?.hourly)
      ? response.data.hourly.slice(0, hours)
      : [];

    setCache(cacheKey, hourlyData, 5 * 60 * 1000);
    return hourlyData;
  } catch (err) {
    console.error('Hourly forecast fetch error:', err.message);
    return []; // always return empty array instead of throwing
  }
}


module.exports = { getWeather, getHourlyForecast };
