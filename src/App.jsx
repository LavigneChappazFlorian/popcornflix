import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from './pages/HomePage/HomePage';
import MoviesListPage from './pages/MoviesListPage/MoviesListPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import MovieDetailPage from './pages/MovieDetailPage/MovieDetailPage';
import CinemasPage from './pages/CinemasPage/CinemasPage';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/movies",
      element: <MoviesListPage />,
    },
    {
      path: "/movies/:id",
      element: <MovieDetailPage />
    },
    {
      path: "/cinemas",
      element: <CinemasPage />
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App;