const express = require("express");
const router = express.Router();
const { getCityList } = require("../controllers/cityController");
const { protect } = require("../middleware/authMiddleware");
const { prisma } = require("../models/userModel");

router.get("/", protect, getCityList);

router.get("/me", protect, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user },
      select: { subscribedCity: true }
    });

    res.status(200).json({
      subscribedCity: user?.subscribedCity || null
    });

  } catch (err) {
    console.error("ME ROUTE ERROR:", err);
    res.status(500).json({ message: "Failed to fetch subscribed city" });
  }
});

module.exports = router;


