import React from 'react';
import { Grid } from '../Bootstrap';
import PageHeader from 'react-bootstrap/lib/PageHeader';

const Header = () => (
  <Grid fluid>
    <PageHeader>
      Awesome Conferences <small>app</small>
    </PageHeader>
  </Grid>
);

export default Header;
