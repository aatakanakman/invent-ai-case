import { MovieDetailType } from '../types/movie'

export const movieDetailLines: {
  label: string
  value: Partial<keyof MovieDetailType>
}[] = [
  {
    label: 'Director',
    value: 'Director'
  },
  {
    label: 'Writer',
    value: 'Writer'
  },
  {
    label: 'Cast',
    value: 'Actors'
  },
  {
    label: 'Genre',
    value: 'Genre'
  },
  {
    label: 'Country',
    value: 'Country'
  },
  {
    label: 'Language',
    value: 'Language'
  },
  {
    label: 'Awards',
    value: 'Awards'
  },
  {
    label: 'Box Office',
    value: 'BoxOffice'
  }
]
