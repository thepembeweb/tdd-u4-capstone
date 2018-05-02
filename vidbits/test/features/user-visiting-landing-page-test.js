const {assert} = require('chai');
const {buildVideoObject} = require('../test-utils');

describe('User visits landing page', () => {

  describe('without existing videos', () => {
    it('starts blank', () => {
      browser.url('/');
      assert.equal(browser.getText('#videos-container'), '');
    });
  });
  
  describe('can navigate', () => {
    it('to the create page', () => {
      // Setup
      browser.url('/');

      // Exercise
      browser.click('a[href="/videos/new"]');

      // Verification
      assert.include(browser.getText('body'), 'Save a video');
    });
  });

  describe('with existing video', () => {
    it('and is rendered', () => {
        
      // Setup
      const videoToCreate = buildVideoObject();
      
      // Exercise
      browser.url('/videos/new');
      browser.setValue('#title-input', videoToCreate.title);
      browser.setValue('#description-input', videoToCreate.description);
      browser.setValue('#url-input', videoToCreate.url);
      browser.click('#submit-button');

      // Verification
      assert.include(browser.getText('body'), videoToCreate.title);
      assert.include(browser.getAttribute('body iframe', 'src'), videoToCreate.url);      
    });
    it('can navigate to a video', () => {
       // Setup
       const videoToCreate = buildVideoObject();
       browser.url('/videos/new');

       // Exercise
       browser.setValue('#title-input', videoToCreate.title);
       browser.setValue('#description-input', videoToCreate.description);
       browser.setValue('#url-input', videoToCreate.url);
       browser.click('#submit-button');
       
       // Verification
       assert.include(browser.getAttribute('body iframe', 'src'), videoToCreate.url);
    });

    it('can navigate to the show page when a user clicks on the title', () => {
      // Setup
      const videoToCreate = buildVideoObject();
      browser.url('/videos/new');
      
      // Exercise
      browser.setValue('#title-input', videoToCreate.title);
      browser.setValue('#description-input', videoToCreate.description);
      browser.setValue('#url-input', videoToCreate.url);
      browser.click('#submit-button');
      browser.url('/');
      browser.click('a.video-link');
      
      // Verification
      assert.include(browser.getAttribute('body iframe', 'src'), videoToCreate.url);
   });

  });
  
});

