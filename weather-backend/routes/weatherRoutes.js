const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { currentWeather, hourlyForecast } = require('../controllers/weatherController');

// Protected routes
router.get('/current', protect, currentWeather);
router.get('/hourly', protect, hourlyForecast);

module.exports = router;
