import React from 'react';
import { Grid } from '../lib/bootstrap';
import { PageNavbarComponent } from '../page-navbar';

type propTypes = {
  pageName: string,
  children: ReactClass,
};

export default function PageLayoutWrapper(props: propTypes) {
  const { pageName, children } = props;

  return (
    <div className={pageName}>
      <Grid fluid>
        <header className="page-header">
          <PageNavbarComponent {...props} />
        </header>
        <main>
          {children}
        </main>
      </Grid>
    </div>
  );
}
