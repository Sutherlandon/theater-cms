import React, { Fragment } from 'react';
import moment from 'moment';
import union from 'lodash.union';
import isEmpty from 'lodash.isempty';
import { withStyles } from '@material-ui/core/styles';

//import SelectBox from './select_box';
import HeaderDateSelector from './header_date_selector';
import MovieCard from './movie_card';

import MovieAPI from '../api/movie_api';
import { Grid } from '@material-ui/core';

const styles = (theme) => ({
  deckSlideIndicator: {
    display: 'none',
    opacity: 1,
    maxHeight: '1em',
    transition: 'opacity 1s, max-height 1s',

    [theme.breakpoints.down('sm')]: {
      color: 'fadeout(@primary-light, 20%)',
      display: 'block',
      margin: '-1em auto 2em',
      textAlign: 'center',

      '&::after': {
        border: 'solid fadeout(@primary-light, 20%)',
        borderWidth: '0 3px 3px 0',
        content: '',
        display: 'inline-block',
        padding: '0.25em',
        transform: 'rotate(-45deg)',
        '-webkit-transform': 'rotate(-45deg)',
      },
    },

    '&.collapsed': {
      opacity: 0,
      maxHeight: 0,
    },
  },
  noMovies: {
    margin: 16,
    marginBottom: 24,
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
  movieDeck: {
    justifyContent: 'center',
    padding: '0.5em 0.5em 2em',

    [theme.breakpoints.down('sm')]: {
      justifyContent: 'flex-start',
      overflowX: 'auto',
      overflowY: 'hidden',
      whiteSpace: 'nowrap',
      flexWrap: 'nowrap',
      '-webkit-overflow-scrolling': 'touch',

      '&:after': {
        content: "",
        flex: '0 0 0.5em',
      },
    }
  },
});


/**
 *
 */
class MovieGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: '',
      current_date: moment().format('YYYY-MM-DD'),
      movies: [],
    };
  }

  componentDidMount() {
    MovieAPI.get()
    //Promise.resolve(global.db.movies)
    .then(
      (result) => {
        // console.log('api data', result.data);
        const movies = result.data;

        let show_dates = [];
        if (movies) {
          movies.forEach((movie, i) => {
            // convert showtimes to an object
            let showtimes = {}
            movie.showtimes.forEach(([date, times]) => showtimes[date] = times);
            // console.log('showtimes', showtimes)
            movies[i].showtimes = showtimes;

            // get the dates shows are showing on
            show_dates = union(show_dates, Object.keys(showtimes));
          });

          // console.log('loaded movies', movies, show_dates);

          this.setState({
            movies,
            show_dates,
          });
        }
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

  render() {
    const { classes } = this.props;
    const { current_date, collapsed, movies, show_dates } = this.state;

    console.log({ current_date });

    return (
      <Fragment>
        <HeaderDateSelector
          onChange={(date) => this.setState({ current_date: moment(date).format('YYYY-MM-DD')})}
          value={current_date}
        />
        {!isEmpty(movies) ? (
          <Fragment>
            <Grid
              className={classes.movieDeck}
              container
              spacing={2}
              onScroll={() => this.setState({collapsed: 'collapsed'})}
            >
              {movies.map((movie, i) => (
                <Grid item key={movie.title}>
                  <MovieCard
                    title={movie.title}
                    poster={movie.poster}
                    rating={movie.rating}
                    runtime={movie.runtime}
                    showtimes={movie.showtimes[current_date]}
                  />
                </Grid>
              ))}
            </Grid>
            <div className={classes.deckSlideIndicator + ' ' + collapsed}>
              Slide for more
            </div>
          </Fragment>
        ) : (
          <div className={classes.noMovies}>
            There are no showings scheduled for this day
          </div>
        )}
      </Fragment>
    );
  }
}

export default withStyles(styles)(MovieGrid);
