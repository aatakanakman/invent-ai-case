import { Movie } from "../types/movie.types";

interface MovieTableProps {
  movies: Movie[];
}

export const MovieTable = ({ movies }: MovieTableProps) => {
  if (!movies.length) {
    return (
      <div className="text-center text-gray-500 py-8">
        Gösterilecek film bulunamadı
      </div>
    );
  }

  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Film Adı
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Yıl
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              IMDb ID
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {movies.map((movie) => (
            <tr key={movie.imdbID} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-900">{movie.Title}</td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                {movie.Year}
              </td>
              <td className="px-6 py-4 text-sm font-mono text-gray-500 whitespace-nowrap">
                {movie.imdbID}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
