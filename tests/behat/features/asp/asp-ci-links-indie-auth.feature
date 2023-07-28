@wip
@api
@javascript

Feature: test ci-link page as a authenticated user
  In order to test the ci-links page as an authenticated user

  Scenario: Authenticated user Test the resource page
    Given I am logged in as a user with the "authenticated" role
    When I go to "/ci-links"
    And I wait 2 seconds
    Then I should see "Test"
    When I click "TEST"
    Then I should see "TEST"
    Then I should see "login"
    Then I should see "Beginner"
    Then I should see "Test"
    Then I should see "http://example.com"
