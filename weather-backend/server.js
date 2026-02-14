// require('dotenv').config();
// const express = require('express');
// const helmet = require('helmet');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// const rateLimit = require('express-rate-limit');

// const authRoutes = require('./routes/authRoutes');

// const app = express();

// // Security middleware
// app.use(
//   helmet({
//     crossOriginResourcePolicy: false,
//   })
// );
// app.use(express.json());
// // app.use(cors({
// //   origin: "http://localhost:5173",
// //   credentials: true
// // }));

// const passport = require("passport");
// require("./config/passport");

// app.use(passport.initialize());

// const allowedOrigins = [
//   "http://localhost:5173",
//   process.env.FRONTEND_URL
// ];

// app.use(cors({
//   origin: function(origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true
// }));

// app.use(cookieParser());
// // Rate limiter
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 1000
// });
// app.use(limiter);

// // Routes
// app.use("/api/auth", authRoutes);

// const weatherRoutes = require('./routes/weatherRoutes');
// app.use('/api/weather', weatherRoutes);

// const cityRoutes = require('./routes/cityRoutes');
// app.use('/api/cities', cityRoutes);


// app.listen(process.env.PORT, () => {
//   console.log(`Server running on port ${process.env.PORT}`);
// });



require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

const http = require('http'); // ✅ needed for socket.io
const { Server } = require('socket.io');

const authRoutes = require('./routes/authRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const cityRoutes = require('./routes/cityRoutes');

const app = express();
const server = http.createServer(app);

// Security middleware
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(express.json());

const allowedOrigins = ["http://localhost:5173", process.env.FRONTEND_URL];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(cookieParser());

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 1000 });
app.use(limiter);

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/cities', cityRoutes);

// --- SOCKET.IO SETUP ---
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true
  }
});

// Map to track subscriptions in memory
const userCityMap = new Map(); // userId => cityName

io.on('connection', async (socket) => {
  console.log('New client connected:', socket.id);

  // Fetch userId from query (sent from frontend)
  const { userId } = socket.handshake.auth;

  // Auto-subscribe if user has a subscribedCity in DB
  if (userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (user?.subscribedCity) {
      socket.join(user.subscribedCity);
      userCityMap.set(userId, user.subscribedCity);
      console.log(`Auto-subscribed ${userId} to ${user.subscribedCity}`);
    }
  }

  // socket.on('subscribeCity', async ({ city }) => {
  //   if (!city || !userId) return;

  //   const prevCity = userCityMap.get(userId);
  //   if (prevCity) socket.leave(prevCity);

  //   socket.join(city);
  //   userCityMap.set(userId, city);

  //   // Save to DB
  //   await prisma.user.update({
  //     where: { id: userId },
  //     data: { subscribedCity: city },
  //   });

  //   console.log(`User ${userId} subscribed to city: ${city}`);
  // });

  // socket.on('unsubscribeCity', async () => {
  //   const city = userCityMap.get(userId);
  //   if (city) {
  //     socket.leave(city);
  //     userCityMap.delete(userId);

  //     // Remove from DB
  //     await prisma.user.update({
  //       where: { id: userId },
  //       data: { subscribedCity: null },
  //     });

  //     console.log(`User ${userId} unsubscribed from city: ${city}`);
  //   }
  // });

  socket.on('subscribeCity', async ({ city }) => {
  if (!city) return;

  const prevCity = userCityMap.get(userId);
  if (prevCity) socket.leave(prevCity);

  socket.join(city);
  userCityMap.set(userId, city);

  await prisma.user.update({ where: { id: userId }, data: { subscribedCity: city } });
  console.log(`User ${userId} subscribed to city: ${city}`);
});

socket.on('unsubscribeCity', async () => {
  const city = userCityMap.get(userId);
  if (!city) return;

  socket.leave(city);
  userCityMap.delete(userId);

  await prisma.user.update({ where: { id: userId }, data: { subscribedCity: null } });
  console.log(`User ${userId} unsubscribed from city: ${city}`);
});


  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});


const notificationRoutes = require('./routes/notificationRoutes');
app.use('/api/notifications', notificationRoutes);

const emitWeatherNotifications = require('./utils/emitNotifications');

// After io.on('connection', ...) block
emitWeatherNotifications(io, userCityMap);


// Start server
const PORT = process.env.PORT || 5050;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
