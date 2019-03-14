import React from 'react';
import DatePicker from 'react-datepicker';
import AdminPage from '../../../components/layout/admin_page';
import Select from 'react-select';

import moment from 'moment';
import axios from 'axios';
import config from '../../../config';

class MovieInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'none',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeShowtimes = this.handleChangeShowtimes.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeNamed = this.handleChangeNamed.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.title !== nextProps.title) {
      const showtimes = Object.keys(nextProps.showtimes).map(date => ({
        date: moment(date),
        times: nextProps.showtimes[date] ? nextProps.showtimes[date].join(', ') : '',
      }));

      return {
        title: nextProps.title,
        rating: nextProps.rating,
        runtime: nextProps.runtime,
        start_date: moment(showtimes[0].date),
        end_date: moment(showtimes[showtimes.length - 1].date),
        showtimes,
        poster: nextProps.poster,
      }
    }

    return null;
  }

  componentDidMount() {
    console.log('movies state', this.state);
  }

  enumerateDates(field, value) {
    let dates = [];

    // get the start and end days of the date range
    let start = moment('start_date' === field ? value : this.state.start_date).startOf('day');
    let end   = moment('end_date'   === field ? value : this.state.end_date).startOf('day');

    // TODO: needs to decide how to handle showtimes that exist in the new date range instead
    // of just wiping them out.

    // enumerate the days
    do {
      dates.push(start.clone());
      console.log(start.diff(end));
    } while (start.add(1, 'days').diff(end) < 1);

    this.setState({
      [field]: value,
      showtimes: dates.map((date) => {return {date, times: ''}}),
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

    this.setState({ showtimes });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('NO SUBMIT FOR YOU!');

    // TODO: need save only and publish option
    // TODO: validate the input, yup is your friend!
  }

  render() {
    return (
      <div className='movie-block'>
        <form onSubmit={this.handleSubmit}>
          <div className='row'>
            <div className='col'>
              <h3>Meta Data</h3>
            </div>
          </div>
          <div className='row mb-4'>
            <div className='col col-2'>
              <div>Poster</div>
              <div className='card'>
                <img className='card-img-top' src={this.state.poster} alt='movie poster'/>
              </div>
            </div>
            <div className='col'>
              <div className='form-group'>
                <label htmlFor='title'>Title</label>
                <input
                  type='text'
                  id='title'
                  name='title'
                  className='form-control w-auto'
                  placeholder='Movie Title'
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='rating'>Rating</label>
                <select
                  id='rating'
                  className='form-control w-auto'
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
              <div className='form-group'>
                <label htmlFor='runtime'>Runtime</label>
                <input
                  type='text'
                  id='runtime'
                  name='runtime'
                  className='form-control w-auto'
                  placeholder='ie. 2h 35m'
                  value={this.state.runtime}
                  onChange={this.handleChange}
                />
              </div>
              <div className='form-row'>
                <div className='form-group col-auto'>
                  <label htmlFor='start_date'>Start Date</label>
                  <div className=''>
                    <DatePicker
                      id='start_date'
                      name='start_date'
                      className='form-control'
                      dateFormat='MM/DD/YYYY'
                      selected={this.state.start_date}
                      onChange={(date) => this.handleChangeNamed('start_date', date)}
                    />
                  </div>
                </div>
                <div className='col-auto' style={{
                  alignSelf: 'flex-end',
                  paddingBottom: '20px',
                  fontSize: '25px',
                }}>></div>
                <div className='form-group col-auto'>
                  <label htmlFor='end_date'>End Date</label>
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
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <h3>Showtimes</h3>
              {this.state.showtimes.map(({ date, times },  i) => {
                return (
                  <div key={i} className='form-group row'>
                    <label className='col-2 col-form-label' style={{ textAlign: 'right' }}>{date.format('dddd MM/DD')}</label>
                    <div className='col'>
                      <input
                        type='text'
                        className='form-control'
                        placeholder=''
                        value={times}
                        onChange={(event) => this.handleChangeShowtimes(event, i)}
                      />
                    </div>
                  </div>
                );
              }, this)}
              <div className='row'>
                <div className='col-2'></div>
                <div className='col-3'>
                  <button type='submit' className='btn btn-primary w-100' value='submit'>
                    Save
                  </button>
                </div>
              </div>
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
      selected_movie: {},
    }
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: `http://${config.dev.base_url}:${config.dev.api_port}/api/movies`,
    }).then(
      result => {
        console.log(result);
        const movies = result.data.map(movie => ({ label: movie.title, value: movie }));
        this.setState({
          movies,
          selected_movie: movies[0],
        })
      },
      error => console.log(error),
    );
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    console.log('movies', this.state.movies);
    console.log('selected', this.state.selected_movie);
    let movie = {}
    if (this.state.selected_movie !== {}) {
      movie = this.state.selected_movie.value;
    }

    return (
      <AdminPage title='Movies'>
        <div className='row pb-4 mb-4' style={{ borderBottom: 'solid 1px #DDD' }}>
          <div className='col col-xs-12 col-xl-3'>
            <Select
              value={this.state.selected_movie}
              onChange={(option) => this.setState({ selected_movie: option })}
              options={this.state.movies}
              className='form-group-auto'
            />
          </div>
        </div>
        {movie
          ? <MovieInfo
            movie={movie}
            title={movie.title}
            poster={movie.poster}
            rating={movie.rating}
            runtime={movie.runtime}
            showtimes={movie.showtimes}
            start_date={movie.start_date}
            end_date={movie.end_date}
          />
          : null
        }
      </AdminPage>
    );
  }
}

export default Movies;
