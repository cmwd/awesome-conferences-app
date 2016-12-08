import React from 'react';
import { Item } from 'semantic-ui-react';

function Talk(props) {
  console.log(props);

  const avatarUrl = props.twitterId.length > 0
    ? `https://twitter.com/${props.twitterId}/profile_image?size=bigger`
    : 'http://semantic-ui.com/images/avatar/small/elliot.jpg';

  return (
    <Item>
      <Item.Image size="tiny" src={avatarUrl} />

      <Item.Content>
        <Item.Header>{props.title}</Item.Header>
        <Item.Description>
          <Item.Header as="h4">{props.speaker}</Item.Header>
        </Item.Description>

        <Item.Extra>
          
        </Item.Extra>
      </Item.Content>

    </Item>
  );
}

export default Talk;
