const express = require("express");
const router = express.Router();
const { getCityList } = require("../controllers/cityController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getCityList);

module.exports = router;

// routes/cityRoutes.js
router.get("/me", protect, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user } });
    res.json({ subscribedCity: user?.subscribedCity || null });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch subscribed city" });
  }
});
