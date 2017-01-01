import { pad, omit } from 'lodash';

const OFFSET_LENGTH = 4;

const talkTableHeaders = {
  speaker: 'speaker',
  title: 'talk_title',
  twitterId: 'speaker_twitter_id',
  email: 'speaker_email',
  video: 'talk_video',
  slides: 'talk_slides',
  uuid: '',
};

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
          ...items.map(props => props[key].length)) + OFFSET_LENGTH,
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
    description.name,
    `${pad('', description.name.length, '=')}`,
    '',
    '### Description',
    description.description,
    '',
    '```yaml',
    `   conference_email: ${description.email}`,
    `   conference_web: ${description.url}`,
    `   conference_facebook: ${description.facebookId}`,
    `   conference_twitter: ${description.twitterId}`,
    '```',
    '',
    '### Events',
    '',
    events
      .map(event => [
        '',
        '```yaml',
        `   event_name: ${event.name}`,
        `   event_date_start: ${event.startDate}`,
        `   event_date_end: ${event.endDate}`,
        '```',
        '',
        renderTable(event.talks, talkTableHeaders)
      ].join('\n'))
      .join('\n')
  ];

  return markdown.join('\n').trim();
}

