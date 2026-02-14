const express = require("express");
const router = express.Router();
const { getCityList } = require("../controllers/cityController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getCityList);

module.exports = router;
