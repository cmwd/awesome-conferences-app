const { responseParser } = require('../../parser/twitter-parser');
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

function twitter({ twitterScreenName }) {
  return new Promise((resolve, reject) => {
    client
      .get('users/show', { screen_name: twitterScreenName }, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(responseParser(data));
        }
      });
  });
}

module.exports = twitter;
