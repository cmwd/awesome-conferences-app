import React from 'react';
import { Grid } from '../../lib/bootstrap';

type DetailsTypes = {
  name: String,
  banner: String,
};

type PropsTypes = {
  details: DetailsTypes,
  navigation: () => Object,
};

const HeaderBackgroundImage = ({ details = {}, navigation } : PropsTypes) => (
  <div className="details-header">
    <div className="details-header__fixed-navbar">
      <Grid fluid>{navigation}</Grid>
    </div>
    <div className="details-header__thumbnail">
      <div
        className="details-header__img"
        style={{ backgroundImage: `url(${details.banner})` }}
      />
    </div>
    <div className="details-header__meta">
      <Grid fluid>
        <h1 className="details-header__name">{details.name}</h1>
      </Grid>
    </div>
  </div>
);

export default HeaderBackgroundImage;
