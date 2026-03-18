import express from "express";
import redis from "../services/cacheService.js";
import {
  getWeatherByCity,
  getWeatherByCoords,
  getForecastByCity,
  getForecastByCoords,
} from "../services/weatherService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { city, lat, lon } = req.query;

    if (!city && (!lat || !lon)) {
      return res.status(400).json({
        error: "City or coordinates are required",
      });
    }

    let cacheKey = "";
    let weatherData;

    if (lat && lon) {
      cacheKey = `weather:coords:${lat},${lon}`;
      const cachedData = await redis.get(cacheKey);

      if (cachedData) {
        return res.json({
          source: "cache",
          data: cachedData,
        });
      }

      weatherData = await getWeatherByCoords(lat, lon);
    } else {
      cacheKey = `weather:city:${city.toLowerCase()}`;
      const cachedData = await redis.get(cacheKey);

      if (cachedData) {
        return res.json({
          source: "cache",
          data: cachedData,
        });
      }

      weatherData = await getWeatherByCity(city);
    }

    await redis.set(cacheKey, weatherData, { ex: 600 });

    res.json({
      source: "live",
      data: weatherData,
    });
  } catch (error) {
    const status = error.response?.status || 500;

    if (status === 404) {
      return res.status(404).json({
        error: "City not found",
      });
    }

    res.status(status).json({
      error: "Failed to fetch weather data",
      details: error.message,
    });
  }
});

router.get("/forecast", async (req, res) => {
  try {
    const { city, lat, lon } = req.query;

    if (!city && (!lat || !lon)) {
      return res.status(400).json({
        error: "City or coordinates are required",
      });
    }

    let cacheKey = "";
    let forecastData;

    if (lat && lon) {
      cacheKey = `forecast:coords:${lat},${lon}`;
      const cachedData = await redis.get(cacheKey);

      if (cachedData) {
        return res.json({
          source: "cache",
          data: cachedData,
        });
      }

      forecastData = await getForecastByCoords(lat, lon);
    } else {
      cacheKey = `forecast:city:${city.toLowerCase()}`;
      const cachedData = await redis.get(cacheKey);

      if (cachedData) {
        return res.json({
          source: "cache",
          data: cachedData,
        });
      }

      forecastData = await getForecastByCity(city);
    }

    await redis.set(cacheKey, forecastData, { ex: 600 });

    res.json({
      source: "live",
      data: forecastData,
    });
  } catch (error) {
    const status = error.response?.status || 500;

    if (status === 404) {
      return res.status(404).json({
        error: "Forecast not found",
      });
    }

    res.status(status).json({
      error: "Failed to fetch forecast data",
      details: error.message,
    });
  }
});

export default router;
