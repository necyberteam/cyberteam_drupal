@templates
@api
@javascript
Feature: test projects/engagements page
  In order to test the Project/Engagements Page


  Scenario: Authenticated user Test the Projects/Engagements Page
    Given I am logged in as a user with the "authenticated" role
    When I go to "/projects"
    Then I should see "Projects"
    Then I should see "Submit New Project"
   
    When I fill in "edit-search--2" with "test"
    And I wait 4 seconds
    Then I should see "Test"
    Then I should see "test-project-title"
    Then I should see "Project Institution"
    Then I should see "Project Owner"
    Then I should see "login"
    Then I should see "Status"
    Then I should see "test-first-name"
    When I fill in "edit-search--2" with "testnothere"
    And I wait 4 seconds
    Then I should see "There are no projects at this time"

    When I click "Submit New Project"
    Then I should be on "/form/project"
    Then I should see "Project"

