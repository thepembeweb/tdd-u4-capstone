
const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');
const Video = require('../../models/video');

const {parseTextFromHTML, seedVideoToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, disconnectDatabase} = require('../database-utilities');

describe('Server path: /videos/:id/deletions', () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(disconnectDatabase);

  // Write your test blocks below:
  describe('DELETE', () => {
    it('creates new video and deletes the video', async () => {
      // Setup
      const deletedVideoResult = null;
      
      const video = await seedVideoToDatabase();

      // Exercise
      const response = await request(app)
        .delete('/videos/' + video._id + '/deletions');

      // Verify
      const deletedVideo = await Video.findById(video._id);
      assert.equal(deletedVideo, deletedVideoResult);  
    });

  });

});
