const { conferenceModel, regionModel } = require('../model/index');

const pickRegions = conferences =>
  conferences.map(([{ region }]) => ({ name: region }));

const attachRegion = region =>
  conferences => conferences.map(info => Object.assign({}, info, { region }));

function list(conferences) {
  return new Promise((resolve, reject) => {
    regionModel
      .create(pickRegions(conferences))
      .catch(err => reject(err))
      .then(regions => {
        const result = [];

        regions.forEach((model, index) => {
          const data = attachRegion(model)(conferences[index]);
          result.push(conferenceModel.create(data));
        });

        return Promise.all(result).then(resolve).catch(reject);
      });
  });
}

module.exports = { list };
