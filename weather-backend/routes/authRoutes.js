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

const passport = require("passport");


router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {

    const { token } = req.user;

   const isProd = process.env.NODE_ENV === "production";
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
  }

);



router.post('/login', validateLogin, login);
router.get('/me', protect, getMe);
router.post('/logout', logout);

module.exports = router;


