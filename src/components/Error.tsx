import { Link } from 'react-router-dom'

type ErrorProps = {
  message?: string
}

export const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div className='text-center py-12'>
      <div className='text-red-500 text-lg mb-4'>{message}</div>
      <Link to='/' className='text-blue-500 hover:text-blue-400 transition-colors'>
        ← Back to Search
      </Link>
    </div>
  )
}
