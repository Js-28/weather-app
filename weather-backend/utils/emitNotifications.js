const { getWeather } = require('../services/weatherService');

function getWeatherMessage(weatherData) {
  if (!weatherData || !weatherData.main || !weatherData.weather) return "Weather update available!";

  const temp = weatherData.main.temp;
  const mainWeather = weatherData.weather[0].main.toLowerCase();
  const description = weatherData.weather[0].description;

  let msg = "";

  // Temperature-based messages
  if (temp >= 30) msg = "It's hot outside! 🌞";
  else if (temp >= 20) msg = "Nice warm weather today! ☀️";
  else if (temp >= 10) msg = "Mild temperature today. 🌤️";
  else if (temp >= 0) msg = "Chilly weather! 🥶";
  else msg = "Freezing cold! ❄️";

  // Weather condition messages override or add
  if (mainWeather.includes("rain")) msg = `Rainy weather today: ${description}. ☔`;
  else if (mainWeather.includes("cloud")) msg = `Cloudy skies: ${description}. ☁️`;
  else if (mainWeather.includes("snow")) msg = `Snowfall happening! ❄️`;
  else if (mainWeather.includes("thunderstorm")) msg = `Thunderstorms expected! ⚡`;

  return msg;
}

const { prisma } = require("../models/userModel");

const emitWeatherNotifications = (io, userCityMap) => {
  setInterval(async () => {
    try {

      const users = await prisma.user.findMany({
        where: {
          subscribedLat: { not: null },
          subscribedLon: { not: null }
        }
      });

      for (const user of users) {

        const weatherData = await getWeather({
          lat: user.subscribedLat,
          lon: user.subscribedLon
        });

        const message = getWeatherMessage(weatherData);

        io.to(user.subscribedCity).emit("newNotification", {
          city: user.subscribedCity,
          message
        });

        console.log(`Notification sent to ${user.subscribedCity}: ${message}`);
      }

    } catch (err) {
      console.error("Error emitting notifications:", err);
    }
  }, 30 * 1000);
};


module.exports = emitWeatherNotifications;
