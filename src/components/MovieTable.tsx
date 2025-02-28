import { generatePath, useNavigate } from 'react-router-dom'
import type { MovieType } from '../types/movie'
import { Routes } from '../navigation/routes'

type MovieTableProps = {
  movies: MovieType[]
}

export const MovieTable: React.FC<MovieTableProps> = ({ movies }) => {
  const navigate = useNavigate()

  const handleNavigate = (id: string) => {
    const path = generatePath(Routes.MovieDetail, {
      id
    })
    navigate(path)
  }

  return (
    <div className='overflow-x-auto rounded-lg border border-gray-700'>
      <table className='min-w-full bg-gray-800'>
        <thead className='bg-gray-900/50'>
          <tr>
            <th className='px-8 py-5 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
              Movie Name
            </th>
            <th className='px-8 py-5 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
              Year
            </th>
            <th className='px-8 py-5 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
              IMDb ID
            </th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-700'>
          {movies.map(movie => (
            <tr
              key={movie.imdbID}
              onClick={() => handleNavigate(movie.imdbID)}
              className='hover:bg-gray-700/50 cursor-pointer transition-colors'>
              <td className='px-8 py-5 text-sm text-white'>{movie.Title}</td>
              <td className='px-8 py-5 text-sm text-gray-400 whitespace-nowrap'>{movie.Year}</td>
              <td className='px-8 py-5 text-sm font-mono text-gray-400 whitespace-nowrap'>
                {movie.imdbID}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
