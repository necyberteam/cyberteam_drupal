@templates
@api
@javascript

Feature: test projects page

  Scenario: Verify unauth user can see test project
    Given I am not logged in
    When I go to "projects"
    Then I should see "Project Title"
    And I should see "Project Institution"
    And I should see "Project Owner"
    And I should see "Tags"
    And I should see "Status"
    And I should see "Project Leader"
    And I should see "Search"

  Scenario: Remove all projects and verify empty messages
    Given I am logged in as a user with the "administrator" role
    When I go to "admin/structure/webform/manage/project/results/submissions"
    # TODO - following doesn't work
    #When I check "Select all rows in this table"
    #When I select "Delete submission" from "edit-action"
    #When I press "Apply to selected items"
    #Then I should see "Delete these submissions"

  Scenario: Unath user must login to create a project
    Given I am not logged in
    When I go to "projects"
    Then I should see "Login to Add New Project"
    When I follow "Login to Add New Project"
    Then I should be on "user/login"
    And I should see "Please login"

  Scenario: Unath user must login to create a project
    Given I am logged in as a user with the "authenticated" role
    When I go to "projects"
    Then I should see "Submit New Project"
    When I follow "Submit New Project"
    Then I should see "Project Description"