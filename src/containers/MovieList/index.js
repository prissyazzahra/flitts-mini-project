import React from 'react';
import './style.css';
import Axios from 'axios';
import MovieCard from '../../components/MovieCard';

const moviesURL = 'https://api.themoviedb.org/3/movie/now_playing?api_key=219ae73877170440917f8f6ce8116a2e&language=en-US&page=1&region=ID';

class MovieList extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      balance: 100000
    }
  }

  async loadMovies() {
    await
    Axios.get(moviesURL)
      .then(res => this.setState({ movies: res.data.results }))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.loadMovies();
  }
  render() {
    console.log(this.state.movies);
    return (
      <div className="container">
        <h1>StreamFlix</h1>
        <div>

        </div>
        <p>Your current balance: <b>{this.state.balance}</b></p>
        <div className="movie-list">
          {this.state.movies.map(movie => (
            <MovieCard
              image={movie.poster_path}
              title={movie.title}
              releaseDate={movie.release_date}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default MovieList;
