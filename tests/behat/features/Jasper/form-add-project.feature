@wip--
@api

Feature: add a test project via the form
  To test adding project
  As admin
  I can add a project

  Scenario: Add a test-project for "password" tag and verify it appears
    Given I am logged in as a user with the "administrator" role
    When I go to "projects"
    When I follow "Submit New Project"
    When I check "Received"
    When I check "Accept and Publish"
    When I fill in "Project Title" with "test-project-title"
    When I check "At-Large"
    # tags:
    When I check "login"
    When I check "password"
    When I fill in "First" with "test-first-name"
    When I fill in "Last" with "test-last-name"
    When I fill in "Email" with "test@email.com"
    When I fill in "Project Description" with "test project description"
    When I press "Submit"
    Then I should see "test-project-title"
    And I should see "login, password"
    And I should see "At-Large"
    And I should see "test project description"
    