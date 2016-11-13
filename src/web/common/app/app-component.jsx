import React from 'react';
import { Match, Redirect, Miss } from 'react-router';
import { Grid } from '../lib/bootstrap';
import { ConferenceDetails, CONFERENCE_ROUTES } from '../conference';
import { APP_ROUTES } from './app-constants';
import { UserLogin, USER_ROUTES } from '../user';
import { Admin, ADMIN_ROUTES } from '../admin';
import HomePage from '../home-page';
/**
 * TODO: Check why './header' path is failing in prod env.
 */
import Header from '../header/header-component';
import NotFound from '../not-found';

const GoToConferences = () => (
  <Redirect to={`${CONFERENCE_ROUTES.LIST}/1`} />
);

const App = () => (
  <div>
    <Header />
    <Grid fluid>
      <Match
        exactly
        pattern={APP_ROUTES.HOME}
        component={GoToConferences}
      />
      <Match
        pattern={`${CONFERENCE_ROUTES.LIST}/:current`}
        component={HomePage}
      />
      <Match
        pattern={`${CONFERENCE_ROUTES.DETAILS}/:slug`}
        component={ConferenceDetails}
      />
      <Match pattern={USER_ROUTES.LOGIN} component={UserLogin} />
      <Match pattern={ADMIN_ROUTES.INDEX} component={Admin} />
      <Miss component={NotFound} />
    </Grid>
  </div>
);

export default App;
