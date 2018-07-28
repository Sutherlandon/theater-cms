import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function Header() {
  return (
    <header style={{'height': 'auto'}}>
      <nav className="gradient-overlay">
        <h1>Theater CMS Admin</h1>
      </nav>
    </header>
  )
}

/*
<!-- Menu toggle -->
<a href="#menu" id="menuLink" class="menu-link">
    <!-- Hamburger icon -->
    <span></span>
</a>
*/

function Menu() {
  return (
    <div id="menu" className='pure-u-1-6'>
        <div className="pure-menu">
            <ul className="pure-menu-list">
                <li className="pure-menu-item">
                  <a href="#" className="pure-menu-link">Movies</a>
                </li>
                <li className="pure-menu-item">
                  <a href="#" className="pure-menu-link">About</a>
                </li>
            </ul>
        </div>
    </div>
  )
}

function MovieInfo(props) {
  const m = props.movie;

  return (
    <div className='movie-block'>
      <input type='text' placeholder='Movie Title' value={props.title} />
      <select>
        <option value='G'>G</option>
        <option value='PG'>PG</option>
        <option value='PG-13'>PG-13</option>
        <option value='R'>R</option>
        <option value='NC-17'>NC-17</option>
      </select>
      <input type='text' placeholder='ie. 2:35' value={props.runtime} />
      {props.showtimes.map((day, i) => {
        console.log(day);
        return (
          <div key={i}>
            <label>{day.date}</label>
            <input type='text' placeholder='' value={day.times.join(', ')} />
          </div>
        );
      })}
    </div>
  );
}

function Movies() {
  const movies_styles = {
    'background-color': 'whitesmoke',
    'box-sizing': 'border-box',
    'height': '100%',
    'padding': '1em'
  }

  return (
    <div className='pure-u-5-6' style={movies_styles}>
      <div className='page-title'>
        <h2> Here is a list of Movies </h2>
      </div>
      <div className='content'>
        {global.db2.movies.map((movie, i) => {
          return (
            <MovieInfo
              key={i}
              movie={movie}
              title={movie.title}
              poster={movie.poster}
              rating={movie.rating}
              runtime={movie.runtime}
              showtimes={movie.showtimes}
            />
          );
        })}
      </div>
    </div>
  )
}

export function Admin(props) {
  return (
    <React.Fragment>
      <Header />
      <div className='pure-g' style={{'height': '100%'}}>
        <Menu />
        <BrowserRouter>
          <Switch>
            <Route path='/' component={Movies}/>
          </Switch>
        </BrowserRouter>
      </div>
    </React.Fragment>
  )
}
