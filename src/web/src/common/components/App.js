import React from 'react';
import { Match, Redirect, Miss } from 'react-router';
import { Grid, Row, Col } from './Bootstrap';
import { Header, NoMatch } from './index';
import { VisibleConferences, VisibleDetailsIndex } from '../containers';

const GoToConferences = () => (
  <Redirect to="/page/1" />
);

const App = () => (
  <Grid fluid>
    <Row>
      <Col xs={12}>
        <Header />
      </Col>
    </Row>
    <Match pattern="/" exactly component={GoToConferences} />
    <Match pattern="/page/:current" component={VisibleConferences} />
    <Match pattern="/details/:conferenceId" component={VisibleDetailsIndex} />
    <Miss component={NoMatch} />
  </Grid>
);

export default App;
