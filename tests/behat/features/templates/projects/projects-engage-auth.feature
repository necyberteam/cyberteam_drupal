@templates
@api
@javascript

Feature: test projects page as authenticated user
  TODO:  make sure the following is tested:
    Add New Project button links to new project page
    Search works on Project Title of approved projects only, case-insensitive
    Results are displayed on a table with the following columns :
      Project Title (sortable, links to project page)
      Project Institution (sortable)
      Project Owner (links to user’s page)
      Tags (each tag links to its own tag page
      Status (sortable)
      Project Leader

  Scenario: Authenticated user Test the Projects Page
    Given I am logged in as a user with the "authenticated" role
    When I go to "/projects"
    Then I should see "Projects"
    Then I should see "Submit New Project"

    When I fill in "edit-search--2" with "test"
    And I wait 4 seconds
    Then I should see "Test"
    Then I should see "test-create-project-title"
    Then I should see "Project Institution"
    Then I should see "Project Owner"
    Then I should see "login"
    Then I should see "Status"
    Then I should see "test-first-name"

    When I click "Submit New Project"
    Then I should be on "/form/project"
    Then I should see "Project"

  Scenario: verify search filter
    Given I am not logged in
    When I go to "/projects"
    When I fill in "search" with "nothing-should-show"
    And I wait 3 seconds
    Then I should see "There are no projects at this time."

