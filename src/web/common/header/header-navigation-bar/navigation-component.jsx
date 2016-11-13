import React from 'react';
import { Link } from 'react-router';
import UserNavigation from './user-navigation';
import './header-navigation-bar.scss';

const Navigation = () => (
  <nav className="navigation">
    <div className="navigation__group">
      <Link to="/">Home</Link>
    </div>
    <div className="navigation__group">
      <UserNavigation />
    </div>
  </nav>
);

export default Navigation;
