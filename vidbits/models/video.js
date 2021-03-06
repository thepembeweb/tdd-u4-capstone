const {mongoose} = require('../database');

const Video = mongoose.model(
  'Video',
  mongoose.Schema({
    title: {
      type: String,
      required: [true, 'a Title is required.']
    },
    description: {
      type: String,
      required: [true, 'a Description is required.']
    },
    url: {
      type: String,
      required: [true, 'a URL is required.']
    },
  })
);

module.exports = Video;
