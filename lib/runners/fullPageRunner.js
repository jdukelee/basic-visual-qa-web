// File path variables
var currDir = process.cwd();
var utilLib = currDir + '/lib/util';
// Modules
var pageScroll = require(utilLib + '/page-scrolling');
var util = require(utilLib + '/utility-helpers');

module.exports.runFullPageScreenshot = function(pageName, url) {
	gemini.suite(pageName + '-suite', (fullPageSuite) => {
		fullPageSuite
			.setUrl(url)
			.setCaptureElements([
				'html body'
			])
			.ignoreElements([

			])
			.before((actions, find) => {
				util.waitForReadyStateComplete(actions);
				pageScroll.scrollToBottomOfPage(actions);
				actions.wait(1000);
			})
			.capture('fullpage', (actions, find) => {
	
			});
	});
}