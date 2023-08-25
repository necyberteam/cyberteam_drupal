@templates
@api
@javascript

Feature: add a test project via the form
  To test adding project
  As admin
  I can add a project
  TODO:  ensure testing of the following:
Student line is within projects creation form

  Scenario: Add an "in-progress" project and verify it is created

    Given I am logged in as a user with the "administrator" role
    When I go to the homepage
    When I go to "/projects"
    When I follow "Submit New Project"
    When I check "Received"
    When I check "Accept and Publish"
    When I fill in "What will the student learn?" with "test learning"
