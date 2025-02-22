import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { searchMovies } from "../store/slices/movieSlice";
import { MovieTable } from "../components/MovieTable";
import { Pagination } from "../components/Pagination";
import { YearFilter } from "../components/YearFilter";
import { TypeFilter } from "../components/TypeFilter";
import type { MediaType } from "../types/movie.types";
import { Empty } from "../components/Empty";

export const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("Pokemon");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedType, setSelectedType] = useState<MediaType | "">("");
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useAppDispatch();
  const { movies, searching, error, totalResults } = useAppSelector(
    (state) => state.movie
  );

  const totalPages = Math.ceil(totalResults / 10);

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

  return (
    <div className="text-white">
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex flex-col gap-4 max-w-3xl mx-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter movie name..."
            className="w-full px-6 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex flex-col sm:flex-row gap-4">
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
              className="w-full sm:w-auto px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {searching ? "Searching..." : "Search"}
            </button>
          </div>
        </div>
      </form>

      {error ? (
        <Empty message={error} />
      ) : movies.length > 0 ? (
        <>
          <MovieTable movies={movies} />
          <div className="mt-4 text-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
            <div className="text-sm text-gray-400 mt-2">
              Total {totalResults} results
            </div>
          </div>
        </>
      ) : searching ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <Empty />
      )}
    </div>
  );
};
