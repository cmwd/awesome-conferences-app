import React from 'react';
import { Match, Redirect, Miss } from 'react-router';
import { Grid } from './Bootstrap';
/**
 * TODO: Check why './header' path is failing in prod env.
 */
import Header from './header/header-tag';
import { NoMatch } from './index';
import { LoginScreen } from './user';
import { VisibleConferences, VisibleDetailsIndex } from '../containers';
import { APP, USER, CONFERENCES } from '../constants/routes';

const GoToConferences = () => (
  <Redirect to={`${CONFERENCES.PAGE}/1`} />
);

const App = () => (
  <div>
    <Header />
    <Grid fluid>
      <Match pattern={APP.HOME} exactly component={GoToConferences} />
      <Match
        pattern={`${CONFERENCES.PAGE}/:current`}
        component={VisibleConferences}
      />
      <Match
        pattern={`${CONFERENCES.DETAILS}/:slug`}
        component={VisibleDetailsIndex}
      />
      <Match pattern={USER.LOGIN} component={LoginScreen} />
      <Miss component={NoMatch} />
    </Grid>
  </div>
);

export default App;
