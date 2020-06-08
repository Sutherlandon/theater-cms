import React from 'react';
import { Link } from 'react-scroll'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  title: {
    display: 'block',
    backgroundImage: theme.palette.mainGradient,
    borderRadius: 4,
    color: `${theme.palette.light} !important`,
    cursor: 'pointer',
    margin: 'auto',
    position: 'relative',
    width: 'fit-content',
    top: -theme.spacing(),
  },
  h1: {
    padding: '0 0.5em',
    textAlign: 'center',
  },
}));

/**
 * Creates a section heading that when clicked, scrolls that heading to the top
 * of the screen
 */
const SectionTitle = (props) => {
  const classes = useStyles();

  return (
    <Link
      className={classes.title}
      duration={1000}
      offset={-30}
      smooth={true}
      to={props.text}
    >
      <h1 id={props.text} className={classes.h1}>
        {props.text}
      </h1>
    </Link>
  )
}

export default SectionTitle;
