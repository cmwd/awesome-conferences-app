import React from 'react';
import { Match, Redirect, Miss } from 'react-router';
import { Grid } from '../lib/bootstrap';
import {
  ConferencesList,
  ConferenceDetails,
  ConferenceEditor,
  CONFERENCE_ROUTES,
} from '../conference';
import { APP_ROUTES } from './app-constants';
import { UserLogin, USER_ROUTES } from '../user';
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
        component={ConferencesList}
      />
      <Match
        pattern={`${CONFERENCE_ROUTES.DETAILS}/:slug`}
        component={ConferenceDetails}
      />
      <Match
        pattern={`${CONFERENCE_ROUTES.ADMIN_PANEL}/:slug`}
        component={ConferenceEditor}
      />
      <Match pattern={USER_ROUTES.LOGIN} component={UserLogin} />
      <Miss component={NotFound} />
    </Grid>
  </div>
);

export default App;
