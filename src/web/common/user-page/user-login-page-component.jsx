import React from 'react';
import { PageLayout } from '../page-layout';
import { USER_PAGE_ROUTES } from './user-page-constants';
import './user-login-page.scss';

export default function UserLoginComponent() {
  return (
    <PageLayout pageName="user-login">
      <div className="login-screen">
        <a
          className="login-screen__service login-screen__service--github"
          href={USER_PAGE_ROUTES.GITHUB_AUTHORIZE}
        >Github</a>
      </div>
    </PageLayout>
  );
}
