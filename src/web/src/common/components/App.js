import React from 'react';
import { Match, Redirect, Miss } from 'react-router';
import { Grid } from './Bootstrap';
import Header from './header/Index';
import { NoMatch } from './index';
import { VisibleConferences, VisibleDetailsIndex } from '../containers';

const GoToConferences = () => (
  <Redirect to="/page/1" />
);

const App = () => (
  <div>
    <Header />
    <Grid fluid>
      <Match pattern="/" exactly component={GoToConferences} />
      <Match pattern="/page/:current" component={VisibleConferences} />
      <Match pattern="/details/:slug" component={VisibleDetailsIndex} />
      <Miss component={NoMatch} />
    </Grid>
  </div>
);

export default App;
