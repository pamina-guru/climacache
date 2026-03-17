import { useState } from "react";
import api from "../services/api";
import SearchBar from "../components/SearchBar";
import CurrentWeatherCard from "../components/CurrentWeatherCard";

function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!city.trim()) return;

    try {
      setLoading(true);
      setError("");

      const response = await api.get(`/weather?city=${city}`);
      setWeather(response.data.data);
      setSource(response.data.source);
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
      setWeather(null);
      setSource("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-4 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold tracking-tight">ClimaCache</h1>
          <p className="mt-3 text-lg text-white/70">
            Full-stack weather app with backend API integration and Redis
            caching
          </p>
        </div>

        <SearchBar city={city} setCity={setCity} onSearch={handleSearch} />

        {loading && <p className="text-white/80">Loading weather data...</p>}

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

        <CurrentWeatherCard weather={weather} source={source} />
      </div>
    </main>
  );
}

export default Home;
