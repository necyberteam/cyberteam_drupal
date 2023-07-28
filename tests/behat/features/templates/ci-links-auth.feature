@templates
@api
@javascript
Feature: test CI Links page as a authenticated user
  In order to test the CI Links page as an authenticated user

  Scenario: Authenticated user Test the resource page
    Given I am logged in as a user with the "authenticated" role
    When I go to "/ci-links"
    Then I should see "Add New CI link"
    Then I should see "These CI Links have been crowd-sourced"
    # edit-skill-level-307--2 is the Expert radio button
    When I check "edit-skill-level-307--2"
    And I wait 4 seconds
    Then I should see "There are no CI Links at this time. Please check back often as CI Links are added regularly."
    When I uncheck "edit-skill-level-307--2"
    And I wait 4 seconds
    When I fill in "edit-search--2" with "NotAResource"
    And I wait 4 seconds
    Then I should see "There are no CI Links at this time"
    When I fill in "edit-search--2" with "test"
    And I wait 4 seconds
    Then I should see "test"
    When I click "Card View"
    Then I should see "test-login-resource"
    Then I should see "Learning"
    Then I should see "login"
