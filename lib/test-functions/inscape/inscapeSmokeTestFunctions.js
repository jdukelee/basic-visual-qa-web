// File path variables
var currDir = process.cwd();
var utilLib = currDir + '/lib/util';
// Modules
var pageScroll = require(utilLib + '/page-scrolling');
var util = require(utilLib + '/utility-helpers');

/// Test locators
var animationContainer = 'div.animation-container';
// Additional solutions links
var heroSolutionsLink = 'section.hero a[href="/solutions"]';
var calloutSolutionsLink = 'section.solutions-callout a[href="/solutions"]';
var calloutAdSolutionsLink = 'div.solutions-callout__inner a[href="/solutions#advertisers"]';
var calloutBroadSolutionsLink = 'div.solutions-callout__inner a[href="/solutions#broadcasters"]';
var calloutOEMSolutionsLink = 'div.solutions-callout__inner a[href="/solutions#oems"]';
// Partner slider
var prevArrow = 'div.partner-slider__arrow-prev';
var nextArrow = 'div.partner-slider__arrow-next';
// Recent resources
var resourcesFeature = 'div.recent-resources__featured';
var resourcesCaseStudy = 'div.recent-resources__featured';
var resourcesSideFeature1 = 'div.recent-resources__content.visible:nth-of-type(1) a.recent-resources__link';
var resourcesSideFeature2 = 'div.recent-resources__content.visible:nth-of-type(2) a.recent-resources__link';
var resourcesArrow = 'a.recent-resources__link-arrow.visible';
// Live data
var liveDataArrow = 'div.live-data__link-arrow-wrap a[href="/live-data"]';
// Image split
var partnerWithUs = 'a.image-split__link[href="/contact"]';
var meetOurTeam = 'a.image-split__link[href="/about"]';


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

// Top nav links
var solutionsLink = 'div.nav__menu a[href="/solutions"]';
var aboutLink = 'div.nav__menu a[href="/about"]';
var resourcesLink = 'div.nav__menu a[href="/resources"]';
var contactLink = 'div.nav__menu a[href="/contact"]';

module.exports.runTopNavigationTest = function(pageName, url) {
	gemini.suite(pageName + '-suite', (pageSuite) => {
		pageSuite
			.setUrl(url)
			.setCaptureElements([
				'body > main > section:nth-of-type(1)'
			])
			.skip([
				'chrome-mobile-viewport',
				'chrome-tablet-viewport'
			])
			.ignoreElements([

			])
			.before((actions, find) => {
				util.waitForReadyStateComplete(actions);
				actions.wait(1000);
			})
			.capture('hover-over-solutions', (actions, find) => {
				actions.mouseMove(solutionsLink);
				actions.wait(1000);
			})
			.capture('click-solutions', (actions, find) => {
				actions.click(solutionsLink);
				actions.wait(2000);
			})
			.capture('hover-over-about', (actions, find) => {
				actions.mouseMove(aboutLink);
				actions.wait(1000);
			})
			.capture('click-about', (actions, find) => {
				actions.click(aboutLink);
				actions.wait(2000);
			})
			.capture('hover-over-resources', (actions, find) => {
				actions.mouseMove(resourcesLink);
				actions.wait(1000);
			})
			.capture('click-resources', (actions, find) => {
				actions.click(resourcesLink);
				actions.wait(2000);
			})
			.capture('hover-over-contact', (actions, find) => {
				actions.mouseMove(contactLink);
				actions.wait(1000);
			})
			.capture('click-contact', (actions, find) => {
				actions.click(contactLink);
				actions.wait(2000);
			});
	});
}

var responsiveMenuIcon = 'button.header__menu-icon';

function goToPageAndOpenMenu(actions, item) {
	actions.click(responsiveMenuIcon);
	actions.wait(1500);
	actions.click(item);
	actions.wait(1500);
	actions.click(responsiveMenuIcon);
	actions.wait(1500);
}

module.exports.runResponsiveNavigationTest = function(pageName, url) {
	gemini.suite(pageName + '-suite', (pageSuite) => {
		pageSuite
			.setUrl(url)
			.setCaptureElements([
				'div.nav__menu'
			])
			.skip([
				'chrome-desktop-viewport'
			])
			.ignoreElements([

			])
			.before((actions, find) => {
				util.waitForReadyStateComplete(actions);
				actions.wait(1500);
			})
			.capture('menu-from-index', (actions, find) => {
				actions.click(responsiveMenuIcon);
				actions.wait(1500);
			})
			.capture('menu-from-solutions', (actions, find) => {
				goToPageAndOpenMenu(actions, solutionsLink);
			})
			.capture('menu-from-about', (actions, find) => {
				goToPageAndOpenMenu(actions, aboutLink);
			})
			.capture('menu-from-resources', (actions, find) => {
				goToPageAndOpenMenu(actions, resourcesLink);
			})
			.capture('menu-from-contact', (actions, find) => {
				goToPageAndOpenMenu(actions, contactLink);
			});
	});
}

// Footer
var aboutFooterLink = 'div.footer__container a[href="/about"]';
var liveDataFooterLink = 'div.footer__container a[href="/live-data"]';
var contactFooterLink = 'div.footer__container a[href="/contact"]';
var pressFooterLink = 'li.footer-nav__item.footer-nav__item--press';
var careersFooterLink = 'li.footer-nav__item.footer-nav__item--careers';
var linkedInFooterLink = 'li.footer-nav__item.footer-nav__item--linkedin';

module.exports.runFooterNavigationTest = function(pageName, url) {
	gemini.suite(pageName + '-suite', (pageSuite) => {
		pageSuite
			.setUrl(url)
			.setCaptureElements([
				'div.footer__container'
			])
			.skip([

			])
			.ignoreElements([

			])
			.before((actions, find) => {
				util.waitForReadyStateComplete(actions);
				actions.wait(1000);
			})
			.capture('hover-over-about', (actions, find) => {
				pageScroll.scrollToBottomOfPage(actions);
				actions.mouseMove(aboutFooterLink);
				actions.wait(1000);
			})
			.capture('click-about', (actions, find) => {
				pageScroll.scrollToBottomOfPage(actions);
				actions.click(aboutFooterLink);
				actions.wait(2000);
			})
			.capture('hover-over-live-data', (actions, find) => {
				pageScroll.scrollToBottomOfPage(actions);
				actions.mouseMove(liveDataFooterLink);
				actions.wait(1000);
			})
			.capture('click-live-data', (actions, find) => {
				pageScroll.scrollToBottomOfPage(actions);
				actions.click(liveDataFooterLink);
				actions.wait(2000);
			})
			.capture('hover-over-press', (actions, find) => {
				pageScroll.scrollToBottomOfPage(actions);
				actions.mouseMove(pressFooterLink);
				actions.wait(1000);
			})
			.capture('click-press', (actions, find) => {
				pageScroll.scrollToBottomOfPage(actions);
				actions.click(pressFooterLink);
				actions.wait(2000);
			})
			.capture('hover-over-contact', (actions, find) => {
				pageScroll.scrollToBottomOfPage(actions);
				actions.mouseMove(contactFooterLink);
				actions.wait(1000);
			})
			.capture('click-contact', (actions, find) => {
				pageScroll.scrollToBottomOfPage(actions);
				actions.click(contactFooterLink);
				actions.wait(2000);
			})
			.capture('hover-over-careers', (actions, find) => {
				pageScroll.scrollToBottomOfPage(actions);
				actions.mouseMove(careersFooterLink);
				actions.wait(1000);
			})
			.capture('hover-over-linkedin', (actions, find) => {
				pageScroll.scrollToBottomOfPage(actions);
				actions.mouseMove(linkedInFooterLink);
				actions.wait(1000);
			});
	});
}
