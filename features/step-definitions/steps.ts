import {Given, When, Then} from '@wdio/cucumber-framework';

Given(
  /^I am on home screen and see the "Increment touches" button$/,
  async () => {
    await $('~Increment touches').waitForDisplayed();
  },
);

When(/^I touch the "Increment touches" button$/, async () => {
  await $('~Increment touches').click();
});

Then(/^I should see number increment by 1$/, async () => {
  expect(await $('~Touches').getText()).toEqual('Touches: 1');
});
