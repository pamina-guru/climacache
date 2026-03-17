import axios from "axios";

export const getWeatherData = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`;

  const response = await axios.get(url);
  return response.data;
};
