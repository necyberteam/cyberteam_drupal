#@wip
@api
@javascript

Feature: test ACCESS Support MATCHPlus page
  In order to test the MATCHPlus page

  Scenario: Authenticated user tests the MATCHPlus page
    Given I am logged in as a user with the "authenticated" role
    When I go to "/matchplus"
    And I wait 5 seconds
    Then I should see element with "svg-inline--fa fa-clock" selector
    Then I should see "Apply for MATCHPlus"
    When I click "Request a Pilot Engagement"
    Then I should be on "/node/add/match_engagement?type=plus"
    When I go to "/matchplus"
    Then I should see "Join our Mentors"
    When I click "Become a Mentor"
    Then I should be on "/form/join-the-cssn-network"
    When I go to "/matchplus"
    Then I should see "Be a Student-Facilitator"
    When I click "Join MATCHPlus"
    Then I should be on "/form/join-the-cssn-network"
