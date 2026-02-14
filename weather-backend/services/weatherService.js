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


exports.getHourlyForecast = async (req, res) => {
  try {
    const { city, lat, lon, hours = 1 } = req.query; // default 1 hour
    const numHours = Math.min(Number(hours), 24); // max 24 to prevent huge requests
    const cacheKey = `hourly-${city || `${lat},${lon}`}-${numHours}`;
    const cached = getCache(cacheKey);
    if (cached) return res.status(200).json(cached);

    let coordinates = { lat, lon };

    // If city provided but no lat/lon, fetch coordinates
    if (city && (!lat || !lon)) {
      const geoRes = await axios.get(`http://api.openweathermap.org/geo/1.0/direct`, {
        params: { q: city, limit: 1, appid: API_KEY }
      });

      if (!geoRes.data || geoRes.data.length === 0) {
        console.warn(`City not found: ${city}`);
        return res.status(200).json([]); // return empty array instead of error
      }
      coordinates = { lat: geoRes.data[0].lat, lon: geoRes.data[0].lon };
    }

    const { lat: latitude, lon: longitude } = coordinates;
    const url = `https://api.openweathermap.org/data/2.5/onecall`;
    const response = await axios.get(url, {
      params: {
        lat: latitude,
        lon: longitude,
        exclude: 'minutely,daily,alerts,current',
        units: 'metric',
        appid: API_KEY,
      }
    });

    const hourlyData = Array.isArray(response.data.hourly) 
      ? response.data.hourly.slice(0, numHours) 
      : [];

    setCache(cacheKey, hourlyData, 5 * 60 * 1000); // cache 5 mins
    return res.status(200).json(hourlyData);

  } catch (err) {
    console.error('Hourly forecast fetch error:', err.message);
    return res.status(200).json([]); // always return array to prevent CORS issues
  }
};


module.exports = { getWeather, getHourlyForecast };
