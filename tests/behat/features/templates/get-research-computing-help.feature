@templates
@api
@javascript

Feature: This Behat test goes over the Get Help Page, when accessed by an unauthenticated user
  and an authenticated user.
  The "Submit a Ticket" button redirects to the login page, and upon successful authentication,
  the user is redirected to the new issue page. The "Find Learning Resources" button leads to
  the resources page. Additionally, the "Join the Regional Slack Discussion" button (available
  only under CAREERS, SWEETER, and Northeast sections) opens a new tab to join Slack, while the
  "Ask The Community" button redirects to ask.ci in a new tab.

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
    Then I should see "Knowledge Base Resources"

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
    Then I should see "Knowledge Base Resources"
