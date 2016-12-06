import React from 'react';
import ContentEditableImpl from 'react-contenteditable';

const actionProxy = action => propName => event =>
  action({ [propName]: event.target.innerText });

function ContentEditable({ children, name, doneAction }) {
  return <ContentEditableImpl
    html={children}
    onBlur={actionProxy(doneAction)(name)}
  />
}

export default ContentEditable;
