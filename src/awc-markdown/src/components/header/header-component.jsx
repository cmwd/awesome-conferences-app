import React, { PropTypes } from 'react';
import { Button } from 'semantic-ui-react';

function HeaderComponent(props) {
  return (
    <header>
      <Button
        content="reset"
        icon="refresh"
        color="green"
        size="mini"
        onClick={(evt) => {
          evt.preventDefault();
          props.resetState();
        }}
      />
    </header>
  );
}

HeaderComponent.propTypes = {
  getState: PropTypes.func.isRequired,
  resetState: PropTypes.func.isRequired,
};

export default HeaderComponent;

