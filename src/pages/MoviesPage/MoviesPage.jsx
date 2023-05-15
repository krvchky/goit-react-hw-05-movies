import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ImSearch } from 'react-icons/im';

import { Notify } from 'notiflix';

import { MovieList } from '../../components/MoviesList/MoviesList';
import { Loader } from '../../components/Loader/Loader';
import { searchMovie } from '../../services/Api';

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');

  useEffect(() => {
    if (!query?.trim()) {
      return;
    }
    const fetchTrends = async query => {
      try {
        setIsLoading(true);
        const receivedMovies = await searchMovie(query);
        if (receivedMovies.length === 0) {
          Notify.info(`No results for ${query}`);
        }
        setMovies(receivedMovies);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrends(query);
  }, [query]);

  useEffect(() => {
    if (error === null) return;
    Notify.failure(`An error has occurred ${error}`);
  }, [error]);

  const handleSubmit = evt => {
    evt.preventDefault();
    if (evt.currentTarget.search.value === '') {
      Notify.warning('Fill in the input field!');
    }
    setSearchParams({ query: evt.currentTarget.search.value });
    evt.target.reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input name="search" placeholder="search..." />
        <button type="submit">
          <ImSearch />
        </button>
      </form>
      {isLoading && <Loader />}
      <MovieList movieList={movies} />
    </>
  );
}

export default MoviesPage;