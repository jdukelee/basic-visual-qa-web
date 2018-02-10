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
