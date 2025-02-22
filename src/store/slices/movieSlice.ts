import { createSlice } from "@reduxjs/toolkit";
import { movieApi } from "../../services/api";
import type {
  Movie,
  MovieDetail,
  SearchParams,
  DetailParams,
} from "../../types/movie.types";
import type { AppDispatch } from "../store";

interface MovieState {
  movies: Movie[];
  selectedMovie: MovieDetail | null;
  loading: boolean;
  searching: boolean;
  error: string | null;
  totalResults: number;
}

const initialState: MovieState = {
  movies: [],
  selectedMovie: null,
  loading: false,
  searching: false,
  error: null,
  totalResults: 0,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    startSearching: (state) => {
      state.searching = true;
      state.error = null;
      state.movies = [];
      state.totalResults = 0;
    },
    stopLoading: (state) => {
      state.loading = false;
      state.searching = false;
    },
    setMovieList: (state, { payload }) => {
      state.movies = payload.movies;
      state.totalResults = payload.total;
      state.loading = false;
      state.searching = false;
    },
    setMovie: (state, { payload }) => {
      state.selectedMovie = payload;
      state.loading = false;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
      state.searching = false;
      state.movies = [];
      state.totalResults = 0;
    },
    resetMovies: (state) => {
      state.movies = [];
      state.totalResults = 0;
    },
    resetMovie: (state) => {
      state.selectedMovie = null;
    },
  },
});

export const {
  startLoading,
  startSearching,
  stopLoading,
  setMovieList,
  setMovie,
  setError,
  resetMovies,
  resetMovie,
} = movieSlice.actions;

export const searchMovies =
  (params: SearchParams) => async (dispatch: AppDispatch) => {
    try {
      if (!params.page || params.page === 1) {
        dispatch(startSearching());
      } else {
        dispatch(startLoading());
      }

      const data = await movieApi.search(params);

      if (!data.Search?.length) {
        return dispatch(setError("No results found"));
      }

      dispatch(
        setMovieList({
          movies: data.Search,
          total: Number(data.totalResults) || 0,
        })
      );
    } catch (err) {
      dispatch(setError("Search failed"));
    }
  };

export const getMovieDetail =
  (params: DetailParams) => async (dispatch: AppDispatch) => {
    try {
      dispatch(startLoading());
      const movie = await movieApi.getDetail(params);

      if (!movie.Title) {
        return dispatch(setError("Movie not found"));
      }

      dispatch(setMovie(movie));
    } catch (err) {
      dispatch(setError("Failed to get movie details"));
    }
  };

export default movieSlice.reducer;
