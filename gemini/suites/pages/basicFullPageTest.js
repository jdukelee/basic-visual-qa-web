/**
 * Basic test file that takes a full page screenshot at the specified URL.
 * URL may also be specified by setting the rootUrl property in the config file or passing it is as a command line argument as shown below.
 * Command to execute this file:
 * 		gemini --config config/desktop/gemini-desktop.yml --root-url https://www.olympic.org update gemini/suites/pages/basicFullPageTest.js
 * Without overriding rootUrl:
* 		gemini --config config/desktop/gemini-desktop.yml update gemini/suites/pages/basicFullPageTest.js
 */
// File path variables
var currDir = process.cwd();
var runnerLib = currDir + '/lib/runners';
// Required modules
var testRunner = require(runnerLib + '/fullPageRunner');

// Values used for the full page test runner.
var pageName = 'Oh, so they have internet on computers now!';
var pageURL = 'https://www.olympic.org';

testRunner.runFullPageScreenshot(pageName, pageURL);
