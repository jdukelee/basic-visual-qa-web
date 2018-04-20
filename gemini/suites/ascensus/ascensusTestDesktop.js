// File path variables
var currDir = process.cwd();
var runnerLib = currDir + '/lib/test-functions';
// Required modules
var fullPageTestRunner = require(runnerLib + '/fullPageTestFunctions');
var util = require(currDir + '/lib/util/utility-helpers');

var ignoreElements = [];
var beforeFns = [util.hideHeaderElement];
var captureFns = [];

var pages = [
    '/',
    '/company',
    '/products',
    '/search',
    '/industries',
    '/applications',
    '/products/venpure',
    '/products/borol',
    '/products/chromaclear',
    '/news',
    '/careers'
];

pages.forEach((page) => {
    let suiteName = (page.slice(1).length === 0 ? 'index' : page.slice(1));
    fullPageTestRunner.runFullPageScreenshot(suiteName, page, ignoreElements, beforeFns, captureFns);
});
