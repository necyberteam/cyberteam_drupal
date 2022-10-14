@wip=--
@api
#@javascript
Feature: test projects/engagements page
  In order to test the Project/Engagements Page


  Scenario: Authenticated user Test the Projects/Engagements Page
    Given I am logged in as a user with the "authenticated" role
    When I go to "/projects"
    Then I should see "Projects"
    Then I should see "Submit New Project"
    Then I should see "Title"
    Then I should see "Project Institution"
    Then I should see "Project Owner"
    Then I should see "Tags"
    Then I should see "Status"
    Then I should see "Project Leader"

    #Search does not get filled
    When I fill in "Search" with "test"
    And I wait 4 seconds
    Then I should see "Test"
    When I fill in "Search" with "testnothere"
    And I wait 4 seconds

    #Just to get an error
    Then I should see "TestingTestTest"
    When I click "Submit New Project"
    Then I should see "Project"

