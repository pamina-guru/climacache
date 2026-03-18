import { useEffect, useState } from "react";
import api from "../services/api";
import SearchBar from "../components/SearchBar";
import CurrentWeatherCard from "../components/CurrentWeatherCard";
import Sidebar from "../components/Sidebar";
import ForecastCard from "../components/ForecastCard";

function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [source, setSource] = useState("");
  const [forecastSource, setForecastSource] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [tempUnit, setTempUnit] = useState("celsius");
  const [windUnit, setWindUnit] = useState("mps");
  const [pressureUnit, setPressureUnit] = useState("hpa");

  const updateRecentSearches = (searchName) => {
    setRecentSearches((prev) => {
      const updated = [
        searchName,
        ...prev.filter(
          (item) => item.toLowerCase() !== searchName.toLowerCase(),
        ),
      ];
      return updated.slice(0, 5);
    });
  };

  const handleSearch = async (searchCity = city) => {
    if (!searchCity.trim()) return;

    try {
      setLoading(true);
      setError("");

      const [weatherResponse, forecastResponse] = await Promise.all([
        api.get(`/weather?city=${encodeURIComponent(searchCity)}`),
        api.get(`/weather/forecast?city=${encodeURIComponent(searchCity)}`),
      ]);

      setWeather(weatherResponse.data.data);
      setForecast(forecastResponse.data.data);
      setSource(weatherResponse.data.source);
      setForecastSource(forecastResponse.data.source);
      setCity(searchCity);

      updateRecentSearches(weatherResponse.data.data.name || searchCity);
    } catch (err) {
      if (err.response?.status === 404) {
        setError("City not found. Please try another city.");
      } else {
        setError("Something went wrong while fetching weather data.");
      }

      setWeather(null);
      setForecast(null);
      setSource("");
      setForecastSource("");
    } finally {
      setLoading(false);
    }
  };

  const handleMyLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const [weatherResponse, forecastResponse] = await Promise.all([
            api.get(`/weather?lat=${latitude}&lon=${longitude}`),
            api.get(`/weather/forecast?lat=${latitude}&lon=${longitude}`),
          ]);

          setWeather(weatherResponse.data.data);
          setForecast(forecastResponse.data.data);
          setSource(weatherResponse.data.source);
          setForecastSource(forecastResponse.data.source);
          setCity(weatherResponse.data.data.name || "");

          updateRecentSearches(weatherResponse.data.data.name || "My Location");
        } catch (err) {
          setError("Failed to fetch weather for your current location.");
          setWeather(null);
          setForecast(null);
          setSource("");
          setForecastSource("");
        } finally {
          setLoading(false);
        }
      },
      (geoError) => {
        if (geoError.code === 1) {
          setError("Location permission was denied.");
        } else {
          setError("Unable to get your current location.");
        }
        setLoading(false);
      },
    );
  };

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const [weatherResponse, forecastResponse] = await Promise.all([
            api.get(`/weather?lat=${latitude}&lon=${longitude}`),
            api.get(`/weather/forecast?lat=${latitude}&lon=${longitude}`),
          ]);

          setWeather(weatherResponse.data.data);
          setForecast(forecastResponse.data.data);
          setSource(weatherResponse.data.source);
          setForecastSource(forecastResponse.data.source);
          setCity(weatherResponse.data.data.name || "");
        } catch (err) {
          // silent fail on load
        }
      },
      () => {
        // ignore on load
      },
    );
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-4 py-10">
      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        tempUnit={tempUnit}
        setTempUnit={setTempUnit}
        windUnit={windUnit}
        setWindUnit={setWindUnit}
        pressureUnit={pressureUnit}
        setPressureUnit={setPressureUnit}
      />

      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold tracking-tight">ClimaCache</h1>
          <p className="mt-3 text-lg text-white/70">
            Full-stack weather app with backend API integration and Redis
            caching
          </p>
        </div>

        <SearchBar
          city={city}
          setCity={setCity}
          onSearch={handleSearch}
          onMyLocation={handleMyLocation}
          onOpenSidebar={() => setSidebarOpen(true)}
        />

        {recentSearches.length > 0 && (
          <div className="flex w-full max-w-4xl flex-wrap gap-3">
            {recentSearches.map((item) => (
              <button
                key={item}
                onClick={() => handleSearch(item)}
                className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/20"
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center gap-3 text-white/80">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/30 border-t-white"></div>
            <p>Loading weather data...</p>
          </div>
        )}

        {error && (
          <p className="rounded-xl bg-red-500/15 px-4 py-3 text-red-200">
            {error}
          </p>
        )}

        {!loading && !weather && !error && (
          <div className="rounded-3xl border border-white/10 bg-white/5 px-8 py-10 text-center text-white/70">
            Search for a city to view live weather data.
          </div>
        )}

        <CurrentWeatherCard
          weather={weather}
          source={source}
          tempUnit={tempUnit}
          windUnit={windUnit}
          pressureUnit={pressureUnit}
        />

        {forecast && (
          <div className="w-full max-w-4xl">
            <div className="mb-2 text-right text-xs text-white/50">
              Forecast source: {forecastSource}
            </div>
            <ForecastCard forecast={forecast} tempUnit={tempUnit} />
          </div>
        )}
      </div>
    </main>
  );
}

export default Home;
