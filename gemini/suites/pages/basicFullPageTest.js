/**
 * Basic test file that takes a full page screenshot at the specified URL.
 * URL may also be specified by setting the rootUrl property in the config file or passing it is as a command line argument as shown below.
 * Command to execute this file:
 * 		gemini --config config/gemini-fullpage.yml --root-url https://www.olympic.org update gemini/
 */
// File path variables
var currDir = process.cwd();
var runnerLib = currDir + '/lib/runners';
// Required modules
var testRunner = require(runnerLib + '/fullPageRunner');

// Values used for the full page test runner.
var pageName = 'Oh, so they have internet on computers now!';
var pageUrlPath = '/'; 

testRunner.runFullPageScreenshot(pageName, pageUrlPath);
