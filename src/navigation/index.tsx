import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './Layout'
import { SearchPage } from '../pages/SearchPage'
import { MovieDetailPage } from '../pages/MovieDetailPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { Routes } from './routes'

export const router = createBrowserRouter([
  {
    path: Routes.Home,
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <SearchPage />
      },
      {
        path: Routes.MovieDetail,
        element: <MovieDetailPage />
      }
    ]
  }
])
