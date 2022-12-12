@templates
@api
@javascript
Feature: test resources page as a authenticated user
  In order to test the resource page as an authenticated user

  Scenario: Authenticated user Test the resource page
    Given I am logged in as a user with the "authenticated" role
    When I go to "/resources"
    Then I should see "Test"
    When I click "TEST"
    Then I should see "TEST"
    Then I should see "votes"
    Then I should see "login"
    Then I should see "Beginner"
    Then I should see "Test"
    Then I should see "http://example.com"
