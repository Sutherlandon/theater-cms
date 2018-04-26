import React from 'react';
import ReactDOM from 'react-dom';

function Header(props) {
  return (
    <header>
      <div
        className="gradient-overlay"
        style={{
          'backgroundImage': 'url(' + props.background + ')'
        }}
      />
      <nav>
        <h1>Reel Deal Theater</h1>
      </nav>
    </header>
  )
}

function NowShowingSelector(props) {
  return (
    <div className="">
      <label htmlFor="now_showing">Now Showing</label>
      <select id="now_showing">
        <option value="Friday 1/06">Friday 1/06</option>
        <option value="Saturday 1/07">Saturday 1/07</option>
      </select>
    </div>
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
    <div className="movie-card">
      <div className="poster">
        <img src={props.poster} alt={props.name}/>
      </div>
      <div className="info">
        <span className={rating_class}>{props.rating}</span>
        <span className="runtime">{props.runtime}</span>
      </div>
      <div className="showtimes">{showtimes}</div>
    </div>
  )
}

class MovieGrid extends React.Component {
  constructor(props) {
    super(props);
    this.movies = [{
      "name" : "Star Wars: Rogue One",
      "poster": "img/sing.jpg",
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
      "poster": "img/passengers.jpg",
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
      <div className="movie-grid">
        {this.movies.map((movie, i) => {
          return (
            <MovieCard
              key={i}
              name={movie.name}
              poster={movie.poster}
              rating={movie.rating}
              runtime={movie.runtime}
              showtimes={movie.showtimes["Friday 1/06"]}
            />
          );
        })}
      </div>
    );
  }
}

function App(props) {
  return (
    <React.Fragment>
      <Header background='img/IMG_7137.jpg'/>
      <NowShowingSelector/>
      <MovieGrid/>
    </React.Fragment>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
