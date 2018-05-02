const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');
const Video = require('../../models/video');

const {parseTextFromHTML, seedVideoToDatabase, buildVideoObject} = require('../test-utils');
const {connectDatabaseAndDropData, disconnectDatabase} = require('../database-utilities');

describe('Server path: /videos/:videoId/updates', () => {
  
  beforeEach(connectDatabaseAndDropData);

  afterEach(disconnectDatabase);

  describe('PUT', () => {
    it('updates an existing video', async () => {
      
      // Setup
      const updatedTitle = 'Updated Title';
      const updatedDescription = 'Updated Description';
      const updatedVideoUrl = 'http://example.com';

      const videoToUpdate = await seedVideoToDatabase();
      const newVideo = buildVideoObject();
      
      // Exercise
      newVideo.title = updatedTitle;
      newVideo.description = updatedDescription;
      newVideo.url = updatedVideoUrl;
        
      const responseUpdate = await request(app)
        .post('/videos/' + videoToUpdate._id + '/updates')
        .type('form')
        .send(newVideo);

      // Verify
      const updatedVideo = await Video.findById(videoToUpdate._id);
            
      assert.equal(updatedVideo.title, updatedTitle);
      assert.equal(updatedVideo.description, updatedDescription);
      assert.equal(updatedVideo.url, updatedVideoUrl);
    });


    it('updates an existing video and redirects to show detail page', async () => {
      // Setup
      const updatedTitle = 'Updated Title';
      const updatedDescription = 'Updated Description';
      const updatedVideoUrl = 'http://example.com';

      const videoToUpdate = await seedVideoToDatabase();
      const newVideo = buildVideoObject();
      
      // Exercise
      newVideo.title = updatedTitle;
      newVideo.description = updatedDescription;
      newVideo.url = updatedVideoUrl;
        
      const response = await request(app)
        .post('/videos/' + videoToUpdate._id + '/updates')
        .type('form')
        .send(newVideo);

      // Verify
      assert.equal(response.status, 302);
    });

  });

});
