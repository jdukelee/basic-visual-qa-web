/**
 * Basic test that takes a full page screenshot of pages found on Inscape site.
 * URL may also be specified by setting the rootUrl property in the config file or passing it is as a command line argument as shown below.
 * Command to execute this file:
 * 		gemini --config config/gemini-fullpage.yml --root-url https://www.olympic.org update gemini/
 */
// File path variables
var currDir = process.cwd();
var runnerLib = currDir + '/lib/test-functions/inscape';
// Required modules
var testRunner = require(runnerLib + '/inscapeSmokeTestFunctions');

// Values used for the full page test runner.
var pageName = 'Oh, so they have internet on computers now!';
var inscapeUrls = [
	'https://inscape.weareenvoy.net/',
	'https://inscape.weareenvoy.net/solutions',
	'https://inscape.weareenvoy.net/about',
	'https://inscape.weareenvoy.net/resources',
	'https://inscape.weareenvoy.net/contact',
	'https://inscape.weareenvoy.net/live-data',
	'https://inscape.weareenvoy.net/privacy',
	'https://inscape.weareenvoy.net/terms'
]; 

for (var i = 0; i < inscapeUrls.length; i++) {
	testRunner.runFullPageScreenshot(inscapeUrls[i], inscapeUrls[i]);
}

testRunner.runTopNavigationTest('desktop-top-nav',inscapeUrls[0]);
testRunner.runResponsiveNavigationTest('responsive-top-nav',inscapeUrls[0]);
testRunner.runFooterNavigationTest('footer-nav',inscapeUrls[0]);