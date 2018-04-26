// File path variables
var currDir = process.cwd();
var runnerLib = currDir + '/lib/test-functions';
// Required modules
var fullPageTestRunner = require(runnerLib + '/fullPageTestFunctions');
var util = require(currDir + '/lib/util/utility-helpers');

// Cobird specific element selectors.
var dialogCloseButton = 'button.dialog__close-btn';
var header = 'section.site-header';
// Cobird specific functions.
function closeSignUpDialog(actions) {
    actions.click(dialogCloseButton);
    actions.wait(2000);
}

function hideHeader(actions) {
    actions.executeJS(function(window) {
        let header = window.document.querySelector('body header:nth-child(1)');
        header.style.visibility = 'hidden';
    });
    actions.wait(1000);
}

var ignoreElements = [];
var beforeFns = [util.hideHeaderElement];
var captureFnsInitialLoad = [closeSignUpDialog];
var captureFnsAll = [];

var pages = [
    '/'
];

pages.forEach((page) => {
    let suiteName = (page.slice(1).length === 0 ? 'index' : page.slice(1));
    if (page.slice(1).length === 0) {
        suiteName = 'index';
        captureFns = captureFnsInitialLoad;
    } else {
        suiteName = page.slice(1);
        captureFns = captureFnsAll;
    }
    fullPageTestRunner.runFullPageScreenshot('cobird-' + suiteName, page, ignoreElements, beforeFns, captureFns);
});
