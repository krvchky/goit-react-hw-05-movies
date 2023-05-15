import { useState, useEffect, Suspense, lazy } from 'react';
import { useParams, Link, Route, Routes, useLocation } from 'react-router-dom';
import { Notify } from 'notiflix';
import { Loader } from '../../components/Loader/Loader';
import { getMovieDetails } from '../../services/Api';
import { ImArrowLeft } from 'react-icons/im';
import { Title } from './MovieDetailsPage.styled';

const Cast = lazy(() => import('../Cast/Cast'));
const Reviews = lazy(() => import('../Reviews/Reviews'));

function MovieDetailsPage() {
  const [movieInfo, setMovieInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { movieId } = useParams();
  const location = useLocation();

  useEffect(() => {
    if (!movieId) return;
    const fetchMovieDetails = async id => {
      try {
        setIsLoading(true);
        const receivedTrends = await getMovieDetails(id);
        setMovieInfo(receivedTrends);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieDetails(movieId);
  }, [movieId]);

  useEffect(() => {
    if (error === null) return;
    Notify.failure(`An error has occurred ${error}`);
  }, [error]);

  return (
    <div>
      <Link to={location?.state?.from ?? '/'}>
        <span>
          <ImArrowLeft size="30px" />
        </span>
      </Link>
      {isLoading && <Loader />}
      {movieInfo !== null && (
        <div>
          <img
            src={
              movieInfo?.poster_path
                ? `https://image.tmdb.org/t/p/w500${movieInfo?.poster_path}`
                : 'https://cdn4.iconfinder.com/data/icons/ui-beast-4/32/Ui-12-512.png'
            }
            alt={movieInfo.title}
          />
          <div>
            <h1>
              {movieInfo.title} ({movieInfo?.release_date.slice(0, 4)})
            </h1>
            <p>User Score: {movieInfo?.vote_average}</p>
            <h2>Overview</h2>
            <p>{movieInfo.overview}</p>
            <h2>Genres</h2>
            <ul>
              {movieInfo?.genres?.map(({ id, name }) => {
                return <li key={id}>{name}</li>;
              })}
            </ul>
          </div>
        </div>
      )}
      <div>
        <Link
          style={{ textDecoration: 'none' }}
          state={{ from: location?.state?.from ?? '/' }}
          to="reviews"
        >
          <Title>Reviews</Title>
        </Link>
        <Link
          style={{ textDecoration: 'none' }}
          state={{ from: location?.state?.from ?? '/' }}
          to="cast"
        >
          <Title>Cast</Title>
        </Link>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default MovieDetailsPage;