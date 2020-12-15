import React from 'react';
import './style.css'

const MovieCard = ({ title, image, releaseDate, rating, onClick }) => {
  return (
    <div className="card">
      <div className="rating">{rating}</div>
      <img src={image} alt={title}/>
      <h3>{title}</h3>
      <p>Release date: {releaseDate}</p>
    </div>
  );
}

export default MovieCard;
