import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/Layout";
import { SearchPage } from "../pages/SearchPage";
import { MovieDetailPage } from "../pages/MovieDetailPage";
import { NotFoundPage } from "../pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <SearchPage />,
      },
      {
        path: "movie/:id",
        element: <MovieDetailPage />,
      },
    ],
  },
]);
