import React, { Component, PropTypes } from 'react';
import { snakeCase } from 'lodash';
import YAML from 'yamljs';

import ExporterComponent from './exporter-component';

class ExporterContainer extends Component {
  static propTypes = {
    getData: PropTypes.func.isRequired,
  };

  state = {
    showPreview: false,
  };

  serialize = () => {
    const data = this.props.getData();
    const fileName = `${snakeCase(data.conference.name)}.md`;
    const result = [
      '```yaml',
      YAML.stringify(data, 5, 2),
      '```',
    ].join('\n');

    this.setState({ result, fileName });
  };

  save = () => {
    const { result, fileName } = this.state;
    const anchor = document.createElement('a');
    const file = new Blob([result], { type: 'text/plain' });

    anchor.href = URL.createObjectURL(file);
    anchor.download = fileName;
    anchor.onclick = () => document.body.removeChild(anchor);
    document.body.appendChild(anchor);
    anchor.click();
  };

  togglePreview = () => {
    this.setState(state => ({ showPreview: !state.showPreview }));
  };

  render() {
    const previeButtonContent = this.state.showPreview
      ? 'Hide preview' : 'Show preview';

    return (
      <ExporterComponent
        {...this.state}
        previeButtonContent={previeButtonContent}
        handleOpen={this.serialize}
        handleSave={this.save}
        handlePreviewButton={this.togglePreview}
      />
    );
  }
}

export default ExporterContainer;

