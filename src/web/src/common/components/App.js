import React from 'react';
import { Grid, Row, Col } from './Bootstrap';
import Header from './Header';

const App = ({ children }) => (
  <Grid fluid>
    <Row>
      <Col xs={12}>
        <Header />
      </Col>
    </Row>
    {children}
  </Grid>
);

export default App;
