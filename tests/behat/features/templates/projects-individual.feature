@templates
@api
@javascript

Feature: test projects page

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

  Scenario: Add a project for verify it is created
    Given I am logged in as a user with the "administrator" role
    When I go to "projects"
    When I follow "Submit New Project"
    When I check "Received"
    When I check "Accept and Publish"
    When I fill in "Project Title" with "test-create-project-title-for-behat"
    When I check "At-Large"
    # tags:
    When I check "login"
    When I select "Recruiting" from "Status"
    When I fill in "First" with "test-first-name"
    When I fill in "Last" with "test-last-name"
    When I fill in "Email" with "test@email.com"
    When I fill in "Mobile Phone" with "555-1212"
    When I fill in "Phone" with "555-1213"
    When I fill in "Ext:" with "333"
    # TODO not sure how to correctly reference people
    #When I fill in "edit-mentor-items-0-item-" with "Julie Ma"
    #When I fill in "edit-student-items-0-item-" with "Julie Ma (100)"
    When I fill in "Project Description" with "test project description"
    #When I fill in "edit-project-deliverables-mentee" with "test project Deliverables"
    #When I fill in "Student Research Computing Facilitator Profile" with "test project student facilitator profile"
    #When I select "One programming class" from "Student Facilitator Programming Skill Level"
    When I fill in "Project Institution" with "test Project Institution"
    When I fill in "Address" with "test Address"
    When I fill in "Address 2" with "test Address 2"
    When I fill in "City/Town" with "test City/Town"
    When I select "Alabama" from "State/Province"
    When I fill in "ZIP/Postal Code" with "98765"
    When I select "CR-Yale" from "Anchor Institution"
    When I fill in "Preferred Start Date" with "10/04/2022"
    When I check "Start as soon as possible."
    When I fill in "Expected Project Duration (in months)" with "33"
    When I fill in "Launch Presentation Date" with "10/05/2022"
    When I fill in "Wrap Presentation Date" with "10/06/2022"
    When I fill in "Github Contributions Link" with "http://test.com"
    When I fill in "Planned Portal Contributions (if any)" with "test Planned Portal Contributions"
    When I fill in "Planned Publications (if any)" with "test Planned Publications (if any)"
    #When I fill in "What will the student learn?" with "test learning"
    When I fill in "What will the Cyberteam program learn from this project?" with "test What will the Cyberteam program learn"
    When I fill in "HPC resources needed to complete this project?" with "test HPC resources needed to complete"
    When I fill in "Notes" with "test Notes"
    When I click "Final Report"
    When I fill in "What is the impact on the development of the principal discipline(s) of the project?" with "test What is the impact on the development"

    When I press "Submit"
    Then I should see "test-create-project-title"
    And I should see "login"
    And I should see "At-Large"
    And I should see "Recruiting"
    And I should see "test@email.com"
    And I should see "test Project Institution"
    And I should see "test Address"
    And I should see "test Address 2"
    And I should see "test City/Town"
    And I should see "Alabama"
    And I should see "98765"
    And I should see "test project description"
    And I should see "http://test.com"
    And I should see "33"

  Scenario: Verify home page shows project
    Given I am not logged in
    When I am on the homepage
    When I wait for the page to be loaded
    Then I should see "Featured Projects"

  Scenario: Verify home page shows project
    Given I am logged in as a user with the "authenticated" role
    When I am on the homepage
    Then I should see "Featured Projects"

  Scenario: Verify unauth user can see test project
    Given I am not logged in
    When I go to "projects"
    # test case-insensitive searching
    When I fill in "search" with "BEHAT"
    Then I should see "test-create-project-title-for-behat"
    When I follow "test-create-project-title-for-behat"
    And I wait for the page to be loaded
    Then I should see "test-create-project-title"
    And I should see "login"
    Then I should see "Submitted by:"
    And I should see "At-Large"
    And I should see "Recruiting"
    And I should see "test@email.com"
    And I should see "test Project Institution"
    And I should see "test Address"
    And I should see "test Address 2"
    And I should see "test City/Town"
    And I should see "Alabama"
    And I should see "98765"
    And I should see "test project description"
    Then I should not see "I’m interested"
    And I should see "http://test.com"
    And I should see "33"

  Scenario: Verify auth user can see test project
    Given I am logged in as a user with the "authenticated" role
    When I go to "projects"
    When I fill in "search" with "BEHAT"
    Then I should see "test-create-project-title-for-behat"
    When I follow "test-create-project-title-for-behat"
    And I wait for the page to be loaded
    Then I should see "test-create-project-title"
    And I should see "login"
    Then I should see "Submitted by:"
    And I should see "At-Large"
    And I should see "Recruiting"
    And I should see "test@email.com"
    And I should see "test Project Institution"
    And I should see "test Address"
    And I should see "test Address 2"
    And I should see "test City/Town"
    And I should see "Alabama"
    And I should see "98765"
    And I should see "test project description"
    When I click "I'm interested"
    Then I should see "Interested"
    #Interested button is not able to be clicked
    #When I click " interested"
    #Then I should see "I'm interested"
    And I should see "http://test.com"
    And I should see "33"

