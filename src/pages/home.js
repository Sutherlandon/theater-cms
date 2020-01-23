import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  Footer,
  Header,
  MovieGrid,
  TheaterInfo,
  TicketInfo,
} from '../components';

const useStyles = makeStyles({
})

function Home(props) {
  const classes = useStyles();
  
  return (
    <Fragment>
      <Header />
      <MovieGrid />
      <TicketInfo />
      <TheaterInfo />
      <Footer />
    </Fragment>
  );
}

export default Home;
