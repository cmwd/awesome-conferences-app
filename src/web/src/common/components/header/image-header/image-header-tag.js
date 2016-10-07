import React from 'react';
import { Grid } from '../../Bootstrap';
import Navigation from '../navigation-bar';

type Props = {
  name: String,
  banner: String,
};

const ImageHeader = ({ name, banner } : Props) => (
  <div className="details-header">
    <Navigation />
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

export default ImageHeader;
