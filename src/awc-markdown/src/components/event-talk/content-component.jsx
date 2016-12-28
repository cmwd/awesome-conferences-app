import React, { PropTypes } from 'react';
import { Input } from 'semantic-ui-react';

function ContentComponent(props) {
  return props.inputMode
    ? (<Input {...props} value={props.content} />)
    : (<span className={props.className} children={props.content} />);
}

ContentComponent.defaultProps = {
  content: ''
};

ContentComponent.propTypes = {
  content: PropTypes.string,
  inputMode: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

export default ContentComponent;

