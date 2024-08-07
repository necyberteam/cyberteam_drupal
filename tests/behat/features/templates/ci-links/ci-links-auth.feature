@templates
@api
@javascript
Feature: On the KB Resources Page for authenticated users,
functionalities comprise adding new CI links, conducting
case-insensitive searches, filtering by skill level, and
viewing content in List or Card View modes. Details include titles,
descriptions, categories, tags (first 3 linked), skill levels, and affinity groups.

  Scenario: Authenticated user Test the resource page
    Given I am logged in as a user with the "authenticated" role
    When I go to "/knowledge-base/resources"
    Then I should see "Add a Resource"
    Then I should see "Cyberinfrastructure professionals"
    Then I should see "Test CI Link Title"

