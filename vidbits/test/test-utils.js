const {jsdom} = require('jsdom');

const Video = require('../models/video');

// Create and return a sample Video object
const buildVideoObject = (options = {}) => { 
  const title = 'My new video';
  const url = 'http://example.com';
  const description = 'Just a new video';
  return {title, url, description};
};

// Add a sample Video object to mongodb
const seedVideoToDatabase = async (options = {}) => {
  const video = await Video.create(buildVideoObject(options));
  return video;
};

// extract text from an Element by selector.
const parseTextFromHTML = (htmlAsString, selector) => {
  const selectedElement = jsdom(htmlAsString).querySelector(selector);
  if (selectedElement !== null) {
    return selectedElement.textContent;
  } else {
    throw new Error(`No element with selector ${selector} found in HTML string`);
  }
};

// generate random video URL
const generateRandomUrl = (domain) => {
  return `http://${domain}/${Math.random()}`;
};


module.exports = {
  buildVideoObject,
  seedVideoToDatabase,
  parseTextFromHTML,
};
