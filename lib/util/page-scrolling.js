/// In progress utility functions for scrolling to areas of the page.
/**
 * Incrementally scrolls to the bottom of the page.
 * @param {Gemini object} actions Gemini actions object to interact with web driver.
 */
module.exports.scrollToBottomOfPage = function(actions) {
	actions.executeJS(function(window) {
		function wait(ms) {
			let start = Date.now();
			let curr = start;
			while(curr - start < ms) {
				curr = Date.now();
			}
		}
		let height = window.document.body.scrollHeight;
		let inc = window.innerHeight;
		for (let i = inc; i <= height; i = i + inc) {
			window.scrollBy(0, i);	
			wait(2000);
		}
	});
	actions.wait(2000);
}