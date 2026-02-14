const express = require('express');
const router = express.Router();
const { updateSubscribedCity } = require('../controllers/notificationController');
const { protect } = require('../middleware/authMiddleware');

router.post('/subscribe', protect, updateSubscribedCity);

module.exports = router;
