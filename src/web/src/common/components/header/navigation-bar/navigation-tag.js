import React from 'react';
import { Link } from 'react-router';
import UserNavigation from './user-navigation/user-navigation-container';
import { Col, Row } from '../../Bootstrap';

const Navigation = () => (
  <nav className="navigation">
    <Row>
      <Col xs={6}>
        <Link to="/">Home</Link>
      </Col>
      <Col xs={6}>
        <UserNavigation />
      </Col>
    </Row>
  </nav>
);

export default Navigation;
