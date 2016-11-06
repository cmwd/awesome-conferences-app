import React from 'react';
import { Grid } from '../../lib/bootstrap';

type PropsTypes = {
  navigation: Object,
};
const HeaderRegular = ({ navigation }: PropsTypes) => (
  <Grid fluid>
    <div>{navigation}</div>
  </Grid>
);

export default HeaderRegular;
