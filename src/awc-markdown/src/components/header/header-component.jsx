import React, { PropTypes } from 'react';
import { Button } from 'semantic-ui-react';

function HeaderComponent(props) {
  return (
    <header>
      <Button
        content="download"
        onClick={(evt) => {
          evt.preventDefault();
          console.log(props.getState());
        }}
      />
    </header>
  );
}

HeaderComponent.propTypes = {
  getState: PropTypes.func.isRequired,
};

export default HeaderComponent;

