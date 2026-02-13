const axios = require('axios');
const { getCache, setCache } = require('../utils/cache');

const API_KEY = process.env.OPENWEATHER_API_KEY;

async function getWeather({ city, lat, lon }) {
  const cacheKey = city || `${lat},${lon}`;
  const cached = getCache(cacheKey);
  if (cached) return cached;

  let url = '';
  if (lat && lon) {
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  } else if (city) {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
  } else {
    throw new Error('City or coordinates required');
  }

  const response = await axios.get(url);

  // Cache for 5 minutes
  setCache(cacheKey, response.data, 5 * 60 * 1000);

  return response.data;
}

async function getHourlyForecast({ city, lat, lon }) {
  const cacheKey = `hourly-${city || `${lat},${lon}`}`;
//   const cached = getCache(cacheKey);
//   if (cached) return cached;

console.log("called");

  let url = '';
  if (lat && lon) {
    url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  } else if (city) {
    url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;
  } else {
    throw new Error('City or coordinates required');
  }

  const response = await axios.get(url);
  setCache(cacheKey, response.data, 5 * 60 * 1000);

  return response.data;
}

module.exports = { getWeather, getHourlyForecast };
