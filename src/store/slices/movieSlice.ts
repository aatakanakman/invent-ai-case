import { createSlice } from '@reduxjs/toolkit'
import { movieApi } from '../../services/api'
import type { AppDispatch, RootState } from '../store'
import { MovieDetailType, MovieType } from '../../types/movie'
import { SearchParamsType } from '../../types/search'
import { MovieDetailParamsType } from '../../types/movieDetail'

type MovieStateType = {
  movies: MovieType[]
  selectedMovie?: MovieDetailType
  isLoading: boolean
  isSearching: boolean
  error?: string
  totalResults: number
}

const initialState: MovieStateType = {
  movies: [],
  selectedMovie: undefined,
  isLoading: false,
  isSearching: false,
  error: undefined,
  totalResults: 0
}

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    startLoading: state => {
      state.isLoading = true
      state.error = undefined
    },
    startSearching: state => {
      state.isSearching = true
      state.error = undefined
      state.movies = []
      state.totalResults = 0
    },
    stopLoading: state => {
      state.isLoading = false
      state.isSearching = false
    },
    setMovieList: (state, { payload }) => {
      state.movies = payload.movies
      state.totalResults = payload.total
      state.isLoading = false
      state.isSearching = false
    },
    setMovie: (state, { payload }) => {
      state.selectedMovie = payload
      state.isLoading = false
    },
    setError: (state, { payload }) => {
      state.error = payload
      state.isLoading = false
      state.isSearching = false
      state.movies = []
      state.totalResults = 0
    },
    resetMovies: state => {
      state.movies = []
      state.totalResults = 0
    },
    resetMovie: state => {
      state.selectedMovie = undefined
    }
  }
})

export const {
  startLoading,
  startSearching,
  stopLoading,
  setMovieList,
  setMovie,
  setError,
  resetMovies,
  resetMovie
} = movieSlice.actions

export const searchMovies = (params: SearchParamsType) => async (dispatch: AppDispatch) => {
  try {
    if (!params.page || params.page === 1) {
      dispatch(startSearching())
    } else {
      dispatch(startLoading())
    }

    const data = await movieApi.search(params)

    if (!data.Search?.length) {
      return dispatch(setError('No results found'))
    }

    dispatch(
      setMovieList({
        movies: data.Search,
        total: Number(data.totalResults) || 0
      })
    )
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_err) {
    dispatch(setError('Search failed'))
  }
}

export const getMovieDetail = (params: MovieDetailParamsType) => async (dispatch: AppDispatch) => {
  try {
    dispatch(startLoading())
    const movie = await movieApi.getDetail(params)

    if (!movie.Title) {
      return dispatch(setError('Movie not found'))
    }

    dispatch(setMovie(movie))
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_err) {
    dispatch(setError('Failed to get movie details'))
  }
}

export const selectMovieList = (state: RootState) => ({
  movies: state.movie.movies,
  isSearching: state.movie.isSearching,
  error: state.movie.error,
  totalResults: state.movie.totalResults
})

export const selectMovie = (state: RootState) => ({
  selectedMovie: state.movie.selectedMovie,
  isLoading: state.movie.isLoading,
  error: state.movie.error
})

export default movieSlice.reducer
