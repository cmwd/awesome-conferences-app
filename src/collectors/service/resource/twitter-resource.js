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


const reqHandler = (resolve, reject) =>
  (err, data) => {
    if (err) reject(err);
    else resolve(data);
  };

const handler = ({ query }) => {
  const { screenName } = query;

  if (!Array.isArray(screenName) || screenName.length > 100) {
    return Promise.reject(
      new Error(
        'Parameter screenName must be an array with less than 100 items'));
  }

  return new Promise((resolve, reject) => {
    client.get('users/lookup',
      {
        screen_name: screenName.join(','),
        include_entities: false,
      }, reqHandler(resolve, reject));
  });
};

module.exports = handler;
