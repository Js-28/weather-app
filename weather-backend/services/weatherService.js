// const axios = require('axios');
// const { getCache, setCache } = require('../utils/cache');

// const API_KEY = process.env.OPENWEATHER_API_KEY;

// async function getWeather({ city, lat, lon }) {
//   const cacheKey = city || `${lat},${lon}`;
//   const cached = getCache(cacheKey);
//   if (cached) return cached;

//   let url = '';
//   if (lat != null && lon != null) {
//     url = `https://api.openweathermap.org/data/2.5/weather?lat=${Number(lat)}&lon=${Number(lon)}&units=metric&appid=${API_KEY}`;
//   } else if (city) {
//     url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
//   } else {
//     throw new Error('City or coordinates required');
//   }

//   const response = await axios.get(url);
//   setCache(cacheKey, response.data, 5 * 60 * 1000);
//   return response.data;
// }

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

// module.exports = { getWeather, getHourlyForecast };


const axios = require("axios");
const { getCache, setCache } = require("../utils/cache");

/* ---------------- WEATHER CODE → DESCRIPTION ---------------- */

function mapWeatherCode(code) {
if (code === 0) return { description: "Clear sky", icon: "01d" };
if (code === 1) return { description: "Mainly clear", icon: "01d" };
if (code === 2) return { description: "Partly cloudy", icon: "02d" };
if (code === 3) return { description: "Overcast", icon: "04d" };
if (code === 45 || code === 48) return { description: "Fog", icon: "50d" };
if (code >= 51 && code <= 67) return { description: "Drizzle", icon: "09d" };
if (code >= 71 && code <= 77) return { description: "Snow", icon: "13d" };
if (code >= 80 && code <= 82) return { description: "Rain showers", icon: "10d" };
if (code >= 95) return { description: "Thunderstorm", icon: "11d" };

return { description: "Unknown", icon: "01d" };
}

/* ---------------- CURRENT WEATHER ---------------- */

async function getWeather({ lat, lon }) {
const cacheKey = `current-${lat},${lon}`;
const cached = getCache(cacheKey);
if (cached) return cached;

const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,weathercode&timezone=auto`;

const { data } = await axios.get(url);

const weather = mapWeatherCode(data.current_weather.weathercode);

// Convert to OpenWeather-like structure
const response = {
name: "Selected Location",
dt: Math.floor(new Date(data.current_weather.time).getTime() / 1000),
timezone: data.utc_offset_seconds,
main: {
temp: data.current_weather.temperature,
temp_min: data.current_weather.temperature - 2,
temp_max: data.current_weather.temperature + 2,
humidity: data.hourly.relativehumidity_2m[0],
},
wind: {
speed: data.current_weather.windspeed,
},
weather: [
{
description: weather.description,
icon: weather.icon,
},
],
};

setCache(cacheKey, response);
return response;
}

/* ---------------- HOURLY FORECAST ---------------- */

async function getHourlyForecast({ lat, lon }) {
const cacheKey = `hourly-${lat},${lon}`;
const cached = getCache(cacheKey);
if (cached) return cached;

const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weathercode&timezone=auto`;

const { data } = await axios.get(url);

const hours = data.hourly.time.map((time, i) => {
const weather = mapWeatherCode(data.hourly.weathercode[i]);

```
return {
  dt: Math.floor(new Date(time).getTime() / 1000),
  main: {
    temp: data.hourly.temperature_2m[i],
  },
  weather: [
    {
      description: weather.description,
      icon: weather.icon,
    },
  ],
};
```

});

setCache(cacheKey, hours);
return hours;
}

module.exports = { getWeather, getHourlyForecast };
