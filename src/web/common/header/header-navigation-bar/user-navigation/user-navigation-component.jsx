import React from 'react';
import { Link } from 'react-router';
import { USER_ROUTES } from '../../../user';
import './user-navigation.scss';

type User = {
  loggedIn: Boolean,
  name: String,
};

type Props = {
  user: User,
};

const UserMenu = ({ name } : User) => (
  <div className="user-navigation">
    <span className="user-navigation__user-name">{name}</span>
    <a href={USER_ROUTES.LOGOUT}>Logout</a>
  </div>
);

const UserNavigation = (user : Props) => (
  <div className="user-navigation">
    {
      user.loggedIn
        ? <UserMenu {...user} />
        : <Link to={USER_ROUTES.LOGIN}>Login</Link>
    }
  </div>
);

export default UserNavigation;
