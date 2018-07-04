/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
         /* Tests make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('every feed has its URL defined and is not empty', function(){
            allFeeds.forEach(feed => {
                expect(feed.url).toBeTruthy(); // Equals to {expect(feed.url).toBeDefined(); expect(feed.url.length).not.toBe(0);}
            });
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('every feed has its name defined and is not empty', function(){
            allFeeds.forEach(feed => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    describe('The menu', function(){

        /* Test that ensures the menu element is
         * hidden by default.
         */
        it('the menu element is hidden by default', function(){
            expect(document.querySelector('body').classList.contains('menu-hidden')).toBe(true);
        });

         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * have two expectations: the menu display when
          * clicked and it hide when clicked again.
          */

        const isHidden = () => document.querySelector('body').classList.contains('menu-hidden');

        it('the menu changes visibility when the menu icon is clicked', function(){
            document.querySelector('.icon-list').click();
            expect(isHidden()).toBe(false);
            document.querySelector('.icon-list').click();
            expect(isHidden()).toBe(true);
        });
    }); 

    describe('Initial Entries', function(){
        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */

        beforeEach(function(done) {
            loadFeed(0, done)
        });

        it('after loadFeed() is called, there is at least 1 entry in .feed container', function(){
            expect(document.querySelectorAll('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    describe('New Feed Selection', function(){
        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */

        let prevUrl, newUrl;
        // Get the first entry's URL in `.feed` container.
        const getTheFirstUrl = () => document.querySelector('.feed .entry-link').href;

        beforeEach(function(done) {
            // Call .loadFeed() to retreive new entries, store the first entry's URL for further comparison.
            loadFeed(0, function () {
                prevUrl = getTheFirstUrl();
                // Then, call .loadFeed() again.
                loadFeed(1, function () {
                    newUrl = getTheFirstUrl();
                    done();
                });
            });
        });

        it('when a new feed is loaded by the loadFeed function that the content actually changes', function(){
            expect(newUrl).not.toEqual(prevUrl);
        });
    });
}());