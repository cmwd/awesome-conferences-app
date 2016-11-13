import React from 'react';
import { Redirect } from 'react-router';
import { USER_ROUTES } from '../user';

function TemporaryIndex() {
  return (
    <div>Hello from the admin</div>
  );
}

export default function AdminComponent({ user }) {
  let redirectRoute = null;

  if (!user.loggedIn) {
    redirectRoute = USER_ROUTES.LOGIN;
  } else if (!user.admin) {
    redirectRoute = '/';
  }

  return redirectRoute
    ? (<Redirect to={redirectRoute} />)
    : (<TemporaryIndex />);
}
