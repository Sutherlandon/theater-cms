import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-scroll'

/**
 * A select.
 * @param id
 *  The id of the selector. Must be unique for each app
 * @param onChange
 *   A function to do when the select box changes
 * @param options
 *  The list of options for the select box
 */
class SelectBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Friday 1/06',
      open: false
    }

    // the id of the select box
    this.id = props.id;

    // create a list of options to select from
    this.showtimes = props.options.map((time, i) => {
      return (
        <li key={i} onClick={() => this.handleChange(time)}>{time}</li>
      )
    });

    // bind functions passed in
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

  render() {
    const display = this.state.open ? "block" : "none";

    return (
      <div className="select-input">
        <label htmlFor={this.id + "-select"} className="select-label">Now Showing</label>
        <div className="select-wrapper">
          <button id={this.id + "-select"} className="select-button"
            onClick={() => this.setState({open: !this.state.open})}>
            {this.state.value}
            <span className="caret"></span>
          </button>
          <ul className="select-options" style={{display: display}}>
            {this.showtimes}
          </ul>
        </div>
      </div>
    )
  }
}


/**
 * Header with Title and Gradient background
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

/**
 *
 */
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

/**
 *
 */
class MovieGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_date: "Friday 1/06",
      collapsed: ""
    };

    // This reads a global variable defined in public/js/db.js
    // eventually this should query something like LokiJS
    this.movies = global.db.movies;
  }

  /**
   * Gets a list dates that movies are showing on
   */
  getShowdates() {
    let showtimes = [];
    this.movies.forEach((movie) => {
      for (const day in movie.showtimes) {
        // if the list does not contain the show day
        if (showtimes.indexOf(day) === -1 ) {
          showtimes.push(day);
        }
      }
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
    return (
      <React.Fragment>
        <SelectBox
          id="now-showing"
          options={this.getShowdates()}
          onChange={(date) => this.handleShowtimes(date)}
        />
        <div className="movie-deck" onScroll={() => this.setState({collapsed: "collapsed"})}>
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
        <div className={"deck-slide-indicator " + this.state.collapsed}>
          Slide for more
        </div>
      </React.Fragment>
    );
    /*
    return (
      <React.Fragment>
        <NowShowingSelector
          options={this.getShowdates()}
          onChange={(date) => this.handleShowtimes(date)} />
        <div className="deck-slide-indicator" style={{display: this.state.show_indicator}}>
          <div>scroll</div>
        </div>
        <div className="movie-deck" onScroll={() => this.setState({show_indicator: "none"})}>
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
    */
  }
}

/**
 * Creates a section heading that when clicked, scrolls that heading to the top
 * of the screen
 */
function SectionTitle(props) {
  return (
    <Link
      className="info-title"
      duration={1000}
      offset={-30}
      smooth={true}
      to={props.text}
    >
      <h1 id={props.text}>
        {props.text}
      </h1>
    </Link>
  )
}

/**
 *
 */
function TicketInfo(props) {
  return (
    <div className="ticket-info">
      <SectionTitle text="Ticket Information" />
      <div className="info-desc">
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

function InfoSection(props) {
  return (
    <div className="info-section">
      <h3>{props.title}</h3>
      <p>{props.content}</p>
    </div>
  )
}

function ContactCard(props) {
  return (
    <div className="info-section">
      <h3>{props.title}</h3>
      <p>{props.desc}</p>
      <p>
        {props.name}<br/>
        {props.phone}<br/>
        {props.email}
      </p>
    </div>
  )
}

function TheaterInfo(props) {
  return (
    <div className="theater-info">
      <SectionTitle text="Theater Information" />
      <InfoSection
        title="About Us"
        content="The Reel Deal Theater is a family owned and operated
          independent movie theater located in Los Alamos, NM. In operation
          since December 2003, this theater is a state of the art facility
          committed to the community. Dolby digital and stereo surround sound
          enhances enjoyment of our first-run and other film offerings. Our
          concession stand offers the standard fare (with delicious popcorn) and
          specialty food items. Special events may be planned by contacting the
          theater manager for rental."
      />

      <InfoSection
        title="Theater Rental"
        content="The Reel Deal is available for conferences, private
          screenings, and daytime entertaining. Movie screens
          and plush seating will help you get your message across
          in style. The concession counter, including desserts
          and/or coffee, can be available for your event.
          To schedule, please call (505) 661-9966."
      />

      <InfoSection
        title="Job Opportunities"
        content=" Are you interested in being part of a local family run cinema
          operation which includes free first-run movies and all the popcorn
          you can eat? Would you like to learn how to become a projectionist
          and learn the cinema business from the inside-out? Would you like to
          become a manager, assistant manager or supervisor? We have flexible
          hours for students. Please contact Jim O'Donnell at (505) 661-9966."
      />

      <ContactCard
        title="Screen Advertising"
        desc= "To inquire about rates and formatting of Reel Deal Screen Advertising, contact:"
        name="Kate O'Donnell"
        phone="(505) 231-5144 or (505) 662-5551"
        email="reeldealpreshow@yahoo.com"
      />
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
        <iframe
          title="location-map"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1616.3278122844838!2d-106.30642527599642!3d35.8819552817943!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xd28a8ba3dca947f9!2sReel+Deal+Theater!5e0!3m2!1sen!2sus!4v1482798693924"
          width="300"
          height="225"
          frameBorder="0"
          style={{border:0}}
          allowFullScreen>
        </iframe>
      </div>
    </div>
  )
}

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
