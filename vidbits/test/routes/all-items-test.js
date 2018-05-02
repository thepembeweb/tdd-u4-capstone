const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');

const {parseTextFromHTML, seedVideoToDatabase } = require('../test-utils');
const {connectDatabaseAndDropData, disconnectDatabase} = require('../database-utilities');

const findVideoElementBySource = (htmlAsString, src) => {
  const video = jsdom(htmlAsString).querySelector(`iframe[src="${src}"]`);
  if (video !== null) {
    return video;
  } else {
    throw new Error(`Video with src "${src}" not found in HTML string`);
  }
};

describe('Server path: /', () => {

  beforeEach(connectDatabaseAndDropData);

  afterEach(disconnectDatabase);

  describe('GET', () => {
    it('renders a video with a title and video', async () => {
      // Setup
      const video = await seedVideoToDatabase();
      
      // Exercise
      const response = await request(app)
        .get('/videos');

      // Verify
      assert.include(parseTextFromHTML(response.text, '.video-title'), video.title);
      const videoElement = findVideoElementBySource(response.text, video.url);
      
      assert.equal(videoElement.src, video.url + '/');
    });

    it('renders all videos from the database', async () => {
      // Setup
      const firstVideo = await seedVideoToDatabase({title: 'Video1'});
      const secondVideo = await seedVideoToDatabase({title: 'Video2'});
      
      // Exercise
      const response = await request(app)
        .get('/videos');

      // Verify
      assert.include(parseTextFromHTML(response.text, `#video-${firstVideo._id} .video-title`), firstVideo.title);
      assert.include(parseTextFromHTML(response.text, `#video-${secondVideo._id} .video-title`), secondVideo.title);
    });
  });
});
