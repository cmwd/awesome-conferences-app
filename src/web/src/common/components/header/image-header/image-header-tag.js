import React from 'react';
import { Grid } from '../../Bootstrap';
import Navigation from '../navigation-bar';

type Props = {
  name: String,
  banner: String,
};

const ImageHeader = ({ name, banner } : Props) => (
  <div className="details-header">
    <div className="details-header__fixed-navbar">
      <Grid fluid>
        <Navigation />
      </Grid>
    </div>
    <div className="details-header__thumbnail">
      <div
        className="details-header__img"
        style={{ backgroundImage: `url(${banner})` }}
      />
    </div>
    <div className="details-header__meta" fluid>
      <Grid fluid>
        <h1 className="details-header__name">{name}</h1>
      </Grid>
    </div>
  </div>
);

export default ImageHeader;
