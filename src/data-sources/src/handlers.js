const collector = require('./service/collector');

const C_COLLECT = 'CMD_COLLECT_DATA_SOURCE';
const S_GITHUB = 'SERVICE_GITHUB';
const S_TWITTER = 'SERVICE_TWITTER';

const M_USERS_SHOW = 'METHOD_USERS_SHOW';
const M_USERS_LOOKUP = 'METHOD_USERS_LOOKUP';

const success = (res) =>
  data => {
    res(null, data);
  };

const error = res =>
  err => {
    const status = 'ERROR';

    res(null, { status, error: err });
  };

function handlers() {
  this.add({ cmd: C_COLLECT, service: S_GITHUB }, (msg, res) => {
    collector
      .github()
      .catch(error(res))
      .then(success(res));
  });

  this.add({ cmd: C_COLLECT, service: S_TWITTER, method: M_USERS_SHOW },
    (msg, res) => {
      const { screen_name } = msg.params;

      collector.twitter
        .usersShow({ screen_name })
        .catch(error(res))
        .then(success(res));
    });

  this.add({ cmd: C_COLLECT, service: S_TWITTER, method: M_USERS_LOOKUP },
    (msg, res) => {
      const { screen_name } = msg.params;

      collector.twitter
        .usersLookup({ screen_name })
        .catch(error(res))
        .then(success(res));
    });
}

module.exports = handlers;
