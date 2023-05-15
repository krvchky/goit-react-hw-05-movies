import axios from 'axios';

const apiServise = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: '3181cdf2e58737cb479bdcab3d178467',
    language: 'en-US',
  },
});

export const trendMovie = async () => {
  const { data } = await apiServise.get('/trending/movie/day');
  return data.results;
};

export const searchMovie = async query => {
  const { data } = await apiServise.get('/search/movie', {
    params: { query },
  });
  return data.results;
};

export const getMovieDetails = async id => {
  const { data } = await apiServise.get(`/movie/${id}`);
  return data;
};

export const apiCast = async id => {
  const { data } = await apiServise.get(`/movie/${id}/credits`);
  return data.cast;
};

export const apiReviews = async id => {
  const { data } = await apiServise.get(`/movie/${id}/reviews`);
  return data.results;
};