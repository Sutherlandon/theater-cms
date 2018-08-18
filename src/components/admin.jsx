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

function Menu() {
  return (
    <nav className="nav flex-column nav-pills">
      <a className="nav-link active" href="#">Movies</a>
      <a className="nav-link" href="#">About</a>
    </nav>
  )
}

class MovieInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.title,
      rating: props.rating,
      runtime: props.runtime,
      start_date: props.start_date,
      start_date: props.end_date,
      showtimes: [...props.showtimes],
    }

    this.m = props.movie;

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    let value;
    if (event.target.type === 'select') {
      value = event.target.selected;
    } else {
      value = event.target.value;
    }

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className='movie-block'>
        <form>
          <div className='row mb-4'>
            <div className='col col-9'>
              <div className='form-row'>
                <div className='form-group col'>
                  <label htmlFor='title'>Title</label>
                  <input type='text'
                    id='title'
                    name='title'
                    className='form-control'
                    placeholder='Movie Title'
                    value={this.state.title}
                    onChange={this.handleChange}
                  />
                </div>
                <div className='form-group col'>
                  <label htmlFor='rating'>Rating</label>
                  <select id='rating'
                    className='form-control'
                    checked={this.state.rating}
                    onChange={this.handleChange}
                    >
                    <option value='G'>G</option>
                    <option value='PG'>PG</option>
                    <option value='PG-13'>PG-13</option>
                    <option value='R'>R</option>
                    <option value='NC-17'>NC-17</option>
                  </select>
                </div>
                <div className='form-group col'>
                  <label htmlFor='runtime'>Runtime</label>
                  <input type='text'
                    id='runtime'
                    name='runtime'
                    className='form-control'
                    placeholder='ie. 2:35'
                    value={this.state.runtime}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className='form-group row'>
                <label htmlFor='start_date' className='col-auto col-form-label'>Start Date</label>
                <div className='col-auto'>
                  <DatePicker id='start_date'
                    name='start_date'
                    className='form-control'
                    dateFormat='MM/DD/YYYY'
                    selected={moment(this.m.start_date)}
                    onChange={this.handleChange}
                  />
                </div>
                <label htmlFor='end_date' className='col-auto col-form-label'>End Date</label>
                <div className='col-auto'>
                  <DatePicker id='end_date'
                    name='end_date'
                    className='form-control'
                    dateFormat='MM/DD/YYYY'
                    selected={moment(this.m.end_date)}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              {this.state.showtimes.map((day, i) => {
                console.log(day);
                return (
                  <div key={i} className='form-group row'>
                    <label className='col-md-2 col-form-label'>{day.date}</label>
                    <div className='col-md-10'>
                      <input type='text'
                        name={day.date}
                        className='form-control'
                        placeholder=''
                        value={day.times}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                );
              }, this)}
            </div>
            <div className='col col-3'>
              <div>Poster</div>
              <div className='card'>
                <img className='card-img-top' src={this.m.poster}/>
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
}

function Movies() {
  const movies_styles = {
    'backgroundColor': 'whitesmoke',
    'boxSizing': 'border-box',
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
      <div className='row no-gutters' style={{'height': '100%'}}>
        <div className='col col-2'>
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
