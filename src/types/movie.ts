export type MovieType = {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export type MovieRatingType = {
  Source: string
  Value: string
}

export type MovieDetailType = MovieType & {
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Ratings: MovieRatingType[]
  Metascore: string
  imdbRating: string
  imdbVotes: string
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
  Response: string
}
