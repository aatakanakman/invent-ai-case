import { MovieType } from './movie'

export enum MediaTypes {
  All = '',
  Movie = 'movie',
  Series = 'series',
  Episode = 'episode'
}

export type MediaItemType = {
  value: MediaTypes
  label: string
}

export type SearchParamsType = {
  s?: string
  type?: MediaTypes
  y?: string
  page?: number
}

export type SearchResponseType = {
  Search: MovieType[]
  totalResults: string
  Response: string
  Error?: string
}
