import React from 'react';
import ReactDOM from 'react-dom';

function MovieCard(props) {
  const showtimes = props.showtimes.map((time, i) => {
    return (
      <span key={i}>{time}</span>
    )
  });
  const rating_class = "rating " + props.rating;

  return (
    <div class="movie-card">
      <div class="poster">
        <img src={props.poster} alt={props.name}/>
      </div>
      <div class="info">
        <span class={rating_class}>{props.rating}</span>
        <span class="runtime">{props.runtime}</span>
      </div>
      <div class="showtimes">{showtimes}</div>
    </div>
  )
  /*
  return (
    <table className="pure-table pure-table-borderd pure-table-striped movie-table">
      <tbody>
        <tr>
          <td colSpan="2" className="movie-poster">
            <img src={props.poster} alt={props.name}/>
          </td>
        </tr>
        <tr>
          <td colSpan="2">{props.name}</td>
        </tr>
        <tr>
          <td className="rating">{props.rating}</td>
          <td>{props.runtime}</td>
        </tr>
      </tbody>
    </table>
  );
  */
}

class MovieGrid extends React.Component {
  constructor(props) {
    super(props);
    this.movies = [{
      "name" : "Star Wars: Rogue One",
      "poster": "img/star_wars.jpg",
      "rating" : "PG-13",
      "runtime" : "2h 13m",
      "showtimes" : {
        "Friday 1/06" : [
          "12:45 2D",
          "3:45 2D",
          "6:45 3D",
          "9:45 3D"
        ],
        "Saturday 1/07" : [
          "12:45 2D",
          "3:45 2D",
          "6:45 3D",
          "9:45 3D"
        ]
      }
    }, {
      "name" : "Assasins Creed",
      "poster": "img/assassins_creed.jpg",
      "rating" : "R",
      "runtime" : "2h 20m",
      "showtimes" : {
        "Friday 1/06" : [
          "1:00 2D",
          "4:00 2D",
          "7:00 3D",
          "9:40 3D"
        ],
        "Saturday 1/07" : [
          "1:00 2D",
          "4:00 2D",
          "7:00 3D",
          "9:40 3D"
        ]
      }
    }, {
      "name" : "Star Wars: Rogue One",
      "poster": "img/star_wars.jpg",
      "rating" : "PG-13",
      "runtime" : "2h 13m",
      "showtimes" : {
        "Friday 1/06" : [
          "12:45 2D",
          "3:45 2D",
          "6:45 3D",
          "9:45 3D"
        ],
        "Saturday 1/07" : [
          "12:45 2D",
          "3:45 2D",
          "6:45 3D",
          "9:45 3D"
        ]
      }
    }, {
      "name" : "Assasins Creed",
      "poster": "img/assassins_creed.jpg",
      "rating" : "R",
      "runtime" : "2h 20m",
      "showtimes" : {
        "Friday 1/06" : [
          "1:00 2D",
          "4:00 2D",
          "7:00 3D",
          "9:40 3D"
        ],
        "Saturday 1/07" : [
          "1:00 2D",
          "4:00 2D",
          "7:00 3D",
          "9:40 3D"
        ]
      }
    }];
  }


  render(props) {
    return (
      <div class="movie-grid">
        {this.movies.map((movie, i) => {
          return (
            <div className="movie-contianer" key={i}>
              <MovieCard
                name={movie.name}
                poster={movie.poster}
                rating={movie.rating}
                runtime={movie.runtime}
                showtimes={movie.showtimes["Friday 1/06"]}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

ReactDOM.render(
  <MovieGrid />,
  document.getElementById("root")
);
