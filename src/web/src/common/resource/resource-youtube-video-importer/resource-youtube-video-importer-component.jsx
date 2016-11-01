import React from 'react';
import YoutubeForm from './resource-youtube-form-component';
import AddedVideos from './resource-youtube-added-videos-component';
import { Button } from '../../lib/bootstrap';

const YoutubeVideoImporter = (
  { items, onRemove, onSubmit, conferenceId,  ...props }
) => (
  <form
    onSubmit={
      (event) => {
        event.preventDefault();
        event.stopPropagation();
        onSubmit({ conferenceId, items });
      }
    }
  >
    <YoutubeForm {...props} />
    <AddedVideos
      items={items}
      onRemove={onRemove}
    />
    <Button
      bsStyle="success"
      type="submit"
    >Save</Button>
  </form>
);

export default YoutubeVideoImporter;
