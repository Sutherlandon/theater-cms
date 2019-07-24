import React from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import isEmpty from 'lodash.isempty';
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';

import AdminPage from './layout/admin_page';
import MovieAPI from '../api/movie_api'

const movieSchema = yup.object({
  title: yup.string().required(),
  rating: yup.string().required(),
  runtime: yup.string().required(),
  start_date: yup.string().required(),
  end_date: yup.string().required(),
  showtimes: yup.object(),
});

const today = moment();

const blank_movie = {
  label: 'New Movie',
  value: {
    title: '',
    rating: 'G',
    runtime: '',
    start_date: today,
    end_date: today.add(1, 'days'),
    showtimes: {},
  }
}

class Movies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      selected_movie: blank_movie,
      initialValues: blank_movie.value,
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

        if (movies.length > 0) {
          this.setState({
            movies,
            selected_movie: movies[0]
          });
        }
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

    // create the fields
    const showtimes = {};
    dates.forEach(date => (showtimes[date] = ''));

    this.setState({
      [field]: value,
      showtimes,
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

  handleChangeShowtimes = (event, key) => {
    const movie = {...this.state.selected_movie};
    movie.value.showtimes[key] = event.target.value;
    this.setState({
      selected_movie: movie,
      initialValues: movie,
    });
  }


  handleNewMovie = () => {
    this.setState({
      selected_movie: blank_movie,
      initialValues: blank_movie.value,
    });
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
              onChange={(option) => this.setState({ 
                selected_movie: option,
                initialValues: option.value,
              })}
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
          <div className='row'>
            <div className='col'>
              <h3>Meta Data</h3>
            </div>
          </div>
          <Formik
            initialValues={this.state.initialValues}
            validationSchema={movieSchema}
            onSubmit={this.handleSubmit}
          >
            {({ values, errors, touched, setFieldValue}) => {
              console.log('VALUES', values);

              return (
                <Form>
                  <div className='row mb-4'>
                    <div className='col col-auto h-100'>
                      <div className='mb-2'>Poster</div>
                      <div className='card'>
                        {movie.poster
                          ? <img className='card-img-top' src={movie.poster} alt='movie poster'/>
                          : <div className='dropzone' style={{
                            border: '4px dashed #DDD',
                            height: '250px',
                            color: '#AAA',
                            textAlign: 'center',
                            padding: '100px 100px 200px',
                          }}>
                            Upload
                          </div>
                        }
                      </div>
                    </div>
                    <div className='col'>
                      <div className='form-group'>
                        <label htmlFor='title'>Title</label>
                        <Field
                          className='form-control w-auto'
                          name='title'
                          placeholder='Movie Title'
                        />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='rating'>Rating</label>
                        <Field 
                          className='form-control w-auto'
                          component='select'
                          name='rating'
                        >
                          <option value='G'>G</option>
                          <option value='PG'>PG</option>
                          <option value='PG-13'>PG-13</option>
                          <option value='R'>R</option>
                          <option value='NC-17'>NC-17</option>
                        </Field>
                      </div>
                      <div className='form-group'>
                        <label htmlFor='runtime'>Runtime</label>
                        <Field
                          className='form-control w-auto'
                          name='runtime'
                          placeholder='ie. 2h 35m'
                        />
                      </div>
                      <div className='form-row'>
                        <div className='col-auto'>
                          <label htmlFor='start_date'>Start Date</label>
                          <div className=''>
                            <DatePicker
                              name='start_date'
                              className='form-control'
                              dateFormat='MM/DD/YYYY'
                              selected={values.start_date}
                              onChange={(date) => setFieldValue('start_date', date)}
                            />
                          </div>
                        </div>
                        <div className='col-auto' style={{
                          alignSelf: 'flex-end',
                          paddingBottom: '20px',
                          fontSize: '25px',
                        }}>></div>
                        <div className='col-auto'>
                          <label htmlFor='end_date'>End Date</label>
                          <DatePicker
                            name='end_date'
                            className='form-control'
                            dateFormat='MM/DD/YYYY'
                            selected={values.end_date}
                            onChange={(date) => setFieldValue('end_date', date)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='row mb-4'>
                    <div className='col'>
                      <h3>Showtimes</h3>
                      {isEmpty(values.showtimes) ? (
                        <div>
                          Enter start and end dates (inclusive) to see showtimes
                        </div>
                      ) : null}
                      {Object.keys(values.showtimes).map((key) => {
                        return (
                          <div key={key} className='form-group row'>
                            <label className='col-2 col-form-label' style={{ textAlign: 'right' }}>
                              {moment(key).format('dddd MM/DD')}
                            </label>
                            <div className='col'>
                              <Field
                                className='form-control'
                                name={`showtimes.${key}`}
                                placeholder=''
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
                </Form>
              );
            }}
          </Formik>
        </div>
      </AdminPage>
    );
  }
}

export default Movies;