import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Admin } from './pages/admin';
import { Home } from './pages/home';

ReactDOM.render((
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/admin' component={Admin}/>
    </Switch>
  </BrowserRouter>
), document.getElementById("root"));
