/// Site independent helper and utility functions.

/**
 * Waits for the DOM readyState property to be complete with a time limit of 10 seconds.
 * @param {Gemini object} actions Gemini actions object to interact with web driver.
 */
module.exports.waitForReadyStateComplete = function(actions) {
	actions.waitForJSCondition(function(window) {
		return window.document.readyState == 'complete';
	}, 10000);
}

/**
 * Hides the first header element within the body of the DOM. Can be used when taking
 * full page screenshots, that scroll the page incrementally, so the header is not shown throughout the image.
 * @param {Gemini object} actions Gemini actions object to interact with web driver.
 */
module.exports.hideHeaderElement = function(actions) {
	actions.executeJS(function(window) {
		let header = window.document.querySelector('body header:nth-child(1)');
		header.style.visibility = 'hidden';
	});
	actions.wait(1000);
}