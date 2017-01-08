import React, { PropTypes } from 'react';
import { Form, Modal, Menu } from 'semantic-ui-react';

function ImporterComponent(props) {
  return (
    <Modal trigger={<Menu.Item name="import" />}>
      <Modal.Header children="Import data from markdown file" />
      <Modal.Content>
        <Form onSubmit={props.handleFormSubmit}>
          <Form.Input
            name="filePath"
            type="file"
            onChange={props.setFilesList}
          />
          <Form.Button>Import</Form.Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
}

ImporterComponent.propTypes = {
  handleFormSubmit: PropTypes.func.isRequired,
};

export default ImporterComponent;

