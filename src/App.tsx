import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { searchMovies } from "./store/slices/movieSlice";
import { MovieTable } from "./components/MovieTable";
import { Pagination } from "./components/Pagination";
import { YearFilter } from "./components/YearFilter";
import { TypeFilter } from "./components/TypeFilter";
import type { MediaType } from "./types/movie.types";

function App() {
  const [searchTerm, setSearchTerm] = useState("Pokemon");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedType, setSelectedType] = useState<MediaType | "">("");
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useAppDispatch();
  const { movies, searching, error, totalResults } = useAppSelector(
    (state) => state.movie
  );

  const totalPages = Math.ceil(totalResults / 10);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setCurrentPage(1);
      dispatch(
        searchMovies({
          s: searchTerm,
          y: selectedYear || undefined,
          type: selectedType || undefined,
          page: 1,
        })
      );
    }
  };

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    if (searchTerm.trim()) {
      setCurrentPage(1);
      dispatch(
        searchMovies({
          s: searchTerm,
          y: year || undefined,
          type: selectedType || undefined,
          page: 1,
        })
      );
    }
  };

  const handleTypeChange = (type: MediaType | "") => {
    setSelectedType(type);
    if (searchTerm.trim()) {
      setCurrentPage(1);
      dispatch(
        searchMovies({
          s: searchTerm,
          y: selectedYear || undefined,
          type: type || undefined,
          page: 1,
        })
      );
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    dispatch(
      searchMovies({
        s: searchTerm,
        y: selectedYear || undefined,
        type: selectedType || undefined,
        page,
      })
    );
  };

  useEffect(() => {
    dispatch(
      searchMovies({
        s: searchTerm,
        y: selectedYear || undefined,
        type: selectedType || undefined,
        page: 1,
      })
    );
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Film Arama
        </h1>

        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex flex-col md:flex-row gap-2 max-w-3xl mx-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Film adı girin..."
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <YearFilter
              selectedYear={selectedYear}
              onChange={handleYearChange}
            />
            <TypeFilter
              selectedType={selectedType}
              onChange={handleTypeChange}
            />
            <button
              type="submit"
              disabled={searching}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {searching ? "Aranıyor..." : "Ara"}
            </button>
          </div>
        </form>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <MovieTable movies={movies} />

        {movies.length > 0 && (
          <div className="mt-4 text-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
            <div className="text-sm text-gray-500 mt-2">
              Toplam {totalResults} sonuç
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
