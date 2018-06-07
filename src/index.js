import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-scroll'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Admin } from './components/admin.jsx';
import { Home } from './components/home.jsx';

ReactDOM.render((
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/admin' component={Admin}/>
    </Switch>
  </BrowserRouter>
), document.getElementById("root"));
