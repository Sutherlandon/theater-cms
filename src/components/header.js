import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import backgroundImage from '../images/IMG_7137.JPG'

const useHeaderStyles = makeStyles((theme) => ({
  gradient: {
    backgroundImage: `${theme.palette.fadedGradient}, url(${backgroundImage})`,
    backgroundPosition: 'top center',
    backgroundSize: 'cover',
    height: '100%',
    paddingTop: '0.001em',
  },
  header: {
    height: '20em',
  },
  title: {
    color: theme.palette.light,
    fontSize: '2.5em',
    padding: theme.spacing(2),

    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5em',
      textAlign: 'center',
      width: '100%',
    }
  },
}));

function Header({ toggleDrawer }) {
  const classes = useHeaderStyles();
  return (
    <header className={classes.header}>
      <nav className={classes.gradient}>
        <h1 className={classes.title}>Reel Deal Theater</h1>
      </nav>
    </header>
  )
}

export default Header;
