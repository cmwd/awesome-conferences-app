const flow = require('lodash/fp/flow');
const { GLOBAL_CONFERENCE_NAME } = require('./constants');

const CONFERENCES_EXTRACTOR = /##.+?Conferences([\s\S]+?)##\sCall/;
const REGIONS_SPLITTER = /#{3}/g;
const SUBREGION_MATCHER = /#{4,}.+/g;
const REGION_NAME_MATCHER = /^([\w].+)/;
const DETAILS_MATCHER = /\*.\[(.+?)\]\((.+?)\).+\[@(.+)\]/g;

const getRegionName = data => {
  const result = data.match(REGION_NAME_MATCHER);

  return result ? result[0] : GLOBAL_CONFERENCE_NAME;
};

const extractConferences = (region, regionData) => {
  const result = [];
  let conf = DETAILS_MATCHER.exec(regionData);

  while (conf) {
    const [, name, url, twitterScreenName] = conf;

    result.push({ name, url, twitterScreenName, region });
    conf = DETAILS_MATCHER.exec(regionData);
  }

  return result;
};

const extractRegion = (conferences, res) => {
  const regionData = res.trim();
  const region = getRegionName(regionData);

  conferences.push(extractConferences(region, regionData));

  return conferences;
};

const matchBody = data => data.match(CONFERENCES_EXTRACTOR)[1];
const removeUnused = data => data.replace(SUBREGION_MATCHER, '');
const extractRagions = data => data.split(REGIONS_SPLITTER);
const extract = data => data.reduce(extractRegion, []);

module.exports = flow(matchBody, removeUnused, extractRagions, extract);
