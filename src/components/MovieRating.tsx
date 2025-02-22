import { MovieRatingType } from '../types/movie'

type MovieRatingProps = {
  ratings?: MovieRatingType[]
}

export const MovieRating: React.FC<MovieRatingProps> = ({ ratings }) => {
  if (!ratings?.length) {
    return null
  }
  return (
    <div className='mt-8 pt-8 border-t border-gray-700'>
      <h2 className='text-xl font-semibold text-white mb-4'>Other Ratings</h2>
      <div className='flex flex-wrap gap-4'>
        {ratings.map(rating => (
          <div key={rating.Source} className='bg-gray-700/50 px-4 py-3 rounded-lg'>
            <div className='text-sm text-gray-400'>{rating.Source}</div>
            <div className='text-lg font-semibold text-white'>{rating.Value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
