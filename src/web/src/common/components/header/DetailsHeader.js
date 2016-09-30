import React from 'react';
import { Grid } from '../Bootstrap';

const Header = ({ name, banner }) => (
  <div className="details-header">
    <div className="details-header__thumbnail">
      <div
        className="details-header__img"
        style={{ backgroundImage: `url(${banner})` }}
      />
    </div>
    <Grid className="details-header__meta" fluid>
      <h1 className="details-header__name">{name}</h1>
    </Grid>
  </div>
);

export default Header;
