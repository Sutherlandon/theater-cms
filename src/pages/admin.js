import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Movies from './subpages/admin/movies';

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
    <nav className="nav flex-column nav-pills">
      <a className="nav-link dropdown-toggle" href="#" data-toggle='dropdown' role='button'>Movies</a>
      <div className='dropdown-menu'>
        <a className='dropdown-item' href='#'>Sing</a>
        <a className='dropdown-item' href='#'>Star Wars</a>
        <a className='dropdown-item' href='#'>Passengers</a>
        <a className='dropdown-item' href='#'>Assassins Creed</a>
      </div>
      <a className="nav-link" href="#">About</a>
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
                <Route path='/' component={Movies} />
              </Switch>
            </BrowserRouter>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export { Admin };