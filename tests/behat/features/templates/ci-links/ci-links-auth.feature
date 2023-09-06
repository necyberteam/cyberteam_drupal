@templates
@api
@javascript
Feature: On the CI Links Page for authenticated users,
functionalities comprise adding new CI links, conducting
case-insensitive searches, filtering by skill level, and
viewing content in List or Card View modes. Details include titles,
descriptions, categories, tags (first 3 linked), skill levels, and affinity groups.

  Scenario: Authenticated user Test the resource page
    Given I am logged in as a user with the "authenticated" role
    When I go to "/ci-links"
    Then I should see "Add New CI link"
    Then I should see "These CI Links have been crowd-sourced"
    # edit-skill-level-306--2 is the Advanced radio button
    When I check "edit-skill-level-306--2"
    And I wait 4 seconds
    #Then I should see "There are no CI Links at this time. Please check back often as CI Links are added regularly."
    Then I should see "Title"
    Then I should see "Description"
    Then I should see "Category"
    Then I should see "Tags"
    Then I should see "Skill Level"
    Then I should see "Affinity Group"
    When I uncheck "edit-skill-level-306--2"
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
