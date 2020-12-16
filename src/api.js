import axios from 'axios';

function getMovies() {
  const moviesURL = 'https://api.themoviedb.org/3/movie/now_playing?api_key=219ae73877170440917f8f6ce8116a2e&region=ID';
  return axios.get(moviesURL);
}

function getMovieDetail(id) {
  const movieURL = `https://api.themoviedb.org/3/movie/${id}?api_key=219ae73877170440917f8f6ce8116a2e`;
  return axios.get(movieURL);
}

function getSimilarMovies(id) {
  const similarMovieURL = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=219ae73877170440917f8f6ce8116a2e`;
  return axios.get(similarMovieURL);
}

function getRecommendations(id) {
  const recommendationURL = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=219ae73877170440917f8f6ce8116a2e`;
  return axios.get(recommendationURL);
}

function getCredits(id) {
  const creditsURL = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=219ae73877170440917f8f6ce8116a2e`;
  return axios.get(creditsURL);
}

const api = {
  getMovies,
  getMovieDetail,
  getSimilarMovies,
  getRecommendations,
  getCredits
};

export default api;