import React, { Component } from 'react';

import ImporterComponent from './importer-component';

class ImporterContainer extends Component {
  importFile() {
    const reader = new FileReader();
    const loadHandler = ({ target }) => console.log(target.result);

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
