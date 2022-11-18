@champ
@api
@javascript

Feature: test for the governance page as an authenticated user 

  Scenario: User runs through the governance page as authenticated.
    Given I am logged in as a user with the "authenticated" role
    When I go to "/about-us/governance"
    Then I should see "governance"
    Then I should see "Champion Staff"
    Then I should see "Champion Elected Leadership Team"
    Then I should see "Champion Leadership Team Alumni"
    Then I should see "Name"
    Then I should see "Institution"
    Then I should see "Position"
    Then I should not see "Code of Conduct"
    Then I should see "Dana Brunson"