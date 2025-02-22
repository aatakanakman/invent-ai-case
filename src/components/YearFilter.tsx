import { useState, useRef, useEffect } from "react";

interface YearFilterProps {
  selectedYear: string;
  onChange: (year: string) => void;
}

export const YearFilter = ({ selectedYear, onChange }: YearFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i).map(
    String
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full sm:w-36" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full pl-4 pr-10 py-3 rounded-lg bg-gray-800 border border-gray-700 
        text-white text-left cursor-pointer hover:border-gray-600 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
        transition-colors"
      >
        {selectedYear || "All Years"}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className={`fill-current h-4 w-4 transition-transform ${
              isOpen ? "transform rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full sm:w-36 mt-1 bg-gray-800 rounded-lg shadow-lg border border-gray-700 max-h-60 overflow-y-auto">
          <div className="py-1">
            <button
              className={`w-full px-4 py-2 text-left hover:bg-gray-700 ${
                !selectedYear ? "text-blue-500 font-medium" : "text-gray-300"
              }`}
              onClick={() => {
                onChange("");
                setIsOpen(false);
              }}
            >
              All Years
            </button>
            {years.map((year) => (
              <button
                key={year}
                className={`w-full px-4 py-2 text-left hover:bg-gray-700 ${
                  selectedYear === year
                    ? "text-blue-500 font-medium"
                    : "text-gray-300"
                }`}
                onClick={() => {
                  onChange(year);
                  setIsOpen(false);
                }}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
