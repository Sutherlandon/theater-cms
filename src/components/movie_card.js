import React from 'react';
import config from '../api/config';

/**
 *
 */
const MovieCard = (props) => {
  console.log('movie card', props);
  if (!props.showtimes) {
    return null;
  }

  const rating_class = "rating " + props.rating;
  const showtimes = props.showtimes.split(', ').map((time, i) => {
    return (
      <span key={i}>{time}</span>
    )
  });

  return (
    <div className="movie-card">
      <div className="poster">
        <img src={`${config.api_path}/uploads/${props.poster}`} alt={props.title}/>
      </div>
      <div className="info">
        <span className={rating_class}>{props.rating}</span>
        <span className="runtime">{props.runtime}</span>
      </div>
      <div className="showtimes">{showtimes}</div>
    </div>
  )
}

export default MovieCard;
