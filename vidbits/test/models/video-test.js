const Video = require('../../models/video');
const {assert} = require('chai');

describe('Model: Video', () => {
  
  describe('#title', () => {
    it('is a String', () => {
      const titleAsNonString = 1;
      const video = new Video({title: titleAsNonString});
      assert.strictEqual(video.title, titleAsNonString.toString());
    });
    it('is required', () => {
      const video = new Video({});
      video.validateSync();
      assert.equal(video.errors.title.message, 'a Title is required.');      
    });
  });

  describe('#description', () => {
    it('is a String', () => {
      const descriptionAsNonString = 1;
      const video = new Video({description: descriptionAsNonString});
      assert.strictEqual(video.description, descriptionAsNonString.toString());
    });
    it('is required', () => {
      const video = new Video({});
      video.validateSync();
      assert.equal(video.errors.description.message, 'a Description is required.');      
    });
  });

  describe('#url', () => {
    it('is a String', () => {
      const urlAsNonString = 1;
      const video = new Video({url: urlAsNonString});
      assert.strictEqual(video.url, urlAsNonString.toString());
    });
    it('is required', () => {
      const video = new Video({});
      video.validateSync();
      assert.equal(video.errors.url.message, 'a URL is required.');      
    });
  });

});
