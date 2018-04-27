// File path variables
var currDir = process.cwd();
var projectLib = currDir + '/lib';
var fullPageTestFunctions = require(projectLib + '/test-functions/fullPageTestFunctions');

// Cobird specific element selectors.
var dialogCloseButton = 'button.dialog__close-btn';

// Cobird specific functions.
function closeSignUpDialog(actions) {
    actions.click(dialogCloseButton);
    actions.wait(2000);
}

function captureAppRoot(pageName, urlPath, elementsToIgnore = [], beforeFunctions = [], captureFunctions = []) {
    gemini.suite(pageName + '-suite', (suite) => {
        suite
            .setUrl(urlPath)
            .setCaptureElements([
                'html'
            ])
            .before((actions, find) => {
                actions.executeJS(function(window) {
                    document.documentElement.style.height = 'auto';
                });
                actions.wait(1500);
            })
            .capture('initial', (actions, find) => {
    
            });
    });
}

var ignoreElements = [];
var beforeFns = [];
var captureFnsInitialLoad = [closeSignUpDialog];
var captureFnsAll = [];

var pages = [
    '/'
];

pages.forEach((page) => {
    // Set the suite name to the url path.
    // Since there is no additional path for homepage, set the suite name to 'index'
    let suiteName;
    let captureFns = captureFnsAll;
    if (page.slice(1).length === 0) {
        suiteName = 'index';
        // captureFns = captureFnsInitialLoad;  // Close the sign up dialog on the initial page load.
    } else {
        suiteName = page.slice(1);
        captureFns = captureFnsAll;
    }
    fullPageTestFunctions.captureFullpageHtmlElement('cobird-' + suiteName, page, ignoreElements, beforeFns, captureFns);
});
