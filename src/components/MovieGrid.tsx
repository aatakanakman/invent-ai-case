import { Movie } from "../types/movie.types";

interface MovieGridProps {
  movies: Movie[];
}

export const MovieGrid = ({ movies }: MovieGridProps) => {
  if (!movies.length) {
    return (
      <div className="text-center text-gray-500 py-8">
        Gösterilecek film bulunamadı
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {movies.map((movie) => (
        <div
          key={movie.imdbID}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="aspect-[2/3] relative">
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "/no-poster.png"}
              alt={movie.Title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
              {movie.Title}
            </h3>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>{movie.Year}</span>
              <span className="font-mono">{movie.imdbID}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
