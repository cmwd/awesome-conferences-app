import React from 'react';
import { Image } from 'semantic-ui-react';

function ConferenceAvatar(props) {
  const { twitterId, name } = props.conference;

  return !twitterId
    ? null
    : (
      <Image
        shape="circular" avatar
        src={`https://twitter.com/${twitterId}/profile_image?size=bigger`}
      />
    );
}

export default ConferenceAvatar;
