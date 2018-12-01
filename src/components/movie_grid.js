import React from 'react';

import {
  SelectBox,
  MovieCard,
} from './';

/**
 *
 */
class MovieGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_date: "Friday 1/06",
      collapsed: ""
    };

    // This reads a global variable defined in public/js/db.js
    // eventually this should query something like LokiJS
    this.movies = global.db.movies;
  }

  /**
   * Gets a list dates that movies are showing on
   */
  getShowdates() {
    let showtimes = [];
    this.movies.forEach((movie) => {
      for (const day in movie.showtimes) {
        // if the list does not contain the show day
        if (showtimes.indexOf(day) === -1 ) {
          showtimes.push(day);
        }
      }
    });

    return showtimes;
  }

  /**
   * Change the showtimes of the displayed movies
   */
  handleShowtimes(selected_date) {
    this.setState({
      current_date: selected_date
    });
  }

  render(props) {
    return (
      <React.Fragment>
        <SelectBox
          id="now-showing"
          options={this.getShowdates()}
          onChange={(date) => this.handleShowtimes(date)}
        />
        <div className="movie-deck" onScroll={() => this.setState({collapsed: "collapsed"})}>
          {this.movies.map((movie, i) => {
            return (
              <MovieCard
                key={i}
                titel={movie.title}
                poster={movie.poster}
                rating={movie.rating}
                runtime={movie.runtime}
                showtimes={movie.showtimes[this.state.current_date]}
              />
            );
          })}
        </div>
        <div className={"deck-slide-indicator " + this.state.collapsed}>
          Slide for more
        </div>
      </React.Fragment>
    );
    /*
    return (
      <React.Fragment>
        <NowShowingSelector
          options={this.getShowdates()}
          onChange={(date) => this.handleShowtimes(date)} />
        <div className="deck-slide-indicator" style={{display: this.state.show_indicator}}>
          <div>scroll</div>
        </div>
        <div className="movie-deck" onScroll={() => this.setState({show_indicator: "none"})}>
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
    */
  }
}

export default MovieGrid;
