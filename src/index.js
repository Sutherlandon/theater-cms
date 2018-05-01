import React from 'react';
import ReactDOM from 'react-dom';

class NowShowingSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Friday 1/06'
    }

    this.handleChange = this.handleChange.bind(this);
    this.propsOnChange = props.onChange;
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    this.propsOnChange(event.target.value)
  }

  render(props) {
    return (
      <div className="now-showing-selector">
        <form className="pure-form pure-form-aligned">
          <label htmlFor="now-showing-date">Now Showing</label>
          <select id="now-showing-date" onChange={this.handleChange} value={this.state.value} className="pure-input">
            <option value="Friday 1/06">Friday 1/06</option>
            <option value="Saturday 1/07">Saturday 1/07</option>
          </select>
        </form>
      </div>
    )
  }
}


/**
 *
 */
function Header(props) {
  return (
    <header>
      <nav className="gradient-overlay">
        <h1>Reel Deal Theater</h1>
      </nav>
    </header>
  )
}

/*
function Nav(props) {
  return (
    <nav>
      <h1>Reel Deal Theater</h1>
      <NowShowingSelector/>
    </nav>
  )
}
*/

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
    this.state = {
      current_date: "Friday 1/06",
    };

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
          "12:45 2D",
          "3:45 2D",
          "6:45 3D",
          "9:45 3D"
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
          "1:00 2D",
          "4:00 2D",
          "7:00 3D",
          "9:40 3D"
        ]
      }
    }, {
<<<<<<< HEAD
=======
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
          "1:00 2D",
          "4:00 2D",
          "7:00 3D",
          "9:40 3D"
        ]
      }
    }, {
>>>>>>> 8008ca888d0d4570d1d85dda95b220edbec5855d
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
          "12:45 2D",
          "3:45 2D",
          "6:45 3D",
          "9:45 3D"
        ]
      }
    }];
  }

  handleShowtimes(selected_date) {
    this.setState({
      current_date: selected_date
    });
  }

  render(props) {
    return (
      <React.Fragment>
        <NowShowingSelector
          onChange={(date) => this.handleShowtimes(date)}
        />
        <div className="movie-grid">
          {this.movies.map((movie, i) => {
            return (
              <MovieCard
                key={i}
                name={movie.name}
                poster={movie.poster}
                rating={movie.rating}
                runtime={movie.runtime}
                showtimes={movie.showtimes[this.state.current_date]}
              />
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

class App extends React.Component {
  render(props) {
    return (
      <React.Fragment>
        <Header
          gradient="linear-gradient(to bottom, rgba(61, 15, 244, 80%), rgb(173, 15, 244, 100))"
          background='img/IMG_7137.jpg'
        />
        <div className="content-wrap">
          <MovieGrid/>
        </div>
      </React.Fragment>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
