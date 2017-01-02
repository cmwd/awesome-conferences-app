const REGEX_CONFERENCE_NAME = /^#{1}\s?(\w+)/gm;
const REGEX_YAML_PART = /`{3}yaml([\s\S]+?)`{3}/g;
const REGEX_YAML_CLEAR = /(```yaml|```)/g;

const extractYAML = text => {
  const [yamlRaw] = text.match(REGEX_YAML_PART);

  return yamlRaw
    .replace(REGEX_YAML_CLEAR, '')
    .split('\n')
    .reduce((result, line) => {
      const [prop, value = ''] = line.split(':');

      if (!prop.length) {
        return result;
      }

      return {
        ...result,
        [prop.trim()]: value.trim()
      };
    }, {});
};

function parseDescription(descriptionRaw) {
  const [name] = descriptionRaw.match(REGEX_CONFERENCE_NAME);
  console.log(extractYAML(descriptionRaw));
}

function markdowParser(markdown = '') {
  const [descriptionRaw, eventsRaw] = markdown.split('## Events');
  const description = parseDescription(descriptionRaw);

  return '[description]';
}

export default markdowParser;
