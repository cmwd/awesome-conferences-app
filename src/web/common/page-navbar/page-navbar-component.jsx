import React from 'react';
import Navitem from './page-navitem-component';
import UserNav from './page-user-nav-component';
import { Navbar, Nav } from '../lib/bootstrap';
import { CONFERENCES_PAGE_ROUTES } from '../conferences-page';

export default function PageNavbarComponent(props) {
  const { user } = props;

  return (
    <Navbar fluid>
      <Nav bsStyle="pills">
        <Navitem to={`${CONFERENCES_PAGE_ROUTES.LIST}/1`}>Home</Navitem>
      </Nav>
      <Nav pullRight>
        <UserNav user={user} />
      </Nav>
    </Navbar>
  );
}
