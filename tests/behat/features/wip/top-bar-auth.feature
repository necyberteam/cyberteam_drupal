@wip
@api
@javascript

Feature: test ACCESS Support Top Menu Bar
  In order to test the Top Menu Bar

  Scenario: Authenticated user tests the Top Menu Bar
    Given I am logged in as a user with the "authenticated" role
    When I go to the homepage
    Then I should see "My ACCESS"
    Then I should see "Logout"