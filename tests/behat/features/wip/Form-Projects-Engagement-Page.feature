@wip
@api
#@javascript
Feature: test the projects/engagements Form page
  In order to test the Project/Engagements Form Page

  Scenario: Administrator user fills out Projects and Engagements form
    Given I am logged in as a user with the "administrator" role
    When I go to "/form/project"
    Then I should see "Project"
    When I fill in "Project Title" with "TEST"
    When I check "At-Large"
    When I fill in "First" with "TEST"
    When I fill in "Last" with "TEST"
    When I fill in "Email" with "TEST@gmail.com"
    When I fill in "Project Description" with "TEST"
    When I check "Accept and Publish"
    When I press "Submit"
    Then I should see "Test"
