import axios from "axios";
import {
  SearchParams,
  DetailParams,
  SearchResponse,
  MovieDetail,
} from "../types/movie.types";

const API_KEY = "117b9279";
const BASE_URL = "http://www.omdbapi.com/";

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: API_KEY,
  },
});

export const movieApi = {
  search: async (params: SearchParams) => {
    const response = await api.get<SearchResponse>("", { params });
    return response.data;
  },

  getDetail: async (params: DetailParams) => {
    const response = await api.get<MovieDetail>("", { params });
    return response.data;
  },
};
