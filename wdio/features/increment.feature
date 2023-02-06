Feature: Sample feature file to illustrate app and browser tests

  Scenario: Launch app
    Given I launched the app
    And I see the increment button using ios-chain-query
    And I see the increment button using ios-xpath
    And I see the increment button using wdio-selector
    And I see the touches 0
    When I touch the increment button
    Then touch number is 1
