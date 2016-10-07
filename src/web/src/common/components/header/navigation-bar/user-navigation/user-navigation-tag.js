import React from 'react';
import { Link } from 'react-router';
import { USER } from '../../../../constants/routes';

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
    <a href={USER.LOGOUT}>Logout</a>
  </div>
);

const UserNavigation = ({ user } : Props) => (
  <div className="user-navigation">
    {
      user.loggedIn
        ? <UserMenu {...user} />
        : <Link to={USER.LOGIN}>Login</Link>
    }
  </div>
);

export default UserNavigation;
