import React from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import isEmpty from 'lodash.isempty';

import AdminPage from './layout/admin_page';
import MovieAPI from '../api/movie_api'

const blank_movie = {
  label: 'New Movie',
  value: {
    title: '',
    rating: 'G',
    runtime: '',
    showtimes: { },
  }
}

class Movies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      selected_movie: blank_movie,
    }
  }

  componentDidMount() {
    MovieAPI.get()
      .then((result) => {
        //console.log(result);
        const movies = result.data.map(movie => {
          movie.start_date = moment(movie.start_date);
          movie.end_date = moment(movie.end_date);
          return { label: movie.title, value: movie }
        });

        this.setState({
          movies,
          selected_movie: movies[0]
        })
      },
      error => console.log(error),
    );
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  enumerateDates = (field, value) => {
    let dates = [];

    // get the start and end days of the date range
    let start = moment('start_date' === field ? value : this.state.start_date).startOf('day');
    let end = moment('end_date' === field ? value : this.state.end_date).startOf('day');

    // TODO: needs to decide how to handle showtimes that exist in the new date range instead
    // of just wiping them out.

    // enumerate the days
    do {
      dates.push(start.clone());
    } while (start.add(1, 'days').diff(end) < 1);

    this.setState({
      [field]: value,
      showtimes: dates.map((date) => {return {date, times: ''}}),
    })
  }

  handleChange = (event) => {
    const field = event.target.name;

    let value;
    if (event.target.type === 'select') {
      value = event.target.selected;
    } else {
      value = event.target.value;
    }

    this.handleChangeNamed(field, value);
  }

  handleChangeNamed = (field, value) => {
    const movie = {...this.state.selected_movie};
    movie.value[field] = value;
    this.setState({ selected_movie: movie });

    // if it is a date that is changing, enumerate the dates in between
    /*
    if (['start_date', 'end_date'].includes(field)) {
      this.enumerateDates(field, value);
    }
    // otherwise just update the field given with the value given
    else {
      this.setState({
        [field]: value
      })
    }
    */
  }

  handleChangeShowtimes = (event, key) => {
    const movie = {...this.state.selected_movie};
    movie.value.showtimes[key] = event.target.value;
    this.setState({ selected_movie: movie });
  }


  handleNewMovie = () => {
    this.setState({ selected_movie: blank_movie });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('NO SUBMIT FOR YOU!');

    // TODO: need save only and publish option
    // TODO: validate the input, yup is your friend!
  }

  render() {
    let movie = this.state.selected_movie.value;

    if (!movie) {
      return (
        <div className='row'>
          Select a Movie to see it's info or click "New Movie" to created a one
        </div>
      )
    }
  
    return (
      <AdminPage title='Movies'>
        {/* Movie Selector */}
        <div className='row pb-4 mb-4' style={{ borderBottom: 'solid 1px #DDD' }}>
          <div className='col col-xs-10 col-xl-3'>
            <Select
              value={this.state.selected_movie}
              onChange={(option) => this.setState({ selected_movie: option })}
              options={this.state.movies}
              className='form-group-auto'
            />
          </div>
          <div className='col col-xs-2 col-xl-3 pl-0'>
            <button onClick={this.handleNewMovie} type='submit' className='btn btn-primary'>
              New Movie
            </button>
          </div>
        </div>

        {/* Movie Form section */}
        <div className='movie-block'>
          <form onSubmit={this.handleSubmit}>
            <div className='row'>
              <div className='col'>
                <h3>Meta Data</h3>
              </div>
            </div>
            <div className='row mb-4'>
              <div className='col col-sm-3 col-12'>
                <div className='mb-2'>Poster</div>
                <div className='card'>
                  {movie.poster
                    ? <img className='card-img-top' src={movie.poster} alt='movie poster'/>
                    : <div className='dropzone' style={{
                      border: '4px dashed #DDD',
                      height: '250px',
                      color: '#AAA',
                      textAlign: 'center',
                      paddingTop: '100px',
                    }}>
                      Upload
                    </div>
                  }
                </div>
              </div>
              <div className='col col-sm-9 col-12'>
                <div className='form-group'>
                  <label htmlFor='title'>Title</label>
                  <input
                    type='text'
                    id='title'
                    name='title'
                    className='form-control w-auto'
                    placeholder='Movie Title'
                    value={movie.title}
                    onChange={this.handleChange}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='rating'>Rating</label>
                  <select
                    id='rating'
                    className='form-control w-auto'
                    checked={movie.rating}
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
                    value={movie.runtime}
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
                        selected={movie.start_date}
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
                      selected={movie.end_date}
                      onChange={(date) => this.handleChangeNamed('end_date', date)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='row mb-4'>
              <div className='col'>
                <h3>Showtimes</h3>
                {isEmpty(movie.showtimes) ? (
                  <div>
                    Enter start and end dates (inclusive) to see showtimes
                  </div>
                ) : null}
                {Object.keys(movie.showtimes).map((key) => {
                  return (
                    <div key={key} className='form-group row'>
                      <label className='col-2 col-form-label' style={{ textAlign: 'right' }}>
                        {moment(key).format('dddd MM/DD')}
                      </label>
                      <div className='col'>
                        <input
                          type='text'
                          className='form-control'
                          placeholder=''
                          value={movie.showtimes[key]}
                          onChange={(event) => this.handleChangeShowtimes(event, key)}
                        />
                      </div>
                    </div>
                  );
                }, this)}
              </div>
            </div>
            <div className='row'>
              <div className='col-3'>
                <button type='submit' className='btn btn-primary w-100' value='submit'>
                  Publish
                </button>
              </div>
            </div>
          </form>
        </div>
      </AdminPage>
    );
  }
}

export default Movies;