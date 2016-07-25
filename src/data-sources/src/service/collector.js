const _ = require('lodash');
const github = require('./collector/github');
const twitter = require('./collector/twitter');

function appendTwitterData(conferences) {
  const ids = conferences.map(({ twitterId }) => twitterId);
  const mergeFn = (result, twitterData) => {
    const { screen_name: twitterId } = twitterData;
    const entry = _.find(conferences, { twitterId });

    return result.concat(
      _.assign({}, _.omit(entry, 'twitterId'), { twitterData }));
  };

  return twitter
    .usersLookup({ screen_name: ids })
    .then(data => _.concat(...data).reduce(mergeFn, []));
}

function awesomeList() {
  return github
    .awesomeList()
    .then(appendTwitterData);
}

module.exports = { awesomeList };
