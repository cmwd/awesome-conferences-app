import React from 'react';
import { AUTH_GITHUB_ID } from '../../../../config';

const githubUrl =
  `https://github.com/login/oauth/authorize/?client_id=${AUTH_GITHUB_ID}`;

const SignIn = () => (
  <div className="login-screen">
    <a
      className="login-screen__service login-screen__service--github"
      href={githubUrl}
    >Github</a>
  </div>
);

export default SignIn;
