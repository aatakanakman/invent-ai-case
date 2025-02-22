import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import { searchMovies, selectMovieList } from '../store/slices/movieSlice'
import { MovieTable } from '../components/MovieTable'
import { Pagination } from '../components/Pagination'
import { YearFilter } from '../components/YearFilter'
import { TypeFilter } from '../components/TypeFilter'
import { EmptyResult } from '../components/EmptyResult'
import { MediaTypes } from '../types/search'
import { Loading } from '../components/Loading'
import useDebounce from '../hooks/useDebounce'

export const SearchPage = () => {
  const dispatch = useAppDispatch()
  const { movies, isSearching, error, totalResults } = useAppSelector(selectMovieList)

  const [searchTerm, setSearchTerm] = useState('Pokemon')
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  const [selectedYear, setSelectedYear] = useState('')
  const [selectedType, setSelectedType] = useState<MediaTypes>(MediaTypes.All)
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(totalResults / 10)

  const handleSearchSubmit = (page?: number) => {
    dispatch(
      searchMovies({
        s: debouncedSearchTerm,
        y: selectedYear || undefined,
        type: selectedType || undefined,
        page: page ?? 1
      })
    )
  }

  useEffect(() => {
    setCurrentPage(1)
    handleSearchSubmit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm, selectedType, selectedYear])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      setCurrentPage(1)
      handleSearchSubmit()
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    handleSearchSubmit(page)
  }

  return (
    <div className='text-white'>
      <form onSubmit={handleSearch} className='mb-8'>
        <div className='flex flex-col gap-4 max-w-3xl mx-auto'>
          <input
            type='text'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder='Enter movie name...'
            className='w-full px-6 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <div className='flex flex-col sm:flex-row gap-4'>
            <YearFilter selectedYear={selectedYear} onChange={setSelectedYear} />
            <TypeFilter selectedType={selectedType} onChange={setSelectedType} />
            <button
              type='submit'
              disabled={isSearching}
              className='w-full sm:w-auto px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'>
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>
      </form>

      {error ? (
        <EmptyResult message={error} />
      ) : movies.length > 0 ? (
        <>
          <MovieTable movies={movies} />
          <div className='mt-4 text-center'>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
            <div className='text-sm text-gray-400 mt-2'>Total {totalResults} results</div>
          </div>
        </>
      ) : isSearching ? (
        <Loading />
      ) : (
        <EmptyResult />
      )}
    </div>
  )
}
