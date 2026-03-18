function SearchBar({ city, setCity, onSearch, onMyLocation, onOpenSidebar }) {
  return (
    <div className="flex w-full max-w-4xl items-center gap-3">
      {/* Desktop menu button */}
      <button
        onClick={onOpenSidebar}
        className="hidden items-center justify-center rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-xl text-white transition hover:bg-white/20 md:flex"
      >
        ☰
      </button>

      {/* Mobile menu button */}
      <button
        onClick={onOpenSidebar}
        className="flex items-center justify-center rounded-xl border border-white/15 bg-white/10 p-3 text-xl text-white transition hover:bg-white/20 md:hidden"
      >
        ☰
      </button>

      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSearch();
        }}
        className="min-w-0 flex-1 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-white/60"
      />

      <button
        onClick={onSearch}
        className="rounded-2xl bg-white px-4 py-3 font-semibold text-slate-900 transition hover:opacity-90 md:px-5"
      >
        <span className="hidden sm:inline">Find City</span>
        <span className="sm:hidden">Search</span>
      </button>

      {/* Desktop My Location */}
      <button
        onClick={onMyLocation}
        className="hidden rounded-2xl border border-white/15 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/20 md:block"
      >
        My Location
      </button>

      {/* Mobile My Location */}
      <button
        onClick={onMyLocation}
        className="flex items-center justify-center rounded-xl border border-white/15 bg-white/10 p-3 text-lg text-white transition hover:bg-white/20 md:hidden"
        title="My Location"
      >
        📍
      </button>
    </div>
  );
}

export default SearchBar;
