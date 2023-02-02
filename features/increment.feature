Feature: Basic nesting test
  Scenario : I can click on the increment button and see number increment
    Given I am on home screen and see the "Increment touches" button
    When I touch the "Increment touches" button
    Then I should see number increment by 1
