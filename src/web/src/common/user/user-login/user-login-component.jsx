import React from 'react';
import { USER_ROUTES } from '../user-constants';

const SignIn = () => (
  <div className="login-screen">
    <a
      className="login-screen__service login-screen__service--github"
      href={USER_ROUTES.GITHUB_AUTHORIZE}
    >Github</a>
  </div>
);

export default SignIn;
