@templates
@api
@javascript
Feature: test get help page 
  In order to test the Get Help page

  Scenario: Unauthenticated user Test the Get Help Page
    Given I am not logged in
    When I go to "/get-research-computing-help"
    Then I should see "Get Research Computing Help"
    Then I should see "at the Regional Help Desk"
    Then I should see "Ask a Question of the Community"
    Then I should see "Find Learning Resources"

    When I click "at the Regional Help Desk"
    Then I should see "You must log in to view this page"

    When I go to "/get-research-computing-help"
    Then I click "Join the Regional Slack Discussion"
    Then I click "Ask a Question of the Community"
    When I click "Find Learning Resources"
    Then I should see "Resources"
    