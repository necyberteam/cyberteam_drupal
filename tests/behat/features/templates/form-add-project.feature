@templates
@api

Feature: add a test project via the form
  To test adding project
  As admin
  I can add a project

  Scenario: Add a project for verify it is created
    Given I am logged in as a user with the "administrator" role
    When I go to "projects"
    When I follow "Submit New Project"
    When I check "Received"
    When I check "Accept and Publish"
    When I fill in "Project Title" with "test-create-project-title"
    When I check "At-Large"
    # tags:
    When I check "login"
    When I select "Halted" from "Status"
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
    When I fill in "Project Deliverables" with "test project Deliverables"
    When I fill in "Student Research Computing Facilitator Profile" with "test project student facilitator profile"
    When I select "One programming class" from "Student Facilitator Programming Skill Level"
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
    When I fill in "What will the student learn?" with "test Address"
    When I fill in "What will the Cyberteam program learn from this project?" with "test What will the Cyberteam program learn"
    When I fill in "HPC resources needed to complete this project?" with "test HPC resources needed to complete"
    When I fill in "Notes" with "test Notes"
    When I click "Final Report"
    When I fill in "What is the impact on the development of the principal discipline(s) of the project?" with "test What is the impact on the development"
   
    When I press "Submit"
    Then I should see "test-create-project-title"
    And I should see "login"
    And I should see "At-Large"
    And I should see "Halted"
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

    