const {assert} = require('chai');
const {buildVideoObject} = require('../test-utils');

describe('User visits the create page', () => {
    describe('posts a new video', () => {
      it('and updates the title', () => {
        
        // Setup
        const videoToCreate = buildVideoObject();
        const updatedTitle = 'Updated Title';
      
        // Exercise
        browser.url('/videos/new');
        browser.setValue('#title-input', videoToCreate.title);
        browser.setValue('#description-input', videoToCreate.description);
        browser.setValue('#url-input', videoToCreate.url);
        browser.click('#submit-button');
        browser.click('#edit');
        browser.setValue('#title-input', updatedTitle);
        browser.click('#submit-button');
        
        // Verification
        assert.include(browser.getText('body'), updatedTitle);
      });
    });
});

