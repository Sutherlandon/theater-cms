import React, { Component } from 'react';

function Movie(props) {
  return (
    <div className="movie-contianer" key={props.key}>
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
    </div>
  );
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
      "rating" : "PG-13",
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

  renderMovie(movie) {
    return (
      <Movie
        name={movie.name}
        poster={movie.poster}
        rating={movie.rating}
        runtime={movie.runtime}
      />
    );
  }

  render(props) {
    return (
      this.movies.map((movie) => this.renderMovie(movie))
    );
  }
}
