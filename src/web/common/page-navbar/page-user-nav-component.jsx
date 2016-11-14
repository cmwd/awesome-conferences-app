import React from 'react';
import Navitem from './page-navitem-component';
import { USER_PAGE_ROUTES } from '../user-page';
import { NavDropdown, MenuItem } from '../lib/bootstrap';

function UserDropdown(props) {
  const { user } = props;

  return (
    <NavDropdown title={user.name} id="page-user-nav-dropdown">
      <Navitem to={USER_PAGE_ROUTES.LOGOUT} role="menuitem">Logout</Navitem>
    </NavDropdown>
  );
}

export default function PageUserNav(props) {
  const { user } = props;

  return user.loggedIn
    ? <UserDropdown user={user} />
    : <Navitem to={USER_PAGE_ROUTES.LOGIN}>Login</Navitem>;
}
