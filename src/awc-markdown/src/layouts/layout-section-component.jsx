import React from 'react';
import { Container, Grid, Divider, Header } from 'semantic-ui-react';

function DefaultWrapperComponent(props) {
  return (
    <section className={props.className}>{props.children}</section>
  );
}

function LayoutSection({ name, header, children, wrapper }) {
  const WrapperComponent = wrapper || DefaultWrapperComponent;

  return (
    <WrapperComponent className={`section-${name}`}>
      <Container>
        <Header as="h4" content={header} />
        <Grid>
          {children}
        </Grid>
        <Divider section />
      </Container>
    </WrapperComponent>
  );
}

export default LayoutSection;
