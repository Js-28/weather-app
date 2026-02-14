const { getWeather, getHourlyForecast } = require('../services/weatherService');

exports.currentWeather = async (req, res) => {
  try {
    const { city, lat, lon } = req.query;
    const data = await getWeather({ city, lat, lon });
    res.status(200).json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Weather fetch error' });
  }
};

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


exports.hourlyForecast = async (req, res) => {
  try {
    const { city, lat, lon, hours } = req.query;
    const numHours = parseInt(hours, 10) || 1; // default 1 hour
    const data = await getHourlyForecast({ city, lat, lon, hours: numHours });
    res.status(200).json(data);
  } catch (err) {
    console.error('Hourly forecast fetch error:', err.message);
    res.status(200).json([]); // return empty array if any error
  }
};
