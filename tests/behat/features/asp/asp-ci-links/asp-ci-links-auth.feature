@asp
@api
@javascript
Feature: test resources page as a authenticated user
  In order to test the resource page as an authenticated user
  TODO: test filtering by level

  Scenario: Authenticated user Test the resource page
    Given I am logged in as a user with the "authenticated" role
    When I go to "/ci-links"
    Then I should see "Add New CI Link"
    Then I should see "These CI Links are crowd-sourced"
    When I fill in "edit-search--2" with "NotAResource"
    And I wait 4 seconds
    Then I should see "There are no CI Links at this time"
    When I fill in "edit-search--2" with "for-user-200"
    And I wait 4 seconds
    Then I should see "for-user-200"
