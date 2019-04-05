import React from 'react';
import Select from 'react-select';

import AdminPage from './layout/admin_page';
import MovieForm from '../components/movie_form';
import MovieAPI from '../api/movie_api'

class Movies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      selected_movie: {},
    }
  }

  componentDidMount() {
    MovieAPI.get()
      .then((result) => {
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
          <div className='col col-xs-10 col-xl-3'>
            <Select
              value={this.state.selected_movie}
              onChange={(option) => this.setState({ selected_movie: option })}
              options={this.state.movies}
              className='form-group-auto'
            />
          </div>
          <div className='col col-xs-2 col-xl-3 pl-0'>
            <button type='submit' className='btn btn-primary'>
              New Movie
            </button>
          </div>
        </div>
        {movie
          ? <MovieForm
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
