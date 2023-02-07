/* global $, driver */

const {Given, Then, When} = require('@wdio/cucumber-framework');

Given(/^I launched the app$/, async () => {
  // app launched by the framework
  await driver.pause(60000); //wait for being able to see change
});

Given(/^I see the increment button using ([a-z-]+)$/, async type => {
  // Check multiple ways to query the element
  switch (type) {
    case 'ios-chain-query':
      const iOSChainQuery =
        "type == 'XCUIElementTypeButton' && name CONTAINS 'increment-touches'";
      const buttonWithIOSChainQuery = await $(
        `-ios predicate string:${iOSChainQuery}`,
      );
      await buttonWithIOSChainQuery.waitForDisplayed();
      break;
    case 'ios-xpath':
      const buttonWithIOSXpath = await $(
        '//XCUIElementTypeButton[@name="increment-touches"]',
      );
      await buttonWithIOSXpath.waitForDisplayed();
      break;
    case 'wdio-selector':
    default:
      const buttonWithWdioSelector = $('~increment-touches');
      await buttonWithWdioSelector.waitForDisplayed();
      break;
  }
});

Given(/^I see the touches (\d+)$/, async number => {
  const touches = await $(`~Touches ${number}`);
  await touches.waitForDisplayed();
});

When(/^I touch the increment button$/, async () => {
  // const button = await $('//XCUIElementTypeButton[@name="increment-touches"]');
  const button = await $('~increment-touches');
  await button.touchAction('tap');
});

Then(/^touch number is (\d+)$/, async number => {
  await driver.pause(5000); //wait for being able to see change
  const touches = await $(`~Touches ${number}`);
  await touches.waitForDisplayed();
});
