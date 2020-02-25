import React from 'react';
import axios from 'axios';
import moment from 'moment';
import isEmpty from 'lodash.isempty';
import * as yup from 'yup';
import ReactSelect from 'react-select';
import Dropzone from 'react-dropzone';
import { Grid, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PublishIcon from '@material-ui/icons/Publish';
import AddIcon from '@material-ui/icons/Add';
import { Formik, Form, FieldArray } from 'formik';

import config from '../api/config';
import AdminPage from './layout/admin_page';
import MovieAPI from '../api/movie_api';
import TextField from '../components/formik/TextField';
import Select from '../components/formik/Select';
import DatePicker from '../components/formik/DatePicker';
import FormGroup from '../components/formik/blocks/FormGroup';

/**
 * showtimes format
 * [
 *   [moment(), '2:35 2D, 5:46 2D, 7:89 3D'],
 *   [moment(), '2:35 2D, 5:46 2D, 7:89 3D'],
 * ]
 * @param {Object} values The values from the form
 */
function enumerateShowtimeFields(values) {
  // get the start and end days of the date range
  let { 
    start_date,
    end_date,
    showtimes,
  } = values;

  if (!(start_date && end_date)) {
    return [];
  }

  // enumerate the days
  let dates = [];
  let currDate = start_date.clone();
  do {
    dates.push(currDate.clone());
  } while (currDate.add(1, 'days').diff(end_date) < 1);

  let i = 0;
  let j = 0;
  let fieldList = [];
  if (showtimes.length > 0) {
    // start date before current showtimes
    if (showtimes[0][0].diff(dates[0]) < 0) {
      // Move the cursor to the start of the dates
      while (showtimes[j][0].diff(dates[0]) < 0) {
        j += 1;
      }
    }

    // start date after current showtimes
    if (dates[0].diff(showtimes[0][0]) < 0) {
      // handle new dates before days that already exist
      while (dates[i].diff(showtimes[0][0]) < 0) {
        fieldList.push([dates[i], '']);
        i += 1;
      }
    }

    // handle currently existing dates
    while (i < dates.length && j < showtimes.length) {
      fieldList.push(showtimes[j]);
      i += 1;
      j += 1;
    }

    // handle new dates after days that already exist
    while (i < dates.length) {
      fieldList.push([dates[i], '']);
      i += 1;
    }
  } else {
    fieldList = dates.map(date => [date, '']);
  }

  return fieldList;
}

const styles = (theme) => ({
  bottomLine: {
    borderBottom: 'solid 1px #DDD',
  },
  dropzone: {
    alignItems: 'center',
    border: '4px dashed gray',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    padding: '16px 32px',
    width: '100%',
  },
  // publish: {
  //   backgrounColor: theme.palette.primary,
  // },
  iconLeft: {
    marginRight: theme.spacing(),
  },
});

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
            selected_movie: movies[0],
            initialValues: movies[0].value,
          });
        }
      },
      error => console.log(error),
    );
  }

  componentDidUpdate() {
    console.log('Updated', this.state);
  }

  handleNewMovie = () => {
    this.setState({
      selected_movie: blank_movie,
      initialValues: blank_movie.value,
    });
  }

  handleSubmit = (values, formikBag) => {
    console.log('data sent', values);

    if (values._id) {
      return MovieAPI.update(values)
        .then(
          (response) => {
            console.log(response);
            const movies = response.data;
            this.setState({
              movies,
              selected_movie: movies[0]
            })

            formikBag.setSubmitting(false);
          },
          (error) => {
            console.log(error);
            formikBag.setSubmitting(false);
          }
        );
    }

    return MovieAPI.create(values)
      .then(
        (response) => {
          console.log(response);
          const movies = response.data;
          this.setState({
            movies,
            selected_movie: movies[0]
          })

          formikBag.setSubmitting(false);
        },
        (error) => {
          console.log(error);
          formikBag.setSubmitting(false);
        }
      );

    // TODO: need save only and publish option
    // TODO: validate the input, yup is your friend!
  }

  render() {
    const { classes } = this.props;
    let movie = this.state.selected_movie.value;
    console.log(this.state.selected_movie);

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
        <Grid container spacing={2} className={classes.bottomLine}>
          <Grid item>
            <ReactSelect
              value={this.state.selected_movie}
              onChange={(option) => this.setState({ 
                selected_movie: option,
                initialValues: option.value,
              })}
              options={this.state.movies}
              className='form-group-auto'
            />
          </Grid>
          <Grid item>
            <Button
              color='secondary'
              variant='contained'
              onClick={this.handleNewMovie}
            >
              <AddIcon className={classes.iconLeft} />
              New Movie
            </Button>
          </Grid>
        </Grid>

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
            enableReinitialize
          >
            {({ values, errors, touched, setFieldValue}) => {
              console.log('VALUES', values);

              return (
                <Form>
                  <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                      <Grid container>
                        <Grid item xs={12}>
                          <TextField
                            name='title'
                            label='Movie Title'
                            style={{ width: '100%' }}
                          />
                        </Grid>
                      </Grid>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <TextField
                            name='runtime'
                            placeholder='ie. 2h 35m'
                            label='Runtime'
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Select
                            label='Rating'
                            name='rating'
                            options={['G', 'PG', 'PG-13', 'R', 'NC-17']}
                          />
                        </Grid>
                      </Grid>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <DatePicker 
                            label='Start Date'
                            name='start_date'
                            onChange={(date) => {
                              setFieldValue('start_date', date);
                              setFieldValue('showtimes', enumerateShowtimeFields({
                                start_date: values.start_date,
                                end_date: date,
                                showtimes: values.showtimes,
                              }));
                            }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <DatePicker 
                            label='End Date'
                            name='end_date'
                            onChange={(date) => {
                              setFieldValue('end_date', date);
                              setFieldValue('showtimes', enumerateShowtimeFields({
                                start_date: values.start_date,
                                end_date: date,
                                showtimes: values.showtimes,
                              }));
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Dropzone onDrop={(acceptedFiles) => {
                        const file = acceptedFiles[0];
                        let formData = new FormData();
                        formData.append('file', file);

                        axios.post(
                          `${config.api_path}/uploads`,
                          formData,
                          { 'Content-Type': file.type }
                        )
                          .then(
                            (response) => {
                              console.log(response);
                              setFieldValue('poster', file.name);
                            },
                            (error) => {
                              console.log(error)
                            }
                          )
                      }}>
                        {({ getRootProps, getInputProps }) => (
                          <div {...getRootProps()} className={classes.dropzone}>
                            <input {...getInputProps()} />
                            <PublishIcon className={classes.iconLeft} />
                            Drop or click to upload poster file
                          </div>
                        )}
                      </Dropzone>
                    </Grid>
                  </Grid>
                  <FormGroup>
                    <h3 style={{ marginTop: '16px', marginBottom: '16px' }}>Showtimes</h3>
                    {isEmpty(values.showtimes) ? (
                      <div>
                        Enter start and end dates (inclusive) to see showtimes
                      </div>
                    ) : null}
                    <FieldArray
                      name='showtimes' 
                      render={() => values.showtimes.map((showtime, i) => (
                        <TextField
                          key={showtime[0]}
                          name={`showtimes.${i}.1`}
                          label={moment(values.showtimes[i][0]).format('dddd MM/DD')}
                        />
                      )
                    )} />
                  </FormGroup>
                  <Button 
                    //className={classes.publish}
                    color='primary'
                    variant='contained'
                    type='submit'
                  >
                    Publish
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </AdminPage>
    );
  }
}

export default withStyles(styles)(Movies);