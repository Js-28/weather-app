// const axios = require("axios");
// const { getCache, setCache } = require("../utils/cache");

// const CITIES_API_URL =
//   process.env.CITIES_API_URL ||
//   "https://countriesnow.space/api/v0.1/countries/population/cities";

// const CACHE_KEY = "countriesnow-cities";
// const CACHE_TTL = 60 * 60 * 1000; // 1 hour

// exports.getCityList = async (req, res) => {
//   try {
//     const search = req.query.search?.toLowerCase() || "";

//     // 1️⃣ Check cache
//     let cities = getCache(CACHE_KEY);

//     if (!cities) {
//       const response = await axios.get(CITIES_API_URL, { timeout: 8000 });

//       const rawCities =
//         response.data?.data?.map((item) => item.city).filter(Boolean) || [];

//       // Remove duplicates
//       const uniqueCities = [...new Set(rawCities)];

//       // Sort alphabetically
//       cities = uniqueCities.sort((a, b) =>
//         a.localeCompare(b)
//       );

//       setCache(CACHE_KEY, cities, CACHE_TTL);
//     }

//     // 2️⃣ If user is typing → filter results
//     if (search) {
//       const filtered = cities
//         .filter((city) => city.toLowerCase().startsWith(search))
//         .slice(0, 20); // limit results for performance

//       return res.status(200).json({ cities: filtered });
//     }

//     // 3️⃣ Default → return only top 5 alphabetically
//     return res.status(200).json({
//       cities: cities.slice(0, 5),
//     });

//   } catch (err) {
//     console.error("City fetch error:", err.message);
//     return res.status(500).json({
//       message: "Failed to fetch cities",
//     });
//   }
// };


const { getCities } = require("../services/cityService");

exports.getCityList = async (req, res) => {
  try {
    const search = req.query.search || "";
    const cities = await getCities(search);
    res.status(200).json({ cities });
  } catch (err) {
    console.error("City fetch error:", err.message);
    res.status(500).json({ message: "Failed to fetch cities" });
  }
};