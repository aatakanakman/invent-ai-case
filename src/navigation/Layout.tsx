import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <div className='min-h-screen bg-gray-900'>
      <main className='px-4 md:px-8 py-8'>
        <div className='max-w-7xl mx-auto'>
          <Outlet />
        </div>
      </main>
    </div>
  )
}
