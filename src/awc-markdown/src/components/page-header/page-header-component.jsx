import React from 'react';
import { Container, Grid, Header, Divider } from 'semantic-ui-react';

function PageHeader() {
  return (
    <header>
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width="16">
              <Header as="h1">
                <Header.Content>Awesome Conferences</Header.Content>
                <Header.Subheader>Conference Editor</Header.Subheader>
              </Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider section />
      </Container>
    </header>
  );
}

export default PageHeader;
