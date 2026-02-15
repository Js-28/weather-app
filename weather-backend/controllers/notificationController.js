// const { prisma } = require('../models/userModel');

// exports.updateSubscribedCity = async (req, res) => {
//   try {
//     const { city } = req.body;
//     const userId = req.user;

//     if (!city) return res.status(400).json({ message: "City required" });

//     // Update user in database
//     await prisma.user.update({
//       where: { id: userId },
//       data: { subscribedCity: city },
//     });

//     res.status(200).json({ success: true, city });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to update city" });
//   }
// };

const { prisma } = require('../models/userModel');

exports.updateSubscribedCity = async (req, res) => {
  try {
    const { city, lat, lon } = req.body;
    const userId = req.user;

    if (!city || lat == null || lon == null) {
      return res.status(400).json({ message: "City, lat and lon required" });
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        subscribedCity: city,
        subscribedLat: Number(lat),
        subscribedLon: Number(lon),
      },
    });

    res.status(200).json({ success: true, city, lat, lon });

  } catch (err) {
    console.error("SUBSCRIBE ERROR:", err);
    res.status(500).json({ message: "Failed to update city" });
  }
};

