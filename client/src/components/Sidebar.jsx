import UnitDropdown from "./UnitDropdown";

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
  const temperatureOptions = [
    { value: "celsius", label: "Celsius (°C)", shortLabel: "°C" },
    { value: "fahrenheit", label: "Fahrenheit (°F)", shortLabel: "°F" },
  ];

  const windOptions = [
    {
      value: "kmh",
      label: "Kilometers per hour (km/h)",
      shortLabel: "km/h",
    },
    {
      value: "mps",
      label: "Meters per second (m/s)",
      shortLabel: "m/s",
    },
    {
      value: "mph",
      label: "Miles per hour (mph)",
      shortLabel: "mph",
    },
  ];

  const pressureOptions = [
    {
      value: "hpa",
      label: "Hectopascal (hPa)",
      shortLabel: "hPa",
    },
    {
      value: "mbar",
      label: "Millibar (mbar)",
      shortLabel: "mbar",
    },
    {
      value: "atm",
      label: "Standard atmosphere (atm)",
      shortLabel: "atm",
    },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/45 backdrop-blur-[2px]"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <aside
        className={`fixed left-0 top-0 z-40 h-full w-[340px] transform border-r border-white/10 bg-slate-950/95 p-6 text-white shadow-2xl backdrop-blur-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold">Settings</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            Close
          </button>
        </div>

        <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
          Units
        </div>

        <div className="space-y-4">
          <UnitDropdown
            label="Temperature units"
            value={tempUnit}
            options={temperatureOptions}
            onChange={setTempUnit}
          />

          <UnitDropdown
            label="Wind speed units"
            value={windUnit}
            options={windOptions}
            onChange={setWindUnit}
          />

          <UnitDropdown
            label="Pressure units"
            value={pressureUnit}
            options={pressureOptions}
            onChange={setPressureUnit}
          />
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
            About
          </p>
          <p className="mt-3 text-sm leading-6 text-white/55">
            Customize how weather data is displayed in ClimaCache with a
            cleaner, more product-style settings panel.
          </p>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
