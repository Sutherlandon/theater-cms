import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function Header() {
  return (
    <header style={{'height': 'auto'}}>
      <nav className="gradient-overlay">
        <h1>Theater CMS Admin</h1>
      </nav>
    </header>
  )
}

/*
<!-- Menu toggle -->
<a href="#menu" id="menuLink" class="menu-link">
    <!-- Hamburger icon -->
    <span></span>
</a>
*/

function Menu() {
  return (
    <div id="menu" className='pure-u-1-6'>
        <div className="pure-menu">
            <a className="pure-menu-heading" href="#">Company</a>

            <ul className="pure-menu-list">
                <li className="pure-menu-item">
                  <a href="#" className="pure-menu-link">Home</a>
                </li>
                <li className="pure-menu-item">
                  <a href="#" className="pure-menu-link">About</a>
                </li>

                <li className="pure-menu-item menu-item-divided pure-menu-selected">
                    <a href="#" className="pure-menu-link">Services</a>
                </li>

                <li class="pure-menu-item"><a href="#" class="pure-menu-link">Contact</a></li>
            </ul>
        </div>
    </div>
  )
}

function Movies() {
  const movies_styles = {
    'background-color': 'whitesmoke',
    'box-sizing': 'border-box',
    'height': '100%',
    'padding': '1em'
  }

  return (
    <div className='pure-u-5-6' style={movies_styles}>
      <div className='page-title'>
        <h2>
          Here is a list of Movies
        </h2>
      </div>
      <div className='content'>
        Here is a list of Movies
      </div>
    </div>
  )
}

export function Admin(props) {
  return (
    <React.Fragment>
      <Header />
      <div className='pure-g' style={{'height': '100%'}}>
        <Menu />
        <BrowserRouter>
          <Switch>
            <Route path='/' component={Movies}/>
          </Switch>
        </BrowserRouter>
      </div>
    </React.Fragment>
  )
}
