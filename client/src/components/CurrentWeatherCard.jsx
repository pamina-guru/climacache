function CurrentWeatherCard({ weather, source }) {
  if (!weather) return null;

  return (
    <div className="w-full max-w-3xl rounded-3xl border border-white/15 bg-white/10 p-6 text-white shadow-2xl backdrop-blur-md">
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
          <p className="text-6xl font-semibold">
            {Math.round(weather.main.temp)}°C
          </p>
          <p className="mt-2 text-lg capitalize">
            {weather.weather[0].description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="rounded-2xl bg-white/10 p-4">
            <p className="text-white/60">Feels like</p>
            <p className="mt-1 text-xl font-semibold">
              {Math.round(weather.main.feels_like)}°C
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
              {weather.wind.speed} m/s
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 p-4">
            <p className="text-white/60">Pressure</p>
            <p className="mt-1 text-xl font-semibold">
              {weather.main.pressure} hPa
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeatherCard;
