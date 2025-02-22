import { Link } from 'react-router-dom'

export const NotFoundPage = () => {
  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center p-4'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold text-gray-800 mb-4'>404</h1>
        <p className='text-gray-600 mb-8'>Page not found</p>
        <Link to='/' className='px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'>
          Back to Home
        </Link>
      </div>
    </div>
  )
}
