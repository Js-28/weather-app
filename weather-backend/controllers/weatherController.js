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

exports.hourlyForecast = async (req, res) => {
  try {
    const { city, lat, lon } = req.query;
    const data = await getHourlyForecast({ city, lat, lon });
    res.status(200).json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Hourly forecast fetch error' });
  }
};
