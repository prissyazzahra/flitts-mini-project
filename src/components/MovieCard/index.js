import { Link } from 'react-router-dom';
import './style.css';

const MovieCard = ({ title, image, releaseDate, rating, link, price, addMovie, isBought }) => {
  const imageUrl = "http://image.tmdb.org/t/p/w500";

  return (
    <div className="card">
      <Link to={link}>
        {image ?
          <img src={imageUrl + image} alt={title}/>
          :
          <div className="no-image">
            <p>This movie has no poster.</p>
          </div>
        }
        <div className="rating"><b>{rating}</b></div>
        <div className="details">
          <h3>{title}</h3>
          <p>Release date: {releaseDate}</p>
          <h4>{price}</h4>
          {isBought ?
            <button className="disabled">Bought</button>
          :
            <button className="active" onClick={addMovie}>Buy</button>
          }
        </div>
      </Link>
    </div>
  );
}

export default MovieCard;
