import React from 'react';
import moment from 'moment';

import AdminPage from './layout/admin_page';
import UserAPI from '../api/user_api';

class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    }
  }

  componentDidMount() {
    UserAPI.get().then(
      (result) => {
        console.log(result);
        this.setState({
          users: result.data.map(({username, meta}) => ({
            username,
            created: moment(meta.created).format("MM/DD/YYYY")
          })),
        });
      },
      error => console.log(error),
    );
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    return (
      <AdminPage title='Users'>
        <table className='table table-bordered table-striped'>
          <thead>
            <tr>
              <th>Username</th>
              <th>Roles</th>
              <th>created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((user) => {
              return (
                <tr key={user.username}>
                  <td>{user.username}</td>
                  <td>user, admin</td>
                  <td>{user.created}</td>
                  <td>Reset Password | Remove</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </AdminPage>
    );
  }
}

export default Users;

