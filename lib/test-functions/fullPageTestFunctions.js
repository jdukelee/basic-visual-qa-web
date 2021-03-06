// File path variables
var currDir = process.cwd();
var utilLib = currDir + '/lib/util';
// Modules
var pageScroll = require(utilLib + '/page-scrolling');
var util = require(utilLib + '/utility-helpers');

/**
 * Runs a Gemini suite that takes a screenshot of the entire page.
 * @param {string} pageName Name of the page being captured.
 * @param {string} url The path from the root-url (defined in the config) to specify the page to open.
 * @param {array} [elementsToIgnore=[]] Array of css selectors of elements to ignore.
 * @param {array} [beforeFunctions=[]] Array of functions to call in the before() Gemini builder method. Each function will get called with the 'actions' and 'find' objects as parameters.
 * @param {array} [captureFunctions=[]] Array of functions to call in the capture() Gemini builder method. Each function will get called with the 'actions' and 'find' objects as parameters.
 */
module.exports.runFullPageScreenshot = function(pageName, urlPath, elementsToIgnore = [], beforeFunctions = [], captureFunctions = []) {
	gemini.suite(pageName + '-suite', (fullPageSuite) => {
		fullPageSuite
			.setUrl(urlPath)
			.setCaptureElements([
				'html body'
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
				pageScroll.scrollToBottomOfPage(actions);
				actions.wait(1000);
			})
			.capture('fullpage', (actions, find) => {
				// Execute functions passed in the captureFunctions array if any.
				if (captureFunctions.length > 0) {
					captureFunctions.forEach(function(currFn) {
						if (typeof currFn === 'function') currFn(actions, find);
						actions.wait(1500);
					});
				}
			});
	});
}

/**
 * Runs a Gemini suite that takes a screenshot of everything within the HTML element.
 * This is a refinement of the above that takes advantage of Gemini Testing screenshotDelay config setting '' and a discovered tweak of modifying the html height attribute in certain cases.
 * @param {string} pageName Name of the page being captured.
 * @param {string} url The path from the root-url (defined in the config) to specify the page to open.
 * @param {array} [elementsToIgnore=[]] Array of css selectors of elements to ignore.
 * @param {array} [beforeFunctions=[]] Array of functions to call in the before() Gemini builder method. Each function will get called with the 'actions' and 'find' objects as parameters.
 * @param {array} [captureFunctions=[]] Array of functions to call in the capture() Gemini builder method. Each function will get called with the 'actions' and 'find' objects as parameters.
 */
module.exports.captureFullpageHtmlElement = function(pageName, urlPath, elementsToIgnore = [], beforeFunctions = [], captureFunctions = []) {
	gemini.suite(pageName + '-suite', (suite) => {
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
            .capture('fullpage', (actions, find) => {
    			// Execute functions passed in the captureFunctions array if any.
				if (captureFunctions.length > 0) {
					captureFunctions.forEach(function(currFn) {
						if (typeof currFn === 'function') currFn(actions, find);
						actions.wait(1500);
					});
				}
            });
    });
}