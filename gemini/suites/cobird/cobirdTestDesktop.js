// File path variables
var currDir = process.cwd();
var projectLib = currDir + '/lib';
var util = require(projectLib + '/util/utility-helpers');
var fullPageTestFunctions = require(projectLib + '/test-functions/fullPageTestFunctions');

// Cobird specific element selectors.
var triggerDialogModal = 'ngx-smart-modal.prompt-modal div.overlay';
var triggerDialogModalCloseButton = 'button.dialog__close-btn';
//      Nav elements
var musicNav = 'a[routerlink="/music"]';
var styleNav = 'a[routerlink="/style"]';
var cultureNav = 'a[routerlink="/culture"]';
var videoNav = 'a[routerlink="/video"]';
var collectionsNav = 'a[routerlink="/collections"]';
var feedNav = 'a[routerlink="/feed"]';
var liveNav = 'a[routerlink="/live"]';
var shopNav = 'a[routerlink="/shop"]';

var mainpages = [
    musicNav,
    styleNav,
    cultureNav,
    videoNav,
    collectionsNav,
    feedNav,
    liveNav,
    shopNav
];

// Cobird specific functions.
function closeSignUpDialog(actions) {
    actions.click(dialogCloseButton);
    actions.wait(2000);
}

function returnCaptureCallsForNavigationClicks(suite, navItemsToClick) {

}

function captureFullpageByNavigation(siteName, urlPath, navItemsToClick, elementsToIgnore = [], beforeFunctions = []) {

    gemini.suite(siteName + '-suite', (suite) => {
        suite
            .setUrl(urlPath)
            .setCaptureElements([
                'html'
            ])
            .ignoreElements(elementsToIgnore)
            .before((actions, find) => {
                util.waitForReadyStateComplete(actions);
                // Execute functions passed in the beforeFunctions array if any.
                if (beforeFunctions.length > 0) {
                    beforeFunctions.forEach(function(currFn) {
                        if (typeof currFn === 'function') currFn(actions, find);
                        actions.wait(1500);
                    });
                }
                // If height is set to 100%, gemini capture will only capture what's within the bounds of the viewport.
                actions.executeJS(function(window) {
                    document.documentElement.style.height = 'auto';
                });
                actions.wait(1500);
            })
            .capture('initial-load-modal-fullpage', (actions, find) => {
                // Wait 15 seconds for pop dialog, then close it.
                actions.waitForElementToShow(triggerDialogModal, 15000);
                actions.wait(1000);
            })
            .capture('home-fullpage', (actions, find) => {
                // Close modal dialog.
                actions.click(triggerDialogModalCloseButton);
                actions.wait(1000);
            });

            // Click through all navigation elements defined in navItemsToClick and capture the page.
            navItemsToClick.forEach((navItem) => {
                let captureName = navItem.match(/[\S]+\/([\S]+)"]/); // Get the name of the link from the css selector.
                suite.capture(captureName[1] + '-fullpage', (actions, find) => {
                    actions.click(navItem);
                    actions.wait(2000);
                });
            })

    });
}

captureFullpageByNavigation('cobird', '/', mainpages);

/*** COMMENT OUT UNTIL FIX LOCATION PROVIDER ISSUE IS FIXED ***/
// var ignoreElements = [];
// var beforeFns = [];
// var captureFnsInitialLoad = [closeSignUpDialog];
// var captureFnsAll = [];

// var pages = [
//     '/'
// ];

// pages.forEach((page) => {
//     // Set the suite name to the url path.
//     // Since there is no additional path for homepage, set the suite name to 'index'
//     let suiteName;
//     let captureFns = captureFnsAll;
//     if (page.slice(1).length === 0) {
//         suiteName = 'index';
//         // captureFns = captureFnsInitialLoad;  // Close the sign up dialog on the initial page load.
//     } else {
//         suiteName = page.slice(1);
//         captureFns = captureFnsAll;
//     }
//     fullPageTestFunctions.captureFullpageHtmlElement('cobird-' + suiteName, page, ignoreElements, beforeFns, captureFns);
// });
