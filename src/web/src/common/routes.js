import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import { App, NoMatch } from './components';
import { VisibleConferences } from './containers';

export default (
  <Route component={App}>
    <Redirect from="/" to="/page/1" />

    <Route path="/">
      <Route path="page/:current">
        <IndexRoute component={VisibleConferences} />
      </Route>
    </Route>

    <Route path="*" component={NoMatch} />
  </Route>
);
