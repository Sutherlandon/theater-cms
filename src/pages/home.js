import React from 'react';
import ReactDOM from 'react-dom';

import {
  Header,
  MovieGrid,
  SectionTitle,
  TicketInfo,
  TheaterInfo,
  Footer,
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
