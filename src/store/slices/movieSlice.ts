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
        return dispatch(setError("Arama sonucu bulunamadı"));
      }

      dispatch(
        setMovieList({
          movies: data.Search,
          total: Number(data.totalResults) || 0,
        })
      );
    } catch (err) {
      dispatch(setError("Film araması başarısız oldu"));
    }
  };

export const getMovieDetail =
  (params: DetailParams) => async (dispatch: AppDispatch) => {
    try {
      dispatch(startLoading());
      const movie = await movieApi.getDetail(params);

      if (!movie.Title) {
        return dispatch(setError("Film bulunamadı"));
      }

      dispatch(setMovie(movie));
    } catch (err) {
      dispatch(setError("Film detayı alınamadı"));
    }
  };

export default movieSlice.reducer;
