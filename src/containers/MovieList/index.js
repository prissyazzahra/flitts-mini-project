import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import MovieCard from '../../components/MovieCard';
import Loader from '../../components/Loader';

import './style.css';
import api from '../../api';

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
    this.fetchMoreData = this.fetchMoreData.bind(this);
    this.generateLink = this.generateLink.bind(this);
  }

  buyMovie = (movie) => {
    const { bought, balance } = this.state;
    const basePrice = this.getMovieRate(movie.vote_average);
    const newMovieList = bought;

    if (balance < basePrice) {
      alert('You have insufficient balance to buy this movie.');
    } else {
      newMovieList.push(movie);
      const updateBalance = balance - basePrice;
      this.setState({ bought: newMovieList, balance: updateBalance });
    }
  }

  getMovieRate = (rating) => {
    if (rating >= 1 && rating < 3) {
      return 3500;
    } else if (rating >= 3 && rating < 6) {
      return 8250;
    } else if (rating >= 6 && rating < 8) {
      return 16350;
    } else if (rating >= 8 && rating < 10) {
      return 21250;
    } else {
      return 1000;
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

  generateLink = (movie) => {
    const str = movie.title.replace(/\s+/g, '-').toLowerCase()
    return movie.id.toString() + '-' + str;
  }

  async loadMovies() {
    await api.getMovies()
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
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'IDR',
    });

    return (
      <>
        <h1>StreamFlix</h1>
        <p>Your current balance: <b>{formatter.format(this.state.balance)}</b></p>
        <InfiniteScroll
          initialLoad={false}
          loader={(
            <Loader />
          )}
          key={"movie"}
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
                rating={(movie.vote_average).toFixed(2)}
                price={formatter.format(this.getMovieRate(movie.vote_average))}
                addMovie={() => this.buyMovie(movie)}
                isBought={this.checkIfMovieBought(movie)}
                link={this.generateLink(movie)}
                showButton={true}
              />
            ))}
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default MovieList;
