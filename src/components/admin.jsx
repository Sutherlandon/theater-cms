import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

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
    <div id="menu">
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
      <form>
        <div className='row mb-4'>
          <div className='col col-9'>
            <div className='form-row'>
              <div className='form-group col'>
                <label htmlFor={props.title + '_id'}>Title</label>
                <input id={props.title + '_id'} type='text' className='form-control' placeholder='Movie Title' value={props.title} />
              </div>
              <div className='form-group col'>
                <label htmlFor={props.title + '_rating'}>Rating</label>
                <select id={props.title + '_rating'} className='form-control'>
                  <option value='G'>G</option>
                  <option value='PG'>PG</option>
                  <option value='PG-13'>PG-13</option>
                  <option value='R'>R</option>
                  <option value='NC-17'>NC-17</option>
                </select>
              </div>
              <div className='form-group col'>
                <label htmlFor={props.title + '_run'}>Runtime</label>
                <input id={props.title + '_run'} type='text' className='form-control' placeholder='ie. 2:35' value={props.runtime} />
              </div>
            </div>
            <div className='form-group row'>
              <label htmlFor={props.title + '_start'} className='col-auto col-form-label'>Start Date</label>
              <div className='col-auto'>
                <DatePicker id='start_date'
                  name='start_date'
                  className='form-control'
                  dateFormat='MM/DD/YYYY'
                  selected={moment(m.start_date)}/>
              </div>
              <label htmlFor={props.title + '_end'} className='col-auto col-form-label'>End Date</label>
              <div className='col-auto'>
                <DatePicker id='end_date'
                  name='end_date'
                  className='form-control'
                  dateFormat='MM/DD/YYYY'
                  selected={moment(m.end_date)}/>
              </div>
            </div>
            {props.showtimes.map((day, i) => {
              console.log(day);
              return (
                <div key={i} className='form-group row'>
                  <label className='col-md-2 col-form-label'>{day.date}</label>
                  <div className='col-md-10'>
                    <input type='text' className='form-control' placeholder='' value={day.times.join(', ')} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className='col col-3'>
            <div>Poster</div>
            <div className='card'>
              <img className='card-img-top' src={m.poster}/>
              <div className='card-body'>
                <a href='#' className='btn btn-primary'>Change</a>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col col-9 mx-auto'>
            <button type='submit' className='btn btn-primary w-100' value='submit'>
              Save
            </button>
          </div>
        </div>
      </form>
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
    <div style={movies_styles}>
      <div className='page-title'>
        <h2>Movies</h2>
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
      <div className='row' style={{'height': '100%'}}>
        <div className='col col-auto'>
          <Menu />
        </div>
        <div className='col'>
          <BrowserRouter>
            <Switch>
              <Route path='/' component={Movies}/>
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    </React.Fragment>
  )
}
