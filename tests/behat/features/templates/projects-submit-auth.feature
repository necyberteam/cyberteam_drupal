@templates
@api

Feature: test submit project form
  In order to test the submit project form
  As a user of the authenticated role

  Scenario: Authenticated user fills out the submit project form
    Given I am logged in as a user with the "authenticated" role
    When I go to "projects"
    When I follow "Submit New Project"
    Then I should be on "form/project"
    And I should see "Project Title"
    And I should see "Program"
    And I should see "Project Leader"
    And I should see "First"
    And I should see "Last"
    And I should see "Email"
    And I should see "Mobile Phone"
    And I should see "Work Phone"
    And I should see "Ext:"
    Then I should see "Project Information"
    And I should see "First"
    And I should see "Last"
    And I should see "Email"
    And I should see "Mobile Phone"
    And I should see "Work Phone"
    Then I should see "Project Information"
    And I should see "Project Description"
    And I should see "Provide a description of the project and its history, progress, and/or current status."
    When I fill in "project_title" with "TEST"
    When I check "At-Large"
    When I fill in "project_leader[first]" with "TEST"
    When I fill in "project_leader[last]" with "TEST"
    When I fill in "email" with "TEST@TEST.COM"
    When I fill in "project_description" with "TEST"
    When I press "Submit"
    Then I should see "TEST"
    And I should see "Project Information"
    And I should see "Edit Project"
    And I should see "Project Status"
    And I should see "Project Region"
    And I should see "Submitted By"
    And I should see "Project Email"
    And I should see "Project Description"