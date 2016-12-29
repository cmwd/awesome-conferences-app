import React from 'react';
import { Button } from 'semantic-ui-react';

import { serialize } from 'store';
import markdownSerializer from 'markdown-serializer';

function Header(props) {
  return (
    <header>
      <Button
        content="download"
        onClick={(evt) => {
          evt.preventDefault();
          console.log(markdownSerializer(serialize()));
        }}
      />
    </header>
  );
}

export default Header;

