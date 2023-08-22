@templates
@api
@javascript

Feature: add a test project via the form
  To test adding project
  As admin
  I can add a project
  TODO:  ensure testing of the following:
    Login to Add New Project Button
    Search works on Project Title of approved projects only, case-insensitive
    Search displays a special message if no results are found
    Tags on projects in carousal are clickable and show tag results
    Results are displayed on a table with the following columns :
      Project Title (links to project page)
      Project Institution
      Project Owner (links to user’s page)
      Tags (each tag links to its own tag page)
      Status
      Project Lead

  Scenario: Assigning mentor & student facilitator to user "Test Smith"
    Given I am logged in as a user with the "administrator" role
    # user 1998 is "Test Smith"
    When I go to "/user/1998/edit"
    When I fill in "First Name" with "Test"
    When I fill in "Last Name" with "Smith"
    When I check "mentor"
    When I check "student-facilitator"
    When I check "researcher/educator"
    And I wait 3 seconds
    When I fill in "edit-field-academic-status" with "1"
    And I wait 3 seconds
    # "op" is the name of the submit button.
    When I press "op"
    And I wait 2 seconds
    Then I should see "The changes have been saved."


  Scenario: Add an "in-progress" project and verify it is created

    Given I am logged in as a user with the "administrator" role
    When I go to the homepage
    When I go to "/projects"
    When I follow "Submit New Project"
    When I check "Received"
    When I check "Accept and Publish"
    When I fill in "Project Title" with "test-create-project-title"
    When I check "At-Large"
    # tags:
    When I check "login"
    When I select "In Progress" from "Status"
    When I fill in "First" with "test-first-name"
    When I fill in "Last" with "test-last-name"
    When I fill in "Email" with "test@email.com"
    When I fill in "Mobile Phone" with "555-1212"
    When I fill in "Phone" with "555-1213"
    When I fill in "Ext:" with "333"
    When I fill in "edit-mentor-items-0-item-" with "Test Smith (1998)"
    When I fill in "Project Description" with "test project description"
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
    #TODO Line below does not pass on GPC Jira D8-1800 : https://cyberteamportal.atlassian.net/browse/D8-1800
    #When I fill in "What will the student learn?" with "test learning"
    When I fill in "What will the Cyberteam program learn from this project?" with "test What will the Cyberteam program learn"
    When I fill in "HPC resources needed to complete this project?" with "test HPC resources needed to complete"
    When I fill in "Notes" with "test Notes"
    When I click "Final Report"
    When I fill in "What is the impact on the development of the principal discipline(s) of the project?" with "test What is the impact on the development"

    When I press "Submit"
    And I wait 5 seconds
    Then I should see "test-create-project-title"
    And I should see "login"
    And I should see "At-Large"
    And I should see "In Progress"
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

  Scenario: Add a Recruiting project to verify it is created
    Given I am logged in as a user with the "administrator" role
    When I go to "projects"
    When I follow "Submit New Project"
    When I check "Received"
    When I check "Accept and Publish"
    When I fill in "Project Title" with "test-create-recruiting-project-title"
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
    When I fill in "Project Description" with "test project description"
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
    When I fill in "What will the Cyberteam program learn from this project?" with "test What will the Cyberteam program learn"
    When I fill in "HPC resources needed to complete this project?" with "test HPC resources needed to complete"
    When I fill in "Notes" with "test Notes"
    When I click "Final Report"
    When I fill in "What is the impact on the development of the principal discipline(s) of the project?" with "test What is the impact on the development"

    When I press "Submit"
    Then I should see "test-create-recruiting-project-title"
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
