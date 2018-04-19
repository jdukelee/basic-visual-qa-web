// File path variables
var currDir = process.cwd();
var runnerLib = currDir + '/lib/test-functions';
// Required modules
var fullPageTestRunner = require(runnerLib + '/fullPageTestFunctions');
var util = require(currDir + '/lib/util/utility-helpers');

var ignoreElements = [];
var beforeFns = [util.hideHeaderElement];
var captureFns = [];

// TODO: Placeholders for now
var pages = [
    '/products',
    '/search',
    '/industries',
    '/applications',
    '/productdetail',
    '/about',
    '/news',
    '/careers',
    '/press'
];

fullPageTestRunner.runFullPageScreenshot('homepage', '/', ignoreElements, beforeFns, captureFns);
