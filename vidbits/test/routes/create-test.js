const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');
const Video = require('../../models/video');

const {parseTextFromHTML, buildVideoObject } = require('../test-utils');
const {connectDatabaseAndDropData, disconnectDatabase } = require('../database-utilities');

// generate random video URL
const generateRandomUrl = (domain) => {
  return `http://${domain}/${Math.random()}`;
};
// find element by src
const findVideoElementBySource = (htmlAsString, src) => {
  const video = jsdom(htmlAsString).querySelector(`iframe[src="${src}"]`);
  if (video !== null) {
    return video;
  } else {
    throw new Error(`Video with src "${src}" not found in HTML string`);
  }
};

describe('Server path: /videos/new', () => {
  const videoToCreate = buildVideoObject();

  beforeEach(connectDatabaseAndDropData);

  afterEach(disconnectDatabase);

  describe('GET', () => {
    it('renders empty input fields', async () => {
      // Setup
      
      // Exercise
      const response = await request(app)
        .get('/videos/new');
 
      // Verify
      assert.equal(parseTextFromHTML(response.text, 'input#title-input'), '');
      assert.equal(parseTextFromHTML(response.text, 'textarea#description-input'), '');
      assert.equal(parseTextFromHTML(response.text, 'input#url-input'), '');
 
    });
  });

  describe('POST', () => {
    it('creates and saves a new video', async () => {
      const videoToCreate = buildVideoObject();
      
      // Exercise
      const response = await request(app)
        .post('/videos/new')
        .type('form')
        .send(videoToCreate);
      const createdVideo = await Video.findOne(videoToCreate);
      // Verify
      assert.isOk(createdVideo, 'Video was not created successfully in the database');
    });
    
    it('redirects home', async () => {
      const videoToCreate = buildVideoObject();
      
      // Exercise
      const response = await request(app)
        .post('/videos/new')
        .type('form')
        .send(videoToCreate);

      // Verify
      assert.equal(response.status, 302);
    });
    
    it('displays an error message when supplied an empty title', async () => {
      const videoUrl = generateRandomUrl('example.com');
      const invalidVideoToCreate = {
        description: 'test',
        url: videoUrl
      };
      
      // Exercise
      const response = await request(app)
        .post('/videos/new')
        .type('form')
        .send(invalidVideoToCreate);
      const allVideos = await Video.find({});
      // Verify
      assert.equal(allVideos.length, 0);
      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    });
    it('displays an error message when supplied an empty description', async () => {
      const videoUrl = generateRandomUrl('example.com');
      const invalidVideoToCreate = {
        title: 'test',
        url: videoUrl
      };
      
      // Exercise
      const response = await request(app)
        .post('/videos/new')
        .type('form')
        .send(invalidVideoToCreate);
      const allVideos = await Video.find({});
      
      // Verify
      assert.equal(allVideos.length, 0);
      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    });
    it('displays an error message when supplied an empty url', async () => {
      const invalidVideoToCreate = {
        title: 'test',
        description: 'test'
      };
      
      // Exercise
      const response = await request(app)
        .post('/videos/new')
        .type('form')
        .send(invalidVideoToCreate);
      const allVideos = await Video.find({});
      
      // Verify
      assert.equal(allVideos.length, 0);
      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    });
  });

});
