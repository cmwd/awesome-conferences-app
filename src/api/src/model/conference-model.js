const mongoose = require('mongoose');
const urlSlugs = require('mongoose-url-slugs');
const co = require('co');
const _ = require('lodash');
const resourceModel = require('./resource-model');
const videoModel = require('./video-model');

const { TWITTER, AWESOMELIST, YOUTUBE } = resourceModel.TYPE;
const { Schema } = mongoose;
const schema = new Schema({
  name: { type: String, index: { unique: true, dropDups: true } },
  details: Schema.Types.Mixed,
  videos: Schema.Types.Mixed,
});

schema.plugin(urlSlugs('name', { field: 'slug' }));

function getYoutubeVideos(data) {
  const consumerFn = (result, current) => {
    result.push({
      id: current.id,
      thumbnails: _.get(current, 'snippet.thumbnails'),
      title: _.get(current, 'snippet.title'),
      description: _.get(current, 'snippet.description'),
      channelId: _.get(current, 'snippet.channelId'),
      publishedAt: _.get(current, 'snippet.publishedAt'),
      channelTitle: _.get(current, 'snippet.channelTitle'),
      kind: _.get(current, 'snippet.resourceId.kind'),
      videoId: _.get(current, 'snippet.resourceId.videoId'),

    });

    return result;
  };
  return data
    ? data.reduce(consumerFn, [])
    : null;
}

function serializeResources(resources, conference) {
  const models =
    (conferenceResources =>
      ([
        conferenceResources.find(({ resourceName }) =>
          resourceName === TWITTER),

        conferenceResources.find(({ resourceName }) =>
          resourceName === AWESOMELIST),

        conferenceResources.find(({ resourceName }) =>
          resourceName === YOUTUBE),
      ]))(
    resources.filter(({ conferenceId }) =>
      conferenceId.toHexString() === conference.id));
  const [twitter, awc, youtube] = models;
  const details = {
    url: _.get(awc, 'data.url', null),
    description: _.get(twitter, 'data.description', null),
    banner: _.get(twitter, 'data.profile_banner_url', null),
    location: _.get(twitter, 'data.location', null),
    twitterId: _.get(twitter, 'data.screen_name', null)
      || _.get(awc, 'data.twitterId', null),
    resources: models
      .filter(r => typeof r !== 'undefined')
      .map(resource => resource.resourceName),
  };
  const youtubeVideos = getYoutubeVideos(_.get(youtube, 'data', null));

  return { details, youtubeVideos };
}

const statics = {
  updateDetails: co.wrap(function *updateDetails(conferences) {
    const resources = yield resourceModel.find({
      conferenceId: {
        $in: conferences.map(({ id }) => id),
      },
    });
    const updatingProcess = conferences.reduce((result, current) => {
      const {
        details,
        youtubeVideos,
      } = serializeResources(resources, current);

      result.push(
        current.update(
          { $set: { details } },
          { upsert: true, new: true }
        ));

      if (youtubeVideos) {
        youtubeVideos.forEach((data) => {
          const conferenceId = current.id;
          const resourceName = YOUTUBE;
          const resourceId = data.id;

          result.push(
            videoModel.update(
              { conferenceId, resourceName, resourceId },
              { $set: { conferenceId, resourceName, resourceId, data } },
              { upsert: true, new: true }
            ));
        });
      }

      return result;
    }, []);

    return Promise.all(updatingProcess);
  }),
};

Object.assign(schema.statics, statics);
const conferenceModel = mongoose.model('Conference', schema);

module.exports = conferenceModel;
