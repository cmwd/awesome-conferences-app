import React, { Component, PropTypes } from 'react';
import { uniqueId } from 'lodash';
import YAML from 'yamljs';

import ImporterComponent from './importer-component';

const parseToJSObject = fileContent => {
  const { conference, events } = YAML.parse(
    fileContent.substring(
      fileContent.indexOf('\n'),
      fileContent.lastIndexOf('\n')
    ));

  return {
    conference,
    events: events.map(event => ({
      ...event,
      uuid: event.uuid || uniqueId(`uuid-${Date.now()}-`),
      talks: event.talks.map(talk => ({
        ...talk,
        uuid: talk.uuid || uniqueId(`uuid-${Date.now()}-`),
      })),
    })),
  };
};

class ImporterContainer extends Component {
  static propTypes = {
    setData: PropTypes.func.isRequired,
  };

  importFile() {
    const reader = new FileReader();
    const loadHandler = ({ target }) =>
    this.props.setData(parseToJSObject(target.result));

    reader.addEventListener('load', loadHandler);
    reader.readAsText(this.file, 'utf-8');
  }

  handleFormSubmit = (event, form) => {
    event.preventDefault();
    this.importFile();
  }

  setFilesList = ({ target }) => {
    const [file] = target.files;
    this.file = file;
  }

  render() {
    return (
      <ImporterComponent
        handleFormSubmit={this.handleFormSubmit}
        setFilesList={this.setFilesList}
      />
    );
  }
}

export default ImporterContainer;
