const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');

const {parseTextFromHTML, seedVideoToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, disconnectDatabase} = require('../database-utilities');

const findVideoElementBySource = (htmlAsString, src) => {
  const video = jsdom(htmlAsString).querySelector(`iframe[src="${src}"]`);
  if (video !== null) {
    return video;
  } else {
    throw new Error(`Video with src "${src}" not found in HTML string`);
  }
};

describe('Server path: /videos/:id', () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(disconnectDatabase);

  // Write your test blocks below:
  describe('POST', () => {
    it('creates new and saves a new video', async () => {
      // Setup
      const video = await seedVideoToDatabase();
      
      // Exercise
      const response = await request(app)
        .get('/videos/' + video._id);

      // Verify
      assert.include(parseTextFromHTML(response.text, '.video-title'), video.title);
      assert.include(parseTextFromHTML(response.text, '.video-description'), video.description);      

      const videoElement = findVideoElementBySource(response.text, video.url);
      assert.equal(videoElement.src, video.url + '/');


    });

  });

});
