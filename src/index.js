import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import { Admin, Home } from './pages';
import theme from './theme';

ReactDOM.render((
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/admin' component={Admin}/>
      </Switch>
    </BrowserRouter>
  </ThemeProvider>
), document.getElementById("root"));
