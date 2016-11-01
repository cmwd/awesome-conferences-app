import React from 'react';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  InputGroup,
  Button,
} from '../../lib/bootstrap';

const isValidItem = ({ videoId }) => videoId.length > 3;

const extractValueFromEvent = (
  { currentTarget: { value: videoId } }
) => ({ videoId });

const onChange = next => event => next(extractValueFromEvent(event));

const onEnter = next => (event) => {
  const item = extractValueFromEvent(event);

  if (event.keyCode === 13) {
    event.preventDefault();
    event.stopPropagation();

    if (isValidItem(item)) {
      next(item);
    }
  }
};

const YoutubeForm = ({ onAdd, onUpdate, videoId }) => (
  <FormGroup>
    <ControlLabel>YouTube video id</ControlLabel>
    <InputGroup>
      <FormControl
        value={videoId}
        type="text"
        onChange={onChange(onUpdate)}
        onKeyDown={onEnter(onAdd)}
        placeholder="enter video id"
      />
      <InputGroup.Button>
        <Button
          bsStyle="success"
          disabled={!isValidItem({ videoId })}
          type="button"
          onClick={() => onAdd({ videoId })}
        >Add</Button>
      </InputGroup.Button>
    </InputGroup>
  </FormGroup>
);

export default YoutubeForm;
