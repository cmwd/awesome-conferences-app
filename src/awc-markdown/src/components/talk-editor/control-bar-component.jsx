import React from 'react';
import { Button, Form, Grid, Checkbox, Icon } from 'semantic-ui-react';

function DestroyCheckbox(props) {
  if (!props.editMode) {
    return null;
  }

  return (
    <Form.Field>
      <Checkbox
        toggle
        label="Remove"
        name="destroy"
        checked={props.destroy}
        onChange={props.onCheckboxChange}
      />
    </Form.Field>
  );
}

function SubmitButton(props) {
  const icon = props.destroy ? 'remove' : 'checkmark';
  const label =
    (props.destroy && 'Destroy') ||
    (props.editMode && 'Update') ||
    'Save';
  const attrs = {
    [props.destroy ? 'negative' : 'positive']: true,
    icon: true,
    type: 'submit',
  };

  return (
    <Button {...attrs}>
      <Icon name={icon} /> {label}
    </Button>
  );
}

export default function (props) {
  return (
    <Grid.Row textAlign="right">
      <Grid.Column width="3">
        <DestroyCheckbox {...props} />
      </Grid.Column>
      <Grid.Column width="13">
        <Button.Group size="mini">
          <SubmitButton {...props} />
          <Button.Or />
          <Button type="reset" icon>
            <Icon name="remove" /> Cancel
          </Button>
        </Button.Group>
      </Grid.Column>
    </Grid.Row>
  );
}
