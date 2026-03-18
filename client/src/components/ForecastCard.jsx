function ForecastCard({ forecast, tempUnit }) {
  if (!forecast || !forecast.list) return null;

  const getDailyForecasts = () => {
    const dailyMap = new Map();

    forecast.list.forEach((item) => {
      const date = item.dt_txt.split(" ")[0];

      if (!dailyMap.has(date)) {
        dailyMap.set(date, item);
      }
    });

    return Array.from(dailyMap.values()).slice(0, 5);
  };

  const dailyForecasts = getDailyForecasts();

  const formatTemp = (tempC) => {
    if (tempUnit === "fahrenheit") {
      return `${Math.round((tempC * 9) / 5 + 32)}°F`;
    }
    return `${Math.round(tempC)}°C`;
  };

  const formatDay = (dateText) => {
    const date = new Date(dateText);
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

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

  return (
    <div className="w-full max-w-4xl rounded-3xl border border-white/15 bg-white/10 p-6 text-white shadow-2xl backdrop-blur-md">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-2xl font-bold">5-Day Forecast</h3>
        <p className="text-sm text-white/60">Daily outlook</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {dailyForecasts.map((item) => (
          <div
            key={item.dt}
            className="rounded-2xl border border-white/10 bg-white/8 p-4 text-center transition hover:bg-white/12"
          >
            <p className="text-sm text-white/60">{formatDay(item.dt_txt)}</p>
            <div className="mt-3 text-4xl">
              {getWeatherEmoji(item.weather[0].main)}
            </div>
            <p className="mt-3 text-xl font-semibold">
              {formatTemp(item.main.temp)}
            </p>
            <p className="mt-2 text-sm text-white/70">
              {item.weather[0].description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForecastCard;
