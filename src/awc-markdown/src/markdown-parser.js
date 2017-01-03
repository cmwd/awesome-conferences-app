import yaml from 'js-yaml';
import DescriptionPanelComponent
  from './components/description-panel/description-panel-component';

const REGEXP_YAML_PART = /`{3}yaml([\s\S]+?)`{3}/g;
const REGEXP_YAML_CLEAR = /(```yaml|```)/g;

const extractYAML = text => {
  const [yamlRaw] = text.match(REGEXP_YAML_PART);

  return yaml.safeLoad(yamlRaw.replace(REGEXP_YAML_CLEAR, ''));
};

function markdowParser(markdown = '') {
  const [descriptionRaw, eventsRaw] = markdown.split('## Events');
  const description = extractYAML(descriptionRaw);

  console.log(description);
  console.log(eventsRaw);
  return '[description]';
}

export default markdowParser;
