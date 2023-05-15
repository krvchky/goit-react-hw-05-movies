import { useState, useEffect } from 'react';
import { Notify } from 'notiflix';
import { Title } from './HomePage.styled';
import { Loader } from '../../components/Loader/Loader';
import { MovieList } from '../../components/MoviesList/MoviesList';
import { trendMovie } from '../../services/Api';

function Home() {
  const [trends, setTrends] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        setIsLoading(true);
        const receivedTrends = await trendMovie();
        setTrends(receivedTrends);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrends();
  }, []);

  useEffect(() => {
    if (error === null) return;
    Notify.failure(`An error has occurred ${error}`);
  }, [error]);

  return (
    <>
      <Title>Trends of the day</Title>
      {isLoading && <Loader />}
      <MovieList  movieList={trends} />
    </>
  );
}

export default Home;