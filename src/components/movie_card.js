import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import config from '../api/config';


const useStyles = makeStyles((theme) => ({
  movieCard: {
    backgroundColor: theme.palette.light,
    borderRadius: theme.spacing(),
    textAlign: 'center',
    width: '16em',
  },

  posterImg: {
    borderTopLeftRadius: theme.spacing(),
    borderTopRightRadius: theme.spacing(),
    display: 'block',
    marginBottom: theme.spacing(),
    width: '100%',
  },

  info: {
    paddingTop: theme.spacing(),
    paddingBottom: theme.spacing(),
  },

  /* these colors taken from bootstrap buttons */
  G: {
    color: 'white',
    backgroundColor: '#5cb85c',
    borderColor: '#4cae4c',
  },
  PG: {
    color: 'white',
    backgroundColor: '#5bc0de',
    borderColor: '#46b8da',
  },
  'PG-13': {
    color: 'white',
    backgroundColor: '#f0ad4e',
    borderColor: '#eea236',
  },
  R: {
    color: 'white',
    backgroundColor: '#d9534f',
    borderColor: '#d43f3a',
  },

  runtime: {
    borderColor: '#999',
    backgroundColor: 'white',
  },
  showtimes: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridColumnGap: '0.5em',
    gridRowGap: '0.5em',
    padding: '0.5em',

    '& span': {
      color: 'white',
      backgroundColor: '#337ab7',
      borderColor: '#2e6da4',
    }
  },
  span: {
    borderRadius: 4,
    border: '1px solid #DDD',
    minWidth: 80,
    padding: theme.spacing()/2,
  },
}));

/**
 *
 */
function MovieCard(props) {
  const classes = useStyles();
  const {
    poster,
    rating,
    runtime,
    showtimes,
    title,
  } = props;

  // console.log('movie card', props);
  if (!showtimes) {
    return null;
  }

  return (
    <Paper className={classes.movieCard}>
      <img 
        className={classes.posterImg}
        src={`${config.api_path}/public/${poster}`}
        alt={title}
      />
      <Grid container spacing={1} justify='space-around' className={classes.info}>
        <Grid item className={classes.span + ' ' + classes[rating]}> 
          {rating}
        </Grid>
        <Grid item className={classes.span + ' ' + classes.runtime}>
          {runtime}
        </Grid>
      </Grid>
      <div className={classes.showtimes}>
        {showtimes.split(', ').map((time, i) => (
          <span key={i} className={classes.span}>{time}</span>
        ))}
      </div>
    </Paper>
  )
}

export default MovieCard;
