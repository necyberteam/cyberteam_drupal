#@wip
@api
@javascript

Feature: test ACCESS Support MATCHPlus Engagement page
  In order to test the MATCHPlus Engagement page

  Scenario: Authenticated user tests the MATCHPlus Engagement page
    Given I am logged in as a user with the "authenticated" role
    When I go to "/node/add/match_engagement?type=plus"
    When I fill in "Project Title" with "Test"
    When I fill in "Institution" with "Test"
    When I select "Start as soon as possible" from "Urgency"
    When I fill in "Description" with "Test"
    When I fill in "Tags" with "lo"
    Then I should see "login"
    When I fill in "Tags" with "login"
    When I fill in "Tags" with "acls"
    When I click "Save"
    Then I should see "SOmehting5656"
