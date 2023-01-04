#@wip
@api
@javascript

Feature: test ACCESS Support MATCHPremier page
  In order to test the MATCHPremier page

  Scenario: Authenticated user tests the MATCHPremier page
    Given I am logged in as a user with the "authenticated" role
    When I go to "/matchpremier"
    Then I should see "Funding your MATCHPremier Engagement"
    When I click "Find out More"
    Then I should be on "/form/proposal-support"
    When I go to "/matchpremier"
    Then I should see "Interested in Joining the Pilot?"
    Then I should see "Request an Engagement"
    When I click "Request a Pilot Engagement"
    Then I should be on "/node/add/match_engagement?type=plus"
    When I go to "/matchpremier"
    Then I should see "Get Help with Funding"
    When I click "Get Proposal Support"
    Then I should be on "/form/proposal-support"
    When I go to "/matchpremier"
    Then I should see "Join our MATCHPremier CSSN Team"  
    When I click "Become a Consultant"
    Then I should be on "/form/join-the-cssn-network"