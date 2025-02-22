import { Link } from 'react-router-dom'

export const MovieDetailHeader = () => {
  return (
    <Link
      to='/'
      className='inline-flex items-center text-blue-500 hover:text-blue-400 transition-colors mb-6'>
      <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M10 19l-7-7m0 0l7-7m-7 7h18'
        />
      </svg>
      Back to Search
    </Link>
  )
}
