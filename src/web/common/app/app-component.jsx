import React from 'react';
import { Match, Redirect, Miss } from 'react-router';
import { APP_ROUTES } from './app-constants';
import { Admin, ADMIN_ROUTES } from '../admin';

import { ConferencesPage, CONFERENCES_PAGE_ROUTES } from '../conferences-page';
import {
  ConferenceDetailsPage,
  CONFERENCE_DETAILS_ROUTES,
} from '../conference-details-page';
import { NotFoundPage } from '../error-page';
import { UserLoginPage, USER_PAGE_ROUTES } from '../user-page';

const App = () => (
  <div>
    <Match
      exactly
      pattern={APP_ROUTES.HOME}
      component={() =>
        (<Redirect to={`${CONFERENCES_PAGE_ROUTES.LIST}/1`} />)}
    />
    <Match
      pattern={`${CONFERENCES_PAGE_ROUTES.LIST}/:current`}
      component={ConferencesPage}
    />
    <Match
      pattern={`${CONFERENCE_DETAILS_ROUTES.DETAILS}/:slug`}
      component={ConferenceDetailsPage}
    />
    <Match pattern={USER_PAGE_ROUTES.LOGIN} component={UserLoginPage} />
    <Match pattern={ADMIN_ROUTES.INDEX} component={Admin} />
    <Miss component={NotFoundPage} />
  </div>
);

export default App;
