import { NavLink, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { HeaderNav, Navigate, Title } from './App.styled';

import { Loader } from '../Loader/Loader';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() =>
  import('../../pages/MovieDetailsPage/MovieDetailsPage')
);
const NotFound = lazy(() => import('../../pages/NotFound/NotFound'));

export function App() {
  return (
    <>
      <HeaderNav>
        <Navigate>
          <NavLink style={{ textDecoration: 'none' }} to="/">
            <Title>Home</Title>
          </NavLink>
          <NavLink style={{ textDecoration: 'none' }} to="/movies">
            <Title> Movies</Title>
          </NavLink>
        </Navigate>
      </HeaderNav>
      <div>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId/*" element={<MovieDetailsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}