import React, { PropTypes } from 'react';
import { Button, Header, Grid, Modal, Menu } from 'semantic-ui-react';

function ExporterComponent(props) {
  return (
    <Modal
      trigger={<Menu.Item name="Export" />}
      onOpen={props.handleOpen}
    >
      <Modal.Header>
        {props.fileName}
      </Modal.Header>
      <Modal.Content>
        <Grid>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <Button
                content={props.previeButtonContent}
                onClick={props.handlePreviewButton}
              />
              <Button
                content="Save"
                positive
                onClick={props.handleSave}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            {
              props.showPreview
                ? <pre>{props.result}</pre>
                : null
            }
          </Grid.Row>
        </Grid>
      </Modal.Content>
    </Modal>
  );
}

ExporterComponent.defaultProps = {
  result: '',
  fileName: '',
};

ExporterComponent.propTypes = {
  result: PropTypes.string.isRequired,
  previeButtonContent: PropTypes.string.isRequired,
  showPreview: PropTypes.bool.isRequired,
  fileName: PropTypes.string.isRequired,
  handleOpen: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  handlePreviewButton: PropTypes.func.isRequired,
};

export default ExporterComponent;

