import React from 'react';

import {
  Footer,
  Header,
  MovieGrid,
  TheaterInfo,
  TicketInfo,
} from '../components';

export class Home extends React.Component {
  render(props) {
    return (
      <React.Fragment>
        <Header />
        <MovieGrid />
        <TicketInfo />
        <TheaterInfo />
        <Footer />
      </React.Fragment>
    );
  }
}
