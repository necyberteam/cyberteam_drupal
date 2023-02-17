@templates
@api
@javascript
Feature: test recources page as a authenticated user
  In order to test the resource page as an authenticated user

  Scenario: Authenticated user Test the resource page
    Given I am logged in as a user with the "authenticated" role
    When I go to "/resources"
    Then I should see "Add New Resource"
    Then I should see "These resources have been crowd-sourced"
    Then I should see "Votes"
    Then I should see "Title"
    Then I should see "Description"
    Then I should see "Category"
    Then I should see "Tags"
    Then I should see "Skill Level"
    Then I should see "Affinity Group"
    # edit-skill-level-304--2 is the Beginner radio button    
    When I check "edit-skill-level-304--2"
    And I wait 4 seconds
    Then I should see "There are no resources at this time. Please check back often as resources are added regularly."
    When I uncheck "edit-skill-level-304--2"
    And I wait 4 seconds
    When I fill in "edit-search--2" with "NotAResource"
    And I wait 4 seconds
    Then I should see "There are no resources at this time"
    When I fill in "edit-search--2" with "test"
    And I wait 4 seconds
    Then I should see "test"
    When I click "Card View"
    Then I should see "test-login-resource"
    Then I should see "Learning"
    Then I should see "login"