import Skeleton from 'react-loading-skeleton';
import './style.css'

const Loader = () => {
  return (
    <div className="movie-list">
      <div className="card-skeleton">
        <Skeleton width={"100%"} height={200} duration={0.5} />
      </div>
      <div className="card-skeleton">
        <Skeleton width={"100%"} height={200} duration={0.5} />
      </div>
      <div className="card-skeleton">
        <Skeleton width={"100%"} height={200} duration={0.5} />
      </div>
    </div>
  )
}

export default Loader;