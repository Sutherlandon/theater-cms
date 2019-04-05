import axios from 'axios';
import config from './config';

class UserAPI {
  static get() {
    return axios({
      method: 'get',
      url: `${config.api_path}/users`,
    });
  }
}

export default UserAPI;