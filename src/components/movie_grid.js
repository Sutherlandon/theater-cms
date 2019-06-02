import React from 'react';
import moment from 'moment';
import union from 'lodash.union';

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
        console.log('api data', result.data);
        const movies = result.data;

        let show_dates = [];
        movies.forEach(movie => {
          show_dates = union(show_dates, Object.keys(movie.showtimes));
        });

        this.setState({
          current_date: show_dates[0],
          movies,
          show_dates,
        });
      },
      (error) => ({error: 'No movies found.'}),
    )
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
    if (!this.state.show_dates) {
      return null;
    }

    return (
      <React.Fragment>
        <SelectBox
          id='now-showing'
          options={this.state.show_dates}
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
                showtimes={movie.showtimes[this.state.current_date]}
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
