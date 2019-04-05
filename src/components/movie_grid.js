import React from 'react';
import axios from 'axios';
import moment from 'moment';
import config from '../api/config';

import SelectBox from './select_box';
import MovieCard from './movie_card';

import MovieAPI from '../api/movie_api';

/**
 *
 */
class MovieGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: '',
      current_date: '1/04/2019',
      movies: [],
    };
  }

  componentDidMount() {
    MovieAPI.get()
    //Promise.resolve(global.db.movies)
    .then(
      (result) => {
        console.log(result.data);
        this.setState({ movies: result.data });
      },
      (error) => ({error: 'No movies found.'}),
    )
  }

  /**
   * Gets a list dates that movies are showing on
   */
  getShowdates() {
    const showtimes = [];
    this.state.movies.forEach(movie => {
      Object.keys(movie.showtimes).forEach(day => {
        // if the list does not contain the show day
        if (showtimes.indexOf(day) === -1 ) {
          showtimes.push(day);
        }
      });
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
    console.log(moment(this.state.current_date).day());
    
    return (
      <React.Fragment>
        <SelectBox
          id='now-showing'
          options={this.getShowdates()}
          onChange={(date) => this.setState({ current_date: date })}
          value={this.state.current_date}
        />
        <div className='movie-deck' onScroll={() => this.setState({collapsed: 'collapsed'})}>
          {this.state.movies.map((movie, i) => {
            return (
              <MovieCard
                key={i}
                title={movie.title}
                poster={movie.poster}
                rating={movie.rating}
                runtime={movie.runtime}
                showtimes={movie.showtimes[moment(this.state.current_date).day()].times}
              />
            );
          })}
        </div>
        <div className={'deck-slide-indicator ' + this.state.collapsed}>
          Slide for more
        </div>
      </React.Fragment>
    );
  }
}

export default MovieGrid;
