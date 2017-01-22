import React, { PropTypes } from 'react';
import { Modal } from 'semantic-ui-react';

function ModalContainerComponent(props) {
  if (!props.children) {
    return null;
  }

  return (
    <Modal trigger={true}>
      <Modal.Content>
        {props.children}
      </Modal.Content>
    </Modal>
  );
}

ModalContainerComponent.propTypes = {
children: PropTypes.element,
};

export default ModalContainerComponent;
