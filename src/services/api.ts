import axios from 'axios'
import { SearchParamsType, SearchResponseType } from '../types/search'
import { MovieDetailParamsType } from '../types/movieDetail'
import { MovieDetailType } from '../types/movie'

const API_KEY = import.meta.env.VITE_API_KEY
const BASE_URL = import.meta.env.VITE_API_URL

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: API_KEY
  }
})

export const movieApi = {
  search: async (params: SearchParamsType) => {
    const response = await api.get<SearchResponseType>('', { params })
    return response.data
  },

  getDetail: async (params: MovieDetailParamsType) => {
    const response = await api.get<MovieDetailType>('', { params })
    return response.data
  }
}
