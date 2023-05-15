import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Notify } from 'notiflix';
import { Loader } from '../../components/Loader/Loader';
import { apiCast } from '../../services/Api';

function Cast() {
  const [movieCast, setMovieCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;
    const fetchCast = async id => {
      try {
        setIsLoading(true);
        const receivedTrends = await apiCast(id);
        setMovieCast(receivedTrends);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCast(movieId);
  }, [movieId]);

  useEffect(() => {
    if (error === null) return;
    Notify.failure(`An error has occurred ${error}`);
  }, [error]);

  return (
    <>
      {isLoading && <Loader />}
      <ul>
        {Array.isArray(movieCast) &&
          movieCast?.map(({ id, name, profile_path }) => {
            return (
              <li style={{ listStyle: 'none' }} key={id}>
                <img
                  src={
                    profile_path
                      ? `https://image.tmdb.org/t/p/w500${profile_path}`
                      : 'https://upload.wikimedia.org/wikipedia/commons/2/2f/No-photo-m.png'
                  }
                  alt={name}
                />
                <h4>{name}</h4>
              </li>
            );
          })}
      </ul>
    </>
  );
}

export default Cast;