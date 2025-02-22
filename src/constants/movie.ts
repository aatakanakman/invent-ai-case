import { MediaItemType, MediaTypes } from '../types/search'

export const mediaTypes: MediaItemType[] = [
  { value: MediaTypes.All, label: 'All Types' },
  { value: MediaTypes.Movie, label: 'Movie' },
  { value: MediaTypes.Series, label: 'Series' },
  { value: MediaTypes.Episode, label: 'Episode' }
]
