@templates
@api
@javascript
Feature: test projects/engagements page
  In order to test the Project/Engagements Page


  Scenario: Unauthenticated user Test the Projects/Engagements Page
    Given I am not logged in
    When I go to "/projects"
    Then I should see "Projects"
    Then I should see " Login To Add New Project"
    Then I should see "Title"
    Then I should see "Project Institution"
    Then I should see "Project Owner"
    Then I should see "Tags"
    Then I should see "Status"
    Then I should see "Project Leader"
    When I fill in "Search" with "test"
    Then I should see "Test"



