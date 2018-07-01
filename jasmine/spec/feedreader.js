/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    // Update the time out parameter to accomondate different internet connection situations.
    let timeOutSpan = 2000;
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('every feed has its URL defined and is not empty', function(){
            allFeeds.forEach(feed => {
                expect(feed.url.length).not.toBe(0);
            });
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('every feed has its name defined and is not empty', function(){
            allFeeds.forEach(feed => {
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function(){

        beforeEach(function(done) {
            setTimeout(function() {
            done();
            }, 500);
        });

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('the menu element is hidden by default', function(){
            expect(document.querySelector('.menu-hidden')).toBeDefined();
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

        const isHidden = () => document.querySelector('body').className.includes('menu-hidden');

        let clickSimulator = callback => {
            // console.log('original:', callback())
            if(callback()){
                document.querySelector('.icon-list').click();
                // console.log('after clicked:', callback());
                return !callback();
            } else {
                document.querySelector('.icon-list').click();
                // console.log('after clicked:', callback());
                return callback();
            }
        }
        
        // Click the menu icon for 10 times.
        for (let i=0; i<10; i++){
            it(`the menu changes visibility when the menu icon is clicked - test case ${i+1}`, function(done){
                expect(clickSimulator(isHidden)).toBe(true);
                done();
            });
        }
    }); 

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function(){
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        // There is no need to empty the container since this function is already offered in loadFeed().
        beforeEach(function(done) {
            setTimeout(function() {
            done();
            }, timeOutSpan);  // Update the time out parameter to accomondate different internet connection situations.
        });

        // Interate the allFeeds
        for(let i=0; i<allFeeds.length; i++){
            it(`after loadFeed() is called, there is at least 1 entry in .feed container - test case ${i+1}`, function(done){
                loadFeed(i);
                expect(document.querySelector('.feed').children[0].className.includes('entry-link')).toBe(true);
                done();
            });
        }
    });


    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function(){
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        let previousFeedText;

        // There is no need to empty the container since this function is already offered in loadFeed().
        beforeEach(function(done) {
            previousFeedText = document.querySelector('.feed').innerText;
            setTimeout(function() {
            done();
            }, timeOutSpan);  // Update the time out parameter to accomondate different internet connection situations.
        });

        for(let i=0; i<allFeeds.length; i++){
            it(`when a new feed is loaded by the loadFeed function that the content actually changes - test case ${i+1}`, function(done){
                loadFeed(i);
                expect(document.querySelector('.feed').innerText).not.toEqual(previousFeedText);
                done();
            });
        }
    });
}());
