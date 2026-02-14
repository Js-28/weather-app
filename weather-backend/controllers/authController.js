const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');
const { findUserByEmail, prisma } = require('../models/userModel');



// exports.login = async (req, res) => {
//   console.log('Login body:', req.body); // <-- log incoming request
//   const { email, password } = req.body;

//   const user = findUserByEmail(email);
//   console.log('Found user:', user); // <-- log user lookup

//   if (!user) {
//     return res.status(400).json({ message: 'Invalid credentials' });
//   }

//   const isMatch = await bcrypt.compare(password, user.password);
//   console.log('Password match:', isMatch); // <-- log password check

//   if (!isMatch) {
//     return res.status(400).json({ message: 'Invalid credentials' });
//   }

//   const token = generateToken(user.id);
//   console.log('Generated token:', token); // <-- log token

//   res.cookie('token', token, {
//     httpOnly: true,
//     secure: false,
//     sameSite: 'strict',
//     maxAge: 15 * 60 * 1000
//   });

//   res.status(200).json({ message: 'Login successful', user: { id: user.id, email: user.email } });
// };

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user.id);

    // res.cookie('token', token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    //   sameSite: 'strict',
    //   maxAge: 15 * 60 * 1000
    // });

//     res.cookie('token', token, {
//   httpOnly: true,
//   secure: true,
//   sameSite: "none",   // IMPORTANT
//   maxAge: 15 * 60 * 1000
// });

const isProd = process.env.NODE_ENV === "production";

res.cookie("token", token, {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? "none" : "lax",
  domain: ".weather-app.me",
  // maxAge: 15 * 60 * 1000
  maxAge: 7 * 24 * 60 * 60 * 1000
});

    res.status(200).json({
      message: 'Login successful',
      user: { id: user.id, email: user.email }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

exports.getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user },
      select: {
        id: true,
        email: true
      }
    });

    res.status(200).json({ user });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.logout = (req, res) => {
//   res.cookie("token", "", {
//   httpOnly: true,
//   secure: true,
//   sameSite: "none",
//   expires: new Date(0)
// });
const isProd = process.env.NODE_ENV === "production";

res.cookie("token", "", {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? "none" : "lax",
  domain: ".weather-app.me",
  expires: new Date(0)
});

  res.status(200).json({ message: "Logged out" });
};

