/**
 * Visual regression test for Spiritu.
 * 
 */

/**
 * Landing page main sections.
 */
let sectionIds = [
    'js-section-one',
    'js-section-two',
    'js-section-three',
    'js-section-four',
    // 'js-section-five', // Section five has been removed, hidden
    'js-section-six'
]

/**
 * Function to run gemini testing suite on main landing page sections.
 * @param {String} sectionId 
 */
function captureSection(sectionId) {
    gemini.suite(sectionId, function(suite) {
        suite
            .setUrl('/')
            .setCaptureElements('#' + sectionId)
            .before(function(actions, find) {
                actions.wait(5000);
            })
            .capture('loaded', function(actions, find) {
                actions.wait(5000);
            });
    });
}

// /**
//  * Suite to capture the initial intro view, which afterwards, fades into the landing page content.
//  */
// gemini.suite('fade-intro', function(suite) {
//     suite
//         .setUrl('/')
//         .setCaptureElements('#js-section-one')
//         .setTolerance(20)
//         .capture('intro', function(actions, find) {
//         });
// });

/**
 * Run tests on main sections.
 */
sectionIds.forEach((id) => {
    captureSection(id);
})

/**
 * Run test on the footer section.
 */
gemini.suite('footer', function(suite) {
    suite
        .setUrl('/')
        .setCaptureElements('.footer')
        .before(function(actions, find) {
            actions.wait(5000);
        })
        .capture('loaded', function(actions, find) {
            actions.wait(5000);
        });
});