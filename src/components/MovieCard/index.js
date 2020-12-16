import { Link } from 'react-router-dom';
import './style.css';

const MovieCard = ({
  title,
  image,
  releaseDate,
  rating,
  link,
  price,
  addMovie,
  isBought,
  showButton
}) => {
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
      </Link>
        <div className="details">
          <div className="rating"><b>{rating}</b></div>
          <h3>{title}</h3>
          <p>Release date: {releaseDate}</p>
          <h4>{price}</h4>
          {isBought ?
            showButton && <button className="disabled">Bought</button>
          :
            showButton && <button className="active" onClick={addMovie}>Buy</button>
          }
        </div>
    </div>
  );
}

export default MovieCard;
