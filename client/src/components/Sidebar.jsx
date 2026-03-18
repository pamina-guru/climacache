function Sidebar({
  isOpen,
  setIsOpen,
  tempUnit,
  setTempUnit,
  windUnit,
  setWindUnit,
  pressureUnit,
  setPressureUnit,
}) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 z-50 h-full w-[300px] transform bg-[#020617] p-6 text-white shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Settings</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-lg bg-white/10 px-3 py-1 text-sm hover:bg-white/20"
          >
            Close
          </button>
        </div>

        {/* Units */}
        <div className="mb-6 text-xs uppercase tracking-widest text-white/40">
          Units
        </div>

        {/* Temperature */}
        <div className="mb-4 rounded-2xl bg-white/5 p-4">
          <p className="text-sm text-white/60">Temperature units</p>
          <select
            value={tempUnit}
            onChange={(e) => setTempUnit(e.target.value)}
            className="mt-2 w-full bg-transparent text-lg outline-none"
          >
            <option value="celsius">°C</option>
            <option value="fahrenheit">°F</option>
          </select>
        </div>

        {/* Wind */}
        <div className="mb-4 rounded-2xl bg-white/5 p-4">
          <p className="text-sm text-white/60">Wind speed units</p>
          <select
            value={windUnit}
            onChange={(e) => setWindUnit(e.target.value)}
            className="mt-2 w-full bg-transparent text-lg outline-none"
          >
            <option value="mps">Meters per second (m/s)</option>
            <option value="kmh">Kilometers per hour (km/h)</option>
            <option value="mph">Miles per hour (mph)</option>
          </select>
        </div>

        {/* Pressure */}
        <div className="mb-6 rounded-2xl bg-white/5 p-4">
          <p className="text-sm text-white/60">Pressure units</p>
          <select
            value={pressureUnit}
            onChange={(e) => setPressureUnit(e.target.value)}
            className="mt-2 w-full bg-transparent text-lg outline-none"
          >
            <option value="hpa">Hectopascal (hPa)</option>
            <option value="mbar">Millibar (mbar)</option>
            <option value="atm">Standard atmosphere (atm)</option>
          </select>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-white/10" />

        {/* CONTACT SECTION */}
        <div className="text-xs uppercase tracking-widest text-white/40 mb-3">
          Contacts
        </div>

        <a
          href="https://github.com/pamina-guru/climacache"
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-xl bg-white/5 px-4 py-3 text-sm text-white/80 transition hover:bg-white/10"
        >
          🌐 View Project on GitHub
        </a>

        <p className="mt-6 text-xs text-white/40">© Pamina Guruparan</p>
      </div>
    </>
  );
}

export default Sidebar;
