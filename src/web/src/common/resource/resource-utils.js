export const denormalizeYoutubeVideo = (
  { data: { title, videoId } }
) => ({ title, videoId });
