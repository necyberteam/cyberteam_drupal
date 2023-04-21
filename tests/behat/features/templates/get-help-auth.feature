@templates
@api
@javascript
Feature: test get help page
  In order to test the Get Help page

  Scenario: Authenticated user Test the Get Help Page
    Given I am logged in as a user with the "authenticated" role
    When I go to "/get-research-computing-help"
    Then I should see "Get Research Computing Help"
    Then I should see "at the Regional Help Desk"
    Then I should see "Ask a Question of the Community"
    Then I should see "Find Learning Resources"

    When I click "at the Regional Help Desk"
    Then I should see "Issue"
    Then I should see "Ticket Data"

    When I go to "/get-research-computing-help"
    Then I click "Join the Regional Slack Discussion"
    Then I click "Ask a Question of the Community"
    When I click "Find Learning Resources"
    Then I should be on "/ci-links"
