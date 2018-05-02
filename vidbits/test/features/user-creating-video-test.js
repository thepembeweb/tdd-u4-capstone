const {assert} = require('chai');
const {buildVideoObject} = require('../test-utils');

describe('User visits the create page', () => {
    describe('posts a new video', () => {
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
    });
});

