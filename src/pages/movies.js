import React from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import isEmpty from 'lodash.isempty';
import * as yup from 'yup';
import { Formik, Form, Field, FieldArray } from 'formik';

import AdminPage from './layout/admin_page';
import MovieAPI from '../api/movie_api'

/**
 * 
 * @param {Object} values The values from the form
 */
const enumerateShowtimeFields = (values) => {
  // get the start and end days of the date range
  let { 
    start_date,
    end_date,
    showtimes,
  } = values;

  console.log(start_date, end_date);
  if (!(start_date && end_date)) {
    return [];
  }

  // showtimes format
  // [
  //   [moment(), '2:35, 5:46, 7:89'],
  //   [moment(), '2:35, 5:46, 7:89'],
  // ]

  // enumerate the days
  let dates = [];
  do {
    dates.push(start_date.clone());
  } while (start_date.add(1, 'days').diff(end_date) < 1);

  // handle new dates before days that already exist
  let i = 0;
  while (showtimes[i+1] && dates[i].diff(showtimes[i+1][0], 'days') < 0) {
    showtimes.unshift([dates[i], '']);
    i += 1;
  }

  // handle currently existing dates
  i += showtimes.length;

  // handle new dates after days that already exist
  while (i < dates.length) {
    showtimes.push([dates[i], '']);
    i += 1;
  }

  return showtimes;
}

const movieSchema = yup.object({
  title: yup.string().required(),
  rating: yup.string().required(),
  runtime: yup.string().required(),
  start_date: yup.string().required(),
  end_date: yup.string().required(),
  showtimes: yup.array(),
});

// showtimes format
// [
//   [moment(), '2:35, 5:46, 7:89'],
//   [moment(), '2:35, 5:46, 7:89'],
// ]
const blank_movie = {
  label: 'New Movie',
  value: {
    title: '',
    rating: 'G',
    runtime: '',
    start_date: undefined,
    end_date: undefined,
    showtimes: [],
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
                          <DatePicker
                            name='start_date'
                            className='form-control'
                            dateFormat='MM/DD/YYYY'
                            selected={values.start_date}
                            onChange={(date) => {
                              setFieldValue('start_date', date);
                              setFieldValue('showtimes', enumerateShowtimeFields(values));
                            }}
                          />
                        </div>
                        <div className='col-auto'>
                          <label htmlFor='end_date'>End Date</label>
                          <DatePicker
                            name='end_date'
                            className='form-control'
                            dateFormat='MM/DD/YYYY'
                            selected={values.end_date}
                            onChange={(date) => {
                              setFieldValue('end_date', date);
                              setFieldValue('showtimes', enumerateShowtimeFields(values));
                            }}
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
                      <FieldArray
                        name='showtimes' 
                        render={() => values.showtimes.map((showtime, i) => (
                          <div key={showtime.date} className='form-group row'>
                            <label className='col-2 col-form-label' style={{ textAlign: 'right' }}>
                              {moment(values.showtimes[i][0]).format('dddd MM/DD')}
                            </label>
                            <div className='col'>
                              <Field
                                className='form-control'
                                name={`showtimes.${i}.1`}
                                placeholder=''
                              />
                            </div>
                          </div>
                        )
                      )} />
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