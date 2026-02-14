// const { getWeather, getHourlyForecast } = require('../services/weatherService');

// exports.currentWeather = async (req, res) => {
//   try {
//     const { city, lat, lon } = req.query;
//     const data = await getWeather({ city, lat, lon });
//     res.status(200).json(data);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ message: 'Weather fetch error' });
//   }
// };

// exports.hourlyForecast = async (req, res) => {
//   try {
//     const { city, lat, lon } = req.query;
//     const data = await getHourlyForecast({ city, lat, lon });
//     res.status(200).json(data);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ message: 'Hourly forecast fetch error' });
//   }
// };


const { getWeather, getHourlyForecast } = require("../services/weatherService");

exports.currentWeather = async (req, res) => {
try {
const { lat, lon } = req.query;


if (!lat || !lon) {
  return res.status(400).json({ message: "Coordinates required" });
}

const data = await getWeather({ lat, lon });
res.status(200).json(data);


} catch (err) {
console.error(err);
res.status(500).json({ message: "Weather fetch error" });
}
};

exports.hourlyForecast = async (req, res) => {
try {
const { lat, lon } = req.query;

if (!lat || !lon) {
  return res.status(400).json({ message: "Coordinates required" });
}

const data = await getHourlyForecast({ lat, lon });
res.status(200).json(data);


} catch (err) {
console.error(err);
res.status(500).json({ message: "Hourly forecast fetch error" });
}
};
