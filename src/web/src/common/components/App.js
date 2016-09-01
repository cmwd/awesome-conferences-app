import React from 'react';
import { Grid, Row, Col } from './Bootstrap';
import Header from './Header';
import { VisibleConferences } from '../containers';

const App = () => (
  <Grid fluid>
    <Row>
      <Col xs={12}>
        <Header />
      </Col>
    </Row>
    <VisibleConferences />
  </Grid>
);

export default App;
