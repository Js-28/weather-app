// const express = require('express');
// const router = express.Router();
// const { login } = require('../controllers/authController');
// const { validateLogin } = require('../middleware/validate');

// router.post('/login', validateLogin, login);

// module.exports = router;


const express = require('express');
const router = express.Router();
const { login, getMe, logout } = require('../controllers/authController');
const { validateLogin } = require('../middleware/validate');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', validateLogin, login);
router.get('/me', protect, getMe);
router.post('/logout', logout);

module.exports = router;
