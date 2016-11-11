/* @flow */

import React from 'react';
import { Table, Button } from '../../lib/bootstrap';

type PropTypes = {
  items: Array,
  onRemove: Function,
};

function YoutubeAddedVideos(props: PropTypes) {
  const { items = [], onRemove } = props;

  return (
    <Table condensed responsive hover striped>
      <tbody>
        { items.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>
              <span className="is-breakable">{item.title || item.videoId}</span>
            </td>
            <td>
              <Button
                className="pull-right"
                bsStyle="danger"
                onClick={() => onRemove(item)}
              >Remove</Button>
            </td>
          </tr>
        )) }
      </tbody>
    </Table>
  );
}

export default YoutubeAddedVideos;
