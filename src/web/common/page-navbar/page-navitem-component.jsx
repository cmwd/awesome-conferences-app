/* @flow */

import React from 'react';
import { Link } from 'react-router';

type propTypes = {
  to: string,
  children: ReactClass,
  role?: string,
};

export default function PageNavitem(props: propTypes) {
  const { to, children, role = 'button' } = props;

  return (
    <li role="presentation">
      <Link to={to} role={role}>{children}</Link>
    </li>
  );
}
