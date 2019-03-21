import React from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import Movies from './movies';
import Users from './users';

function Header() {
  return (
    <header style={{'height': 'auto'}}>
      <nav className="gradient-overlay">
        <h1>Theater CMS Admin</h1>
      </nav>
    </header>
  )
}

function Menu() {
  return (
    <nav className="nav flex-column">
      <a className="nav-link" href="/admin">Movies</a>
      <a className="nav-link" href="#">About</a>
      <a className="nav-link" href="#">Users</a>
      <style>{`
        .nav-link {
          color: whitesmoke;
          border-bottom: solid 1px #555;
          border-radius: 0px;
        }
        .nav-link:hover {
          color: #212529;
          background-color: whitesmoke;
        }
      `}</style>
    </nav>
  )
}

class Admin extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <div className='row no-gutters' style={{'minHeight': '100%'}}>
          <div className='col col-2'>
            <Menu />
          </div>
          <div className='col'>
            <BrowserRouter>
              <Switch>
                <Route path='/admin/movies' component={Movies} />
                <Route path='/admin/users' component={Users} />
                <Redirect to='/admin/movies' />
              </Switch>
            </BrowserRouter>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export { Admin };