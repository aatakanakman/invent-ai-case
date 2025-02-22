import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { getMovieDetail } from "../store/slices/movieSlice";

export const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { selectedMovie, loading, error } = useAppSelector(
    (state) => state.movie
  );

  useEffect(() => {
    if (id) {
      dispatch(getMovieDetail({ i: id }));
    }
  }, [id, dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg mb-4">{error}</div>
        <Link
          to="/"
          className="text-blue-500 hover:text-blue-400 transition-colors"
        >
          ← Back to Search
        </Link>
      </div>
    );
  }

  if (!selectedMovie) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-4">Film bulunamadı</div>
        <Link
          to="/"
          className="text-blue-500 hover:text-blue-400 transition-colors"
        >
          ← Back to Search
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        to="/"
        className="inline-flex items-center text-blue-500 hover:text-blue-400 transition-colors mb-6"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Search
      </Link>

      <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/3 relative aspect-[2/3]">
            <img
              src={
                selectedMovie.Poster !== "N/A"
                  ? selectedMovie.Poster
                  : "/no-poster.png"
              }
              alt={selectedMovie.Title}
              className="w-full h-full object-cover"
            />
            {selectedMovie.imdbRating !== "N/A" && (
              <div className="absolute top-4 right-4 bg-yellow-500 text-gray-900 font-bold px-3 py-1 rounded-full">
                ★ {selectedMovie.imdbRating}
              </div>
            )}
          </div>

          <div className="flex-1 p-6 lg:p-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              {selectedMovie.Title}
            </h1>
            <div className="flex flex-wrap gap-3 text-sm text-gray-400 mb-6">
              {selectedMovie.Year !== "N/A" && (
                <span>{selectedMovie.Year}</span>
              )}
              {selectedMovie.Runtime !== "N/A" && (
                <span>• {selectedMovie.Runtime}</span>
              )}
              {selectedMovie.Rated !== "N/A" && (
                <span>• {selectedMovie.Rated}</span>
              )}
            </div>

            {selectedMovie.Plot !== "N/A" && (
              <p className="text-gray-300 leading-relaxed mb-8">
                {selectedMovie.Plot}
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <DetailItem label="Director" value={selectedMovie.Director} />
              <DetailItem label="Writer" value={selectedMovie.Writer} />
              <DetailItem label="Cast" value={selectedMovie.Actors} />
              <DetailItem label="Genre" value={selectedMovie.Genre} />
              <DetailItem label="Country" value={selectedMovie.Country} />
              <DetailItem label="Language" value={selectedMovie.Language} />
              <DetailItem label="Awards" value={selectedMovie.Awards} />
              <DetailItem label="Box Office" value={selectedMovie.BoxOffice} />
            </div>

            {selectedMovie.Ratings?.length > 0 && (
              <div className="mt-8 pt-8 border-t border-gray-700">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Other Ratings
                </h2>
                <div className="flex flex-wrap gap-4">
                  {selectedMovie.Ratings.map((rating) => (
                    <div
                      key={rating.Source}
                      className="bg-gray-700/50 px-4 py-3 rounded-lg"
                    >
                      <div className="text-sm text-gray-400">
                        {rating.Source}
                      </div>
                      <div className="text-lg font-semibold text-white">
                        {rating.Value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value }: { label: string; value?: string }) => {
  if (!value || value === "N/A") return null;

  return (
    <div>
      <div className="text-sm text-gray-400 mb-1">{label}</div>
      <div className="text-gray-200">{value}</div>
    </div>
  );
};
