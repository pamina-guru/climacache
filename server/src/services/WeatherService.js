import axios from "axios";

export const getWeatherByCity = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city,
  )}&appid=${process.env.WEATHER_API_KEY}&units=metric`;

  const response = await axios.get(url);
  return response.data;
};

export const getWeatherByCoords = async (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&units=metric`;

  const response = await axios.get(url);
  return response.data;
};

export const getForecastByCity = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
    city,
  )}&appid=${process.env.WEATHER_API_KEY}&units=metric`;

  const response = await axios.get(url);
  return response.data;
};

export const getForecastByCoords = async (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&units=metric`;

  const response = await axios.get(url);
  return response.data;
};
