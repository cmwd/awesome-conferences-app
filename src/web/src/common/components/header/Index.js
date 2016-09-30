import React from 'react';
import { Match } from 'react-router';
import DetailsHeader from '../../containers/VisibleDetailsHeader';
import RegularHeader from './RegularHeader';

const Header = () => (
  <header>
    <Match
      pattern="/details/:slug"
      children={
        ({ matched, params }) =>
          matched ? (<DetailsHeader params={params} />) : (<RegularHeader />)
      }
    />
  </header>
);

export default Header;
