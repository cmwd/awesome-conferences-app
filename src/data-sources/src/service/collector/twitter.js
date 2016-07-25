const _ = require('lodash');
const Twitter = require('twitter');
const { process } = require('global');

const {
  TWITTER_CONSUMER_KEY: consumer_key,
  TWITTER_CONSUMER_SECRET: consumer_secret,
  TWITTER_ACCESS_TOKEN_KEY: access_token_key,
  TWITTER_ACCESS_TOKEN_SECRET: access_token_secret,
} = process.env;

const client = new Twitter({
  consumer_key,
  consumer_secret,
  access_token_key,
  access_token_secret,
});

const handler = (resolve, reject) =>
  (err, data) => {
    if (err) reject(err);
    else resolve(data);
  };

function usersLookup({ screen_name }) {
  if (!_.isArray(screen_name)) {
    throw new Error('argument screen_name must be type of array');
  }

  return Promise.all(_.chunk(screen_name, 99)
    .map(chunk => new Promise((resolve, reject) => {
      const sn = chunk.join();

      client.get('users/lookup', { screen_name: sn }, handler(resolve, reject));
    })));
}

module.exports = { usersLookup };
