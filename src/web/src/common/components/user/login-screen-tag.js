import React from 'react';
import { Match, Redirect } from 'react-router';
import { AUTH_GITHUB_ID } from '../../../../config';

const githubUrl =
  `https://github.com/login/oauth/authorize/?client_id=${AUTH_GITHUB_ID}`;

const RedirectOnServiceCallback = () => (<Redirect to="/" />);
const SignIn = () => (
  <div>
    <a href={githubUrl}>Github</a>
    <Match
      pattern="/user/signin/:service"
      component={RedirectOnServiceCallback}
    />
  </div>
);

export default SignIn;
