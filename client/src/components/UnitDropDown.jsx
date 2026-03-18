import { useEffect, useRef, useState } from "react";

function UnitDropdown({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/8 px-4 py-4 text-left text-white transition hover:bg-white/12"
      >
        <div>
          <p className="text-sm text-white/60">{label}</p>
          <p className="mt-1 text-lg font-medium text-white">
            {selectedOption?.shortLabel}
          </p>
        </div>

        <div className="ml-4 flex flex-col items-center text-white/60">
          <span className={`text-xs transition ${open ? "rotate-180" : ""}`}>
            ▲
          </span>
          <span
            className={`-mt-1 text-xs transition ${open ? "rotate-180" : ""}`}
          >
            ▼
          </span>
        </div>
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-50 overflow-hidden rounded-2xl border border-blue-400/20 bg-slate-900/95 shadow-2xl backdrop-blur-xl">
          {options.map((option) => {
            const isSelected = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between px-4 py-4 text-left transition ${
                  isSelected
                    ? "bg-blue-500/15 text-blue-300"
                    : "text-white hover:bg-white/8"
                }`}
              >
                <span className="text-base">{option.label}</span>
                {isSelected && <span className="text-lg">✓</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default UnitDropdown;
