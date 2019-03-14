import React from 'react';

/**
 *
 */
const MovieCard = (props) => {
  if (!props.showtimes) {
    return null;
  }

  console.log(props);
  const rating_class = "rating " + props.rating;
  const showtimes = props.showtimes.map((time, i) => {
    return (
      <span key={i}>{time}</span>
    )
  });

  return (
    <div className="movie-card">
      <div className="poster">
        <img src={props.poster} alt={props.title}/>
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
