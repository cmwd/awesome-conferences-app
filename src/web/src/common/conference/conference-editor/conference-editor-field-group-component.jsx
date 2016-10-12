import React from 'react';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
} from '../../lib/bootstrap';

type FieldGroupProps = {
  id: String,
  label: String,
  restore: () => void,
  save: () => void,
};

const FieldGroup = (
  { id, label, restore, save, ...props }: FieldGroupProps
) => (
  <FormGroup id={id}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl {...props} />
    {
      restore
        ? <Button type="reset" onClick={restore}>Restore</Button>
        : null
    }
    {
      save
        ? <Button type="submit" onClick={save}>Save</Button>
        : null
    }
  </FormGroup>
);

export default FieldGroup;
