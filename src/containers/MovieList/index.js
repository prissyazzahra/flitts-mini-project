import React from 'react';
import Axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';

import MovieCard from '../../components/MovieCard';
import Loader from '../../components/Loader';

import './style.css';

const moviesURL = 'https://api.themoviedb.org/3/movie/now_playing?api_key=219ae73877170440917f8f6ce8116a2e&language=en-US&page=1&region=ID';

class MovieList extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      bought: [],
      currentMovies: [],
      balance: 100000,
      isLoading: true,
      currentPage: 1
    }
    this.buyMovie = this.buyMovie.bind(this);
    this.getMovieRate = this.getMovieRate.bind(this);
    this.checkIfMovieBought = this.checkIfMovieBought.bind(this);
  }

  buyMovie = (movie) => {
    const { bought, balance } = this.state;
    const newMovieList = bought;
    newMovieList.push(movie);
    const price = balance - this.getMovieRate(movie.popularity);
    this.setState({ bought: newMovieList, balance: price });
  }

  getMovieRate = (rating) => {
    if (rating >= 1 && rating < 3) {
      return 3500;
    } else if (rating >= 3 && rating < 6) {
      return 8250;
    } else if (rating >= 6 && rating < 8) {
      return 16350;
    } else {
      return 21250;
    }
  }

  fetchMoreData = () => {
    const { currentPage, movies } = this.state;
    const newData = movies.slice(0, currentPage * 3);
    setTimeout(() => {
      this.setState({ currentMovies: newData, currentPage: currentPage + 1 });
    }, 2000);
  }

  checkIfMovieBought = (movie) => {
    const { bought } = this.state;
    return bought.includes(movie);
  }

  async loadMovies() {
    await
    Axios.get(moviesURL)
      .then(res => this.setState({
        movies: res.data.results,
        currentMovies: res.data.results.slice(0, 3),
        currentPage: 2
      }))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.loadMovies();
  }

  render() {
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'IDR',
    });

    console.log(this.state.currentMovies.length < this.state.movies.length)

    return (
      <>
        <h1>StreamFlix</h1>
        <p>Your current balance: <b>{formatter.format(this.state.balance)}</b></p>
        <InfiniteScroll
          initialLoad={false}
          loader={(
            <Loader />
          )}
          loadMore={this.fetchMoreData}
          hasMore={this.state.currentMovies.length < this.state.movies.length}
        >
          <div className="movie-list">
            {this.state.currentMovies.map(movie => (
              <MovieCard
                key={movie.id}
                image={movie.poster_path}
                title={movie.title}
                releaseDate={movie.release_date}
                rating={(movie.popularity).toFixed(2)}
                price={formatter.format(this.getMovieRate(movie.popularity))}
                addMovie={() => this.buyMovie(movie)}
                isBought={this.checkIfMovieBought(movie)}
              />
            ))}
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default MovieList;
