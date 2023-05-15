import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Notify } from 'notiflix';
import { apiReviews } from '../../services/Api';
import { Loader } from '../../components/Loader/Loader';

function Reviews() {
  const [movieReviews, setMovieReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;
    const fetchReviews = async id => {
      try {
        setIsLoading(true);
        const receivedTrends = await apiReviews(id);
        setMovieReviews(receivedTrends);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews(movieId);
  }, [movieId]);

  useEffect(() => {
    if (error === null) return;
    Notify.failure(`An error has occurred ${error}`);
  }, [error]);

  return (
    <>
      {isLoading && <Loader />}
      <ul>
        {Array.isArray(movieReviews) &&
          movieReviews?.map(elem => {
            return (
              <li key={elem.id}>
                <h3>{elem?.author}</h3>
                <p>{elem?.content}</p>
              </li>
            );
          })}
      </ul>
      {movieReviews.length === 0 && (
        <h4>There are no reviews for this movie</h4>
      )}
    </>
  );
}

export default Reviews;