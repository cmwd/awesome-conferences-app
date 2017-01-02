import { pad, omit } from 'lodash';
import EventTalkComponent from 'components/event-talk/event-talk-component';

const OFFSET_LENGTH = 2;

const talkTableHeaders = Object
  .keys(EventTalkComponent.defaultProps)
  .reduce((result, key) => ({ ...result, [key]: key }), {});

const createYamlObject = props => {
  const data = Object
    .keys(props)
    .map(key => `${pad('', OFFSET_LENGTH, ' ')}${key}: '${props[key]}'`)
    .join('\n');

  return ['```yaml', '---', data, '```'].join('\n');
}

const renderTable = (itemsRaw, header) => {
  if (!itemsRaw || !itemsRaw.length) {
    return '';
  }

  let items = [...itemsRaw];

  if (header) {
    items = [
      Object
        .keys(items[0])
        .reduce(
          (result, key) =>
            ({ ...result, [key]: header[key] }), {}),
      ...items
    ];
  }

  const longest = Object
    .keys(items[0])
    .reduce(
      (result, key) => ({
        ...result,
        [key]: Math.max(
          ...items.map(props => (props[key] || '').length)) + OFFSET_LENGTH,
      }), {});

  const paddedItems = items
    .map(props => Object
      .keys(props)
      .reduce(
        (result, key) => ({
          ...result,
          [key]: pad(props[key], longest[key])
        }), {}));

  const lineWidth = Object
    .values(longest)
    .reduce((res, prop) => res + prop, 0) - OFFSET_LENGTH + 1;

  const line = pad('', lineWidth, '-');

  return paddedItems
    .map((props, index) => {
      const values = Object.values(omit(props, ['uuid']));
      const row = ['', ...values, ''].join('|');
      const lineBreak = index === 0 && header
        ? ['', ...values.map(key => pad('', key.length, '-')), ''].join('|')
        : undefined;

      return row + (lineBreak ? `\n${lineBreak}` : '');
    })
    .join('\n');
};

export default function markdownSerializer({ description, events  }) {
  const markdown = [
    `# ${description.conference_name}`,
    '',
    createYamlObject(description),
    '',
    '## Events',
    '',
    events
      .map(event => [
        createYamlObject(omit(event, ['talks', 'uuid'])),
        '',
        renderTable(event.talks, talkTableHeaders),
        '',
        '',
      ].join('\n'))
      .join('\n')
  ];

  return markdown.join('\n').trim();
}

