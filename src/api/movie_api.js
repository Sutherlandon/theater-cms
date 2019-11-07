import axios from 'axios';
import config from './config';

class MovieAPI {
  static get() {
    return axios({
      method: 'get',
      url: `${config.api_path}/movies`,
    });
  }

  static create(data) {
    console.log('create data', data);

    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));

    console.log('Form Data', formData);

    return axios({
      method: 'post',
      url: `${config.api_path}/movies`,
      headers: { 'Content-Type': 'multipart/form-data'},
      data: formData,
    });
  }

  static update(data) {
    return axios({
      method: 'put',
      url: `${config.api_path}/movies`,
      // headers: { 'Content-Type': 'multipart/form-data'},
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