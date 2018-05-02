const {assert} = require('chai');
const {buildVideoObject} = require('../test-utils');

describe('User deleting video', () => {
    describe('removes the Video from the list', () => {
      it('and is removed', () => {
        // Setup
        const videoToCreate = buildVideoObject();
        
        // Exercise
        browser.url('/videos/new');
        browser.setValue('#title-input', videoToCreate.title);
        browser.setValue('#description-input', videoToCreate.description);
        browser.setValue('#url-input', videoToCreate.url);
        browser.click('#submit-button');
        browser.click('#delete');

        // Verification
        assert.equal(browser.getText('#videos-container'), '');
      });
    });
});
