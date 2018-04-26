import React from 'react';
import ReactDOM from 'react-dom';

function Header(props) {
  return (
    <header>
      <img src={props.background} alt="reeldeal theater"/>
      <div class="gradient-overlay"></div>
    </header>
  )
}

function MovieCard(props) {
  const rating_class = "rating " + props.rating;
  const showtimes = props.showtimes.map((time, i) => {
    return (
      <span key={i}>{time}</span>
    )
  });

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
}

class MovieGrid extends React.Component {
  constructor(props) {
    super(props);
    this.movies = [{
      "name" : "Star Wars: Rogue One",
      "poster": "img/star_wars.jpg",
      "rating" : "G",
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
      "rating" : "PG",
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

function App(props) {
  return (
    <div id='app'>
      <Header background='img/IMG_7137.jpg'/>
      <MovieGrid/>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
