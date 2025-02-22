import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Error } from '../components/Error'
import { Loading } from '../components/Loading'
import { MovieDetailHeader } from '../components/MovieDetailHeader'
import { MovieDetailLine } from '../components/MovieDetailLine'
import { MovieRating } from '../components/MovieRating'
import { useAppDispatch, useAppSelector } from '../store'
import { getMovieDetail, selectMovie } from '../store/slices/movieSlice'
import { movieDetailLines } from '../constants/movieDetail'

export const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const { selectedMovie, isLoading, error } = useAppSelector(selectMovie)

  useEffect(() => {
    if (id) {
      dispatch(getMovieDetail({ i: id }))
    }
  }, [id, dispatch])

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <Error message={error} />
  }

  if (!selectedMovie) {
    return <Error message='Movie not found' />
  }

  return (
    <div>
      <MovieDetailHeader />
      <div className='bg-gray-800 rounded-xl overflow-hidden border border-gray-700'>
        <div className='flex flex-col lg:flex-row'>
          <div className='lg:w-1/3 relative aspect-[2/3]'>
            <img
              src={selectedMovie.Poster !== 'N/A' ? selectedMovie.Poster : '/no-poster.png'}
              alt={selectedMovie.Title}
              className='w-full h-full object-cover'
            />
            {selectedMovie.imdbRating !== 'N/A' && (
              <div className='absolute top-4 right-4 bg-yellow-500 text-gray-900 font-bold px-3 py-1 rounded-full'>
                ★ {selectedMovie.imdbRating}
              </div>
            )}
          </div>

          <div className='flex-1 p-6 lg:p-8'>
            <h1 className='text-3xl font-bold text-white mb-2'>{selectedMovie.Title}</h1>
            <div className='flex flex-wrap gap-3 text-sm text-gray-400 mb-6'>
              {selectedMovie.Year !== 'N/A' && <span>{selectedMovie.Year}</span>}
              {selectedMovie.Runtime !== 'N/A' && <span>• {selectedMovie.Runtime}</span>}
              {selectedMovie.Rated !== 'N/A' && <span>• {selectedMovie.Rated}</span>}
            </div>

            {selectedMovie.Plot !== 'N/A' && (
              <p className='text-gray-300 leading-relaxed mb-8'>{selectedMovie.Plot}</p>
            )}

            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4'>
              {movieDetailLines.map(line => (
                <MovieDetailLine
                  key={line.label}
                  label={line.label}
                  value={selectedMovie[line.value] as string}
                />
              ))}
            </div>

            <MovieRating ratings={selectedMovie.Ratings} />
          </div>
        </div>
      </div>
    </div>
  )
}
