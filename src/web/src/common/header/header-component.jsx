import React from 'react';
import { Match } from 'react-router';
import HeaderBackgroundImage from './header-background-image';
import HeaderRegular from './header-regular';
import HeaderNavigationBar from './header-navigation-bar';
import { CONFERENCE_ROUTES } from '../conference';

type PropsTypes = {
  matched: Boolean,
};

const Header = (props) => {
  const navigation = <HeaderNavigationBar {...props} />;
  return (
    <header>
      <Match
        pattern={`${CONFERENCE_ROUTES.DETAILS}/:slug`}
        children={
          (props: PropsTypes) =>
            props.matched
              ? <HeaderBackgroundImage {...props} navigation={navigation} />
              : <HeaderRegular {...props} navigation={navigation} />
        }
      />
    </header>
  );
};

export default Header;
