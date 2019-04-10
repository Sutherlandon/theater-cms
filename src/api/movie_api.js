import axios from 'axios';
import config from './config';

class MovieAPI {
  static get() {
    return axios({
      method: 'get',
      url: `${config.api_path}/movies`,
    });
  }

  static create() {
    return axios({
      method: 'post',
      url: `${config.api_path}/movies`,
    });
  }

  static update(data) {
    return axios({
      method: 'put',
      url: `${config.api_path}/movies`,
      data,
    });
  }

  static remove(id) {
    return axios({
      method: 'delete',
      url: `${config.api_path}/movies`,
      data: { 
        id,
      },
    });
  }
}

export default MovieAPI;