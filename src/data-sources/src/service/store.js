const _ = require('lodash');
const {
  ConferenceModel,
  RegionModel,
  LocationModel } = require('../model/index');

const pickRegions = conferences =>
  conferences.map(([{ region }]) => ({ name: region }));

const attachRegion = region =>
  conferences => conferences.map(info =>
    Object.assign({}, info, { region: [region] }));


function list(conferences) {
  return new Promise((resolve, reject) => {
    RegionModel
      .create(pickRegions(conferences))
      .catch(err => reject(err))
      .then(regions => {
        const result = [];

        regions.forEach((model, index) => {
          const data = attachRegion(model)(conferences[index]);
          result.push(ConferenceModel.create(data));
        });

        return Promise.all(result)
          .then(resolve)
          .catch(reject);
      });
  });
}

function getLocationModel(params) {
  return LocationModel
    .findOne(params)
    .then((model) => model || new LocationModel(params).save());
}

function twitter({ twitterScreenName, result }) {
  return new Promise((resolve, reject) => {
    const steps = [];
    let data = result;

    if (!_.isEmpty(result.location)) {
      const step = getLocationModel(result.location)
        .then(model => {
          data = _.assign({}, data, { location: [model] });
        })
        .catch(err => reject(err));

      steps.push(step);
    }

    Promise.all(steps)
      .then(() => {
        ConferenceModel
          .update({ twitterScreenName }, data)
          .catch(err => reject(err))
          .then(resolve);
      })
      .catch(err => reject(err));
  });
}

module.exports = { list, twitter };
