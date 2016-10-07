import React from 'react';
import { Match } from 'react-router';
import ImageHeader from './image-header/image-header-container';
import RegularHeader from './regular-header/regular-header-tag';
import { CONFERENCES } from '../../constants/routes';

const Header = () => (
  <header>
    <Match
      pattern={`${CONFERENCES.DETAILS}/:slug`}
      children={
        ({ matched, params }) =>
          matched ? (<ImageHeader params={params} />) : (<RegularHeader />)
      }
    />
  </header>
);

export default Header;
