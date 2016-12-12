import React from 'react';
import { Container, Grid, Header } from 'semantic-ui-react';

import './page-header-component.css';

const BLOCK_NAME = 'page-header';


function PageHeader() {
  return (
    <header className={BLOCK_NAME}>
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Header as="h1" className={`${BLOCK_NAME}__header`}>
                <Header.Content>Awesome Conferences</Header.Content>
                <Header.Subheader>Conference Editor</Header.Subheader>
              </Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </header>
  );
}

export default PageHeader;
