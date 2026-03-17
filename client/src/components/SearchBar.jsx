function SearchBar({ city, setCity, onSearch }) {
  return (
    <div className="flex w-full max-w-xl gap-3">
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="flex-1 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-white/60"
      />
      <button
        onClick={onSearch}
        className="rounded-2xl bg-white px-5 py-3 font-semibold text-slate-900 transition hover:opacity-90"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
