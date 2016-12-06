import React from 'react';
import { Container, Header } from 'semantic-ui-react';

import { ContentEditable } from 'components';
import ConferenceAvatar from './conference-avatar-component';

const actionProxy = action => prop => event =>
  action({ [prop]: event.target.innerText });

function SectionHeader(props) {
  const { conference, updateConferenceInfo } = props;

  return (
    <div>
      <Container>
        <Header as="h1" block>
          <ConferenceAvatar {...props} />
          <Header.Content>
            <ContentEditable name="name" doneAction={updateConferenceInfo} >
              {conference.name}
            </ContentEditable>
          </Header.Content>
        </Header>
      </Container>
      <Container text>
        <ContentEditable name="description" doneAction={updateConferenceInfo} >
          {conference.description}
        </ContentEditable>
      </Container>
    </div>
  );
}

export default SectionHeader;
