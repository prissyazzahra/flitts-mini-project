import React from 'react';
import { Link } from 'react-router-dom';

import BackArrow from '../../assets/back_arrow.svg';
import MovieCard from '../../components/MovieCard';

import './style.css';
import api from '../../api';

class MovieDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      movie: [],
      recommendations: [],
      similar: [],
      cast: [],
      isBought: false,
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

  getCastAsString = () => {
    const { cast } = this.state;
    let casts = "";
    for (let i = 1; i <= cast.length - 1; i++) {
      casts += cast[i];
      if (i !== cast.length - 1) {
        casts += ", ";
      }
    }
    return casts;
  }

  async getMovieDetail() {
    const id = window.location.pathname.slice(1, 7);
    await api.getMovieDetail(id)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err));
  }

  async getRecommendations() {
    const id = window.location.pathname.slice(1, 7);
    await api.getRecommendations(id)
      .then(res => this.setState({ recommendations: res.data.results }))
      .catch(err => console.log(err));
  }

  async getSimilarMovies() {
    const id = window.location.pathname.slice(1, 7);
    await api.getSimilarMovies(id)
      .then(res => this.setState({ similar: res.data.results }))
      .catch(err => console.log(err));
  }

  async getCast() {
    const id = window.location.pathname.slice(1, 7);
    await api.getCredits(id)
      .then(res => {
        const names = [];
        res.data.cast.map(x => names.push(x.name));
        this.setState({ cast: names })
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.getMovieDetail();
    this.getRecommendations();
    this.getSimilarMovies();
    this.getCast();
  }

  render() {
    const { movie, recommendations, similar, isBought } = this.state;
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'IDR',
    });

    return (
      <>
        <div className="header">
          <Link to="/">
            <img className="back" src={BackArrow} alt="Back" />
          </Link>
          <h1>{movie.title}</h1>
        </div>
        <div className="movie-details">
          <img className="poster" src={"http://image.tmdb.org/t/p/w500" + movie.poster_path} alt={movie.title} />
          <div className="description">
            <p>{movie.overview ? movie.overview : "Overview unavailable."}</p>
            <p>{"Runtime: " + movie.runtime + " minutes"}</p>
            <p>Casts: {this.getCastAsString()}</p>
            <div>
              <span className="rating-out-of">
                <h1 className="vote">{movie.vote_average}</h1><p>/ 10 in ratings</p>
              </span>
                <h3>{formatter.format(this.getMovieRate(movie.vote_average))}</h3>
                {isBought ?
                  <button className="disabled-detail">Bought</button>
                :
                  <button className="active-detail" onClick={() => this.setState({ isBought: true })}>Buy</button>
                }
            </div>
          </div>
        </div>
        <hr />
        <h2>Similar Movies</h2>
          <div className="mapped-movies">
            {similar.length > 0 ?
              similar.slice(0,5).map(movie =>
                <MovieCard
                  key={movie.id}
                  image={movie.poster_path}
                  title={movie.title}
                  releaseDate={movie.release_date}
                  rating={(movie.popularity).toFixed(2)}
                  showButton={false}
                />
              )
            :
              <p>There are no movies similar to this movie.</p>
            }
          </div>
        <hr />
        <h2>Recommended Movies</h2>
        <div className="mapped-movies">
          {recommendations.length > 0 ?
              recommendations.slice(0,5).map(movie =>
                <MovieCard
                  key={movie.id}
                  image={movie.poster_path}
                  title={movie.title}
                  releaseDate={movie.release_date}
                  rating={(movie.popularity).toFixed(2)}
                  showButton={false}
                />
              )
            :
              <p>There are no recommendations for this movie.</p>
            }
          </div>
      </>
    );
  }
}

export default MovieDetail;