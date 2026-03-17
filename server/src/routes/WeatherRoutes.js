import express from "express";
import redis from "../services/cacheService.js";
import { getWeatherData } from "../services/weatherService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const city = req.query.city;

    if (!city) {
      return res.status(400).json({ error: "City is required" });
    }

    const cacheKey = `weather:${city.toLowerCase()}`;

    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      return res.json({
        source: "cache",
        data: cachedData,
      });
    }

    const liveData = await getWeatherData(city);

    await redis.set(cacheKey, liveData, { ex: 600 });

    res.json({
      source: "live",
      data: liveData,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch weather data",
      details: error.message,
    });
  }
});

export default router;
