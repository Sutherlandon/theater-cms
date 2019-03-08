import React from 'react';
import DatePicker from 'react-datepicker';
import AdminPage from '../../../components/layout/admin_page';

import moment from 'moment';
import axios from 'axios';
import config from '../../../config';

import 'react-datepicker/dist/react-datepicker.css';

class MovieInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.title,
      rating: props.rating,
      runtime: props.runtime,
      start_date: moment(props.start_date),
      end_date: moment(props.end_date),
      showtimes: [],
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeShowtimes = this.handleChangeShowtimes.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeNamed = this.handleChangeNamed.bind(this);
  }

  componentDidMount() {
    console.log(this.state);
  }

  enumerateDates(field, value) {
    let dates = [];

    // get the start and end days of the date range
    let start = moment('start_date' === field ? value : this.state.start_date).startOf('day');
    let end   = moment('end_date'   === field ? value : this.state.end_date).startOf('day');

    // enumerate the days
    do {
      dates.push(start.clone());
      console.log(start.diff(end));
    } while (start.add(1, 'days').diff(end) < 1);

    this.setState({
      [field]: value,
      showtimes: dates.map((date) => {return {date: date, times: ''}}),
    })
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

  handleChangeNamed(field, value) {
    // if it is a date that is changing, enumerate the dates in between
    if (['start_date', 'end_date'].includes(field)) {
      this.enumerateDates(field, value);
    }
    // otherwise just update the field given with the value given
    else {
      this.setState({
        [field]: value
      })
    }
  }

  handleChangeShowtimes(event, i) {
    const showtimes = [...this.state.showtimes];
    showtimes[i].times = event.target.value;

    this.setState({
      showtimes: showtimes,
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('NO SUBMIT FOR YOU!');

    // validate the input
  }

  render() {
    return (
      <div className='movie-block'>
        <form onSubmit={this.handleSubmit}>
          <div className='row mb-4'>
            <div className='col col-9'>
              <div className='form-row'>
                <div className='form-group col'>
                  <label htmlFor='title'>Title</label>
                  <input
                    type='text'
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
                  <select
                    id='rating'
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
                  <input
                    type='text'
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
                  <DatePicker
                    id='start_date'
                    name='start_date'
                    className='form-control'
                    dateFormat='MM/DD/YYYY'
                    selected={this.state.start_date}
                    onChange={(date) => this.handleChangeNamed('start_date', date)}
                  />
                </div>
                <label htmlFor='end_date' className='col-auto col-form-label'>End Date</label>
                <div className='col-auto'>
                  <DatePicker
                    id='end_date'
                    name='end_date'
                    className='form-control'
                    dateFormat='MM/DD/YYYY'
                    selected={this.state.end_date}
                    onChange={(date) => this.handleChangeNamed('end_date', date)}
                  />
                </div>
              </div>
              {this.state.showtimes.map((day, i) => {
                return (
                  <div key={i} className='form-group row'>
                    <label className='col-md-3 col-form-label'>{day.date.format('dddd (MM/DD)')}</label>
                    <div className='col-md-9'>
                      <input
                        type='text'
                        className='form-control'
                        placeholder=''
                        value={day.times}
                        onChange={(event) => this.handleChangeShowtimes(event, i)}
                      />
                    </div>
                  </div>
                );
              }, this)}
            </div>
            <div className='col col-3'>
              <div>Poster</div>
              <div className='card'>
                <img className='card-img-top' src={this.props.poster} alt='movie poster' />
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

class Movies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
    }
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: `http://${config.dev.base_url}:${config.dev.api_port}/api/movies`,
    }).then(
      result => {
        console.log(result);
        this.setState({ movies: result.data })
      },
      error => console.log(error),
    );
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    return (
      <AdminPage title='Movies'>
        {this.state.movies.map((movie, i) => {
          return (
            <MovieInfo
              key={movie.title + i}
              movie={movie}
              title={movie.title}
              poster={movie.poster}
              rating={movie.rating}
              runtime={movie.runtime}
              showtimes={movie.showtimes}
              start_date={movie.start_date}
              end_date={movie.end_date}
            />
          );
        })}
      </AdminPage>
    );
  }
}

export default Movies;
