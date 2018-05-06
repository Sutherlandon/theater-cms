import React from 'react';
import ReactDOM from 'react-dom';

class NowShowingSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Friday 1/06',
      open: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.propsOnChange = props.onChange;
  }

  handleChange(new_value) {
    this.setState({
      value: new_value,
      open: false
    });
    this.propsOnChange(new_value)
  }

  render(props) {
    const select_id = "now-showing"; // must be unique to the app
    const display = this.state.open ? "block" : "none";

    return (
      <div className="select-input">
        <label htmlFor={select_id + "-select"} className="select-label">Now Showing</label>
        <div className="select-wrapper">
          <button id={select_id + "-select"} className="select-button"
            onClick={() => this.setState({open: !this.state.open})}>
            {this.state.value}
            <span className="caret"></span>
          </button>
          <ul className="select-options" style={{display: display}}>
            <li onClick={() => this.handleChange("Friday 1/06")}>Friday 1/06</li>
            <li onClick={() => this.handleChange("Saturday 1/07")}>Saturday 1/07</li>
          </ul>
        </div>
      </div>
    )
  }
}


/**
 *
 */
function Header(props) {
  return (
    <header>
      <nav className="gradient-overlay">
        <h1>Reel Deal Theater</h1>
      </nav>
    </header>
  )
}

function MovieCard(props) {
  const rating_class = "rating " + props.rating;
  const showtimes = props.showtimes.map((time, i) => {
    return (
      <span key={i}>{time}</span>
    )
  });

  return (
    <div className="movie-card">
      <div className="poster">
        <img src={props.poster} alt={props.name}/>
      </div>
      <div className="info">
        <span className={rating_class}>{props.rating}</span>
        <span className="runtime">{props.runtime}</span>
      </div>
      <div className="showtimes">{showtimes}</div>
    </div>
  )
}

class MovieGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_date: "Friday 1/06",
    };

    this.movies = [{
      "name" : "Star Wars: Rogue One",
      "poster": "img/sing.jpg",
      "rating" : "G",
      "runtime" : "2h 13m",
      "showtimes" : {
        "Friday 1/06" : [
          "12:45 2D",
          "3:45 2D",
          "6:45 3D",
          "9:45 3D"
        ],
        "Saturday 1/07" : [
          "12:45 2D",
          "3:45 2D",
          "6:45 3D",
          "9:45 3D"
        ]
      }
    }, {
      "name" : "Assasins Creed",
      "poster": "img/passengers.jpg",
      "rating" : "PG",
      "runtime" : "2h 20m",
      "showtimes" : {
        "Friday 1/06" : [
          "1:00 2D",
          "4:00 2D",
          "7:00 3D",
          "9:40 3D"
        ],
        "Saturday 1/07" : [
          "12:45 2D",
          "3:45 2D",
          "6:45 3D",
          "9:45 3D"
        ]
      }
    }, {
      "name" : "Star Wars: Rogue One",
      "poster": "img/star_wars.jpg",
      "rating" : "PG-13",
      "runtime" : "2h 13m",
      "showtimes" : {
        "Friday 1/06" : [
          "3:45 2D",
          "6:45 3D",
          "9:45 3D"
        ],
        "Saturday 1/07" : [
          "1:00 2D",
          "4:00 2D",
          "7:00 3D",
          "9:40 3D"
        ]
      }
    }, {
      "name" : "Assasins Creed",
      "poster": "img/assassins_creed.jpg",
      "rating" : "R",
      "runtime" : "2h 20m",
      "showtimes" : {
        "Friday 1/06" : [
          "1:00 2D",
          "4:00 2D",
          "7:00 3D",
          "9:40 3D",
          "12:00 3D"
        ],
        "Saturday 1/07" : [
          "12:45 2D",
          "3:45 2D",
          "6:45 3D",
          "9:45 3D"
        ]
      }
    }];
  }

  handleShowtimes(selected_date) {
    this.setState({
      current_date: selected_date
    });
  }

  render(props) {
    return (
      <React.Fragment>
        <NowShowingSelector
          onChange={(date) => this.handleShowtimes(date)}
        />
        <div className="movie-grid">
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
  }
}

function TicketInfo(props) {
  return (
    <div className="ticket-info">
      <h1 className="info-title">Ticket Information</h1>
      <div className="info-desc" style={{maxWidth: '550px', margin: 'auto', textAlign: 'center'}}>
        <p>
          Doors open 30 minutes prior to the first showing for that day.
          Tickets can be purchased the day of show or as early as the Tuesday
          before a show that is to be played that week. Free admission on your
          birthday with proof of birth date. Gift cards make the perfect gift
          and can be purchased for any amount from the box office. A Matinee
          is any show before <b>6pm</b>.
        </p>
      </div>
      <table className="D2 pure-table pure-table-bordered pure-table-striped">
        <thead>
          <tr>
            <th>Regular 2D</th>
            <th>Matinee</th>
            <th>Evening</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Children (0-12)</td>
            <td colSpan='2'>$7.50</td>
          </tr>
          <tr>
            <td>Adult</td>
            <td>$7.50</td>
            <td>$8.75</td>
          </tr>
          <tr>
            <td>Seniors (60+)</td>
            <td colSpan='2'>$7.50</td>
          </tr>
          <tr>
            <td>Students</td>
            <td colSpan='2'>$7.50</td>
          </tr>
        </tbody>
      </table>
      <table className="D3 pure-table pure-table-bordered pure-table-striped">
        <thead>
          <tr>
            <th id="reald3d-logo"></th>
            <th>Matinee</th>
            <th>Evening</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Children (0-12)</td>
            <td colSpan='2'>$9.50</td>
          </tr>
          <tr>
            <td>Adult</td>
            <td>$9.50</td>
            <td>$10.75</td>
          </tr>
          <tr>
            <td>Seniors (60+)</td>
            <td colSpan='2'>$9.50</td>
          </tr>
          <tr>
            <td>Students</td>
            <td colSpan='2'>$9.50</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

function TheaterInfo(props) {
  return (
    <div className="theater-info">
      <h1 className="info-title">Theater Information</h1>
      <div className="info-section">
        <h3>About Us</h3>
        <p>
          The Reel Deal Theater is a family owned and operated independent movie
          theater located in Los Alamos, NM. In operation since December 2003,
          this theater is a state of the art facility committed to the community.
          Dolby digital and stereo surround sound enhances enjoyment of our
          first-run and other film offerings. Our concession stand offers the
          standard fare (with delicious popcorn) and specialty food items.
          Special events may be planned by contacting the theater manager for
          rental.
        </p>
      </div>

      <div className="info-section">
        <h3>Theater Rental</h3>
        <p>
          The Reel Deal is available for conferences, private
          screenings, and daytime entertaining. Movie screens
          and plush seating will help you get your message across
          in style. The concession counter, including desserts
          and/or coffee, can be available for your event.
          To schedule, please call (505) 661-9966.
        </p>
      </div>

      <div className="info-section">
        <h3>Job Opportunities</h3>
        <p>
          Are you interested in being part of a local family run cinema
          operation which includes free first-run movies and all the popcorn
          you can eat? Would you like to learn how to become a projectionist
          and learn the cinema business from the inside-out? Would you like to
          become a manager, assistant manager or supervisor? We have flexible
          hours for students. Please contact Jim O'Donnell at (505) 661-9966.
        </p>
      </div>

      <div className="info-section">
        <h3>Screen Advertising</h3>
        <p>
          To inquire about rates and formatting of
          Reel Deal Screen Advertising,
          contact:<br/>
          <br/>
          Kate O'Donnell<br/>
          reeldealpreshow@yahoo.com<br/>
          (505) 231-5144 or (505) 662-5551
        </p>
      </div>
    </div>
  )
}

function Footer(props) {
  return (
    <div className="footer">
      <div className="contact-info">
        <h3>Contact</h3>
        <table className="pure-table pure-table-horizontal pure-table-striped">
          <tbody>
            <tr>
              <td>Showtimes</td>
              <td><a href="tel:5056620617">(505) 662-0617</a></td>
            </tr>
            <tr>
              <td>Theater Staff</td>
              <td><a href="tel:505662-1580">(505) 662-1580</a></td>
            </tr>
            <tr>
              <td>Advertising</td>
              <td>
                <a href="tel:5052315144">(505) 231-5144</a><br/>
                <a href="tel:5056625551">(505) 662-5551</a>
              </td>
            </tr>
            <tr>
              <td>Special Events</td>
              <td><a href="tel:5056629966">(505) 662-9966</a></td>
            </tr>
            <tr>
              <td>Email</td>
              <td><a href="mailto:Odonnell455@gmail.com">Odonnell455@gmail.com</a></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="location">
        <h3>Location</h3>
        <a href="https://www.google.com/maps/place/Reel+Deal+Theater/@35.8820335,-106.3059371,19z/data=!4m5!3m4!1s0x0:0xd28a8ba3dca947f9!8m2!3d35.8820663!4d-106.3057548">
          Reel Deal Movie Theater<br/>
          2551 Central Avenue<br/>
          Los Alamos, NM 87544
        </a><br/>
        <br/>
        <iframe title="location-map" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1616.3278122844838!2d-106.30642527599642!3d35.8819552817943!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xd28a8ba3dca947f9!2sReel+Deal+Theater!5e0!3m2!1sen!2sus!4v1482798693924" width="300" height="225" frameBorder="0" style={{border:0}} allowFullScreen></iframe>
      </div>
    </div>
  )
}

class App extends React.Component {
  render(props) {
    return (
      <React.Fragment>
        <Header
          gradient="linear-gradient(to bottom, rgba(61, 15, 244, 80%), rgb(173, 15, 244, 100))"
          background='img/IMG_7137.jpg'
        />
        <MovieGrid/>
        <TicketInfo/>
        <TheaterInfo/>
        <Footer/>
      </React.Fragment>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
