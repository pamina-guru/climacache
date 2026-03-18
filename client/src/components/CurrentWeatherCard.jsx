function CurrentWeatherCard({
  weather,
  source,
  tempUnit,
  windUnit,
  pressureUnit,
}) {
  if (!weather) return null;

  const description =
    weather.weather[0].description.charAt(0).toUpperCase() +
    weather.weather[0].description.slice(1);

  const getWeatherEmoji = (main) => {
    switch (main) {
      case "Clear":
        return "☀️";
      case "Clouds":
        return "☁️";
      case "Rain":
        return "🌧️";
      case "Drizzle":
        return "🌦️";
      case "Thunderstorm":
        return "⛈️";
      case "Snow":
        return "❄️";
      case "Mist":
      case "Fog":
      case "Haze":
      case "Smoke":
        return "🌫️";
      default:
        return "🌤️";
    }
  };

  const convertTemp = (tempC) => {
    if (tempUnit === "fahrenheit") {
      return `${Math.round((tempC * 9) / 5 + 32)}°F`;
    }
    return `${Math.round(tempC)}°C`;
  };

  const convertWind = (windMps) => {
    if (windUnit === "mph") {
      return `${(windMps * 2.23694).toFixed(2)} mph`;
    }

    if (windUnit === "kmh") {
      return `${(windMps * 3.6).toFixed(2)} km/h`;
    }

    return `${windMps.toFixed(2)} m/s`;
  };

  const convertPressure = (pressureHpa) => {
    if (pressureUnit === "atm") {
      return `${(pressureHpa / 1013.25).toFixed(2)} atm`;
    }

    if (pressureUnit === "mbar") {
      return `${pressureHpa} mbar`;
    }

    return `${pressureHpa} hPa`;
  };

  return (
    <div className="w-full max-w-4xl rounded-3xl border border-white/15 bg-white/10 p-6 text-white shadow-2xl backdrop-blur-md">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-bold">{weather.name}</h2>
          <p className="text-white/70">{weather.sys.country}</p>
        </div>

        <span className="rounded-full bg-white/15 px-3 py-1 text-sm">
          Source: {source}
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <div className="mb-2 text-6xl">
            {getWeatherEmoji(weather.weather[0].main)}
          </div>

          <p className="text-6xl font-semibold">
            {convertTemp(weather.main.temp)}
          </p>

          <p className="mt-2 text-lg">{description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="rounded-2xl bg-white/10 p-4">
            <p className="text-white/60">Feels like</p>
            <p className="mt-1 text-xl font-semibold">
              {convertTemp(weather.main.feels_like)}
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 p-4">
            <p className="text-white/60">Humidity</p>
            <p className="mt-1 text-xl font-semibold">
              {weather.main.humidity}%
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 p-4">
            <p className="text-white/60">Wind</p>
            <p className="mt-1 text-xl font-semibold">
              {convertWind(weather.wind.speed)}
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 p-4">
            <p className="text-white/60">Pressure</p>
            <p className="mt-1 text-xl font-semibold">
              {convertPressure(weather.main.pressure)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeatherCard;
