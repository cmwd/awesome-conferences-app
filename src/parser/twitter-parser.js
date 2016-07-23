const _ = require('lodash');
const LOCATION_MATCHER = /([\w\s]+),([\w\s]+)/;
const P_LOCATION = 'location';
const P_DESCRIPTION = 'description';
const P_BANNER = 'profile_banner_url';

const COLLECT = [
  P_DESCRIPTION,
  P_BANNER,
  P_LOCATION,
];

function locationParser(locationString) {
  const [, city, country] = locationString.match(LOCATION_MATCHER);
  return { city, country };
}

function collector(response) {
  return (result, key) => {
    const entry = {};
    let value = response[key];

    if (key === P_LOCATION) {
      value = locationParser(value);
    }

    entry[_.camelCase(key)] = value;

    return _.assign({}, result, entry);
  };
}

function responseParser(response) {
  return Object
    .keys(response)
    .filter(key => COLLECT.includes(key))
    .reduce(collector(response), {});
}

module.exports = { responseParser };
