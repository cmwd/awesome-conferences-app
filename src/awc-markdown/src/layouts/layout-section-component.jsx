import React from 'react';
import { Container, Grid, Divider, Header } from 'semantic-ui-react';
import classNames from 'classnames';

import './layout-section-component.css';

const BLOCK_NAME = 'layout-section';

function DefaultWrapperComponent(props) {
  return (
    <section className={props.className}>{props.children}</section>
  );
}

function LayoutSection(props) {
  const { name, children, wrapper } = props;
  const WrapperComponent = wrapper || DefaultWrapperComponent;
  const wrapperClassNames = classNames({
    [BLOCK_NAME]: true,
    [`${BLOCK_NAME}--${name}`]: true,
  });

  return (
    <WrapperComponent className={wrapperClassNames}>
      <Container>
        <Grid textAlign="center">
          <Grid.Column width={14} textAlign="left">
            <Grid>
              {children}
            </Grid>
          </Grid.Column>
        </Grid>
      </Container>
    </WrapperComponent>
  );
}

export default LayoutSection;
