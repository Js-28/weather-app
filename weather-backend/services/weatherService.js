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

async function getHourlyForecast({ lat, lon }) {
  if (lat == null || lon == null) throw new Error('Coordinates required');

  const cacheKey = `hourly-${lat.toFixed(3)},${lon.toFixed(3)}`;
  const cached = getCache(cacheKey);
  if (cached) return cached;

  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=current,minutely,daily,alerts&appid=${API_KEY}`;
  const response = await axios.get(url);

  // Only hourly 1-hour blocks
  const hourly = response.data.hourly.map(h => ({
    dt: h.dt,
    temp: h.temp,
    weather: h.weather,
    feels_like: h.feels_like,
    wind_speed: h.wind_speed,
    wind_deg: h.wind_deg,
    pop: h.pop,
  }));

  setCache(cacheKey, hourly, 5 * 60 * 1000); // cache 5 mins
  return hourly;
}

module.exports = { getWeather, getHourlyForecast };
