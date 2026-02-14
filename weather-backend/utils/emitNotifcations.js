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

const emitWeatherNotifications = (io, userCityMap) => {
  setInterval(async () => {
    try {
      const cityMap = new Map(userCityMap); // copy to avoid mutation
      for (const [userId, city] of cityMap.entries()) {
        // Fetch current weather for this city
        const weatherData = await getWeather({ city });
        const message = getWeatherMessage(weatherData);

        // Send to all sockets in that city room
        io.to(city).emit("newNotification", { city, message });
        console.log(`Notification sent to ${city}: ${message}`);
      }
    } catch (err) {
      console.error("Error emitting notifications:", err);
    }
  },  30 * 1000); // every 15 mins
};

module.exports = emitWeatherNotifications;
